import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { chatterbox } from "@/lib/chatterbox-client";
import { prisma } from "@/lib/database";
import { uploadAudio } from "@/lib/r2";
import { TEXT_MAX_LENGTH } from "@/features/text-to-speech/data/constants";
import { createTRPCRouter, orgProcedure } from "../init";

export const generationsRouter = createTRPCRouter({
  getById: orgProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const generation = await prisma.generations.findUnique({
        where: { id: input.id, orgId: ctx.orgId },
        omit: {
          orgId: true,
          dataObjectKey: true,
        },
      });

      if (!generation) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return {
        ...generation,
        audioUrl: `/api/audio/${generation.id}`,
      };
    }),

  getAll: orgProcedure.query(async ({ ctx }) => {
    const generations = await prisma.generations.findMany({
      where: { orgId: ctx.orgId },
      orderBy: { createdAt: "desc" },
      omit: {
        orgId: true,
        dataObjectKey: true,
      },
    });
    return generations;
  }),

  create: orgProcedure
    .input(
      z.object({
        text: z.string().min(1).max(TEXT_MAX_LENGTH),
        voiceId: z.string().min(1),
        tempreture: z.number().min(0).max(2).default(0.8),
        topP: z.number().min(0).max(1).default(0.95),
        topK: z.number().min(0).max(10000).default(1000),
        repetitionPenalty: z.number().min(1).max(2).default(1.2),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const voice = await prisma.voice.findUnique({
        where: {
          id: input.voiceId,
          OR: [{ variant: "SYSTEM" }, { variant: "CUSTOM", orgId: ctx.orgId }],
        },
        select: {
          id: true,
          name: true,
          dataObjectKey: true,
        },
      });
      if (!voice) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Voice not available",
        });
      }

      const { data, error } = await chatterbox.POST("/generate", {
        body: {
          prompt: input.text,
          voice_key: voice.dataObjectKey,
          temperature: input.tempreture,
          top_p: input.topP,
          top_k: input.topK,
          repetition_penalty: input.repetitionPenalty,
          norm_loudness: true,
        },
        parseAs: "arrayBuffer",
      });
      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate audio",
        });
      }

      const buffer = Buffer.from(data as ArrayBuffer);
      let generationId: string | null = null;
      let dataObjectKey: string | null = null;

      try {
        const generation = await prisma.generations.create({
          data: {
            orgId: ctx.orgId,
            text: input.text,
            voiceName: voice.name,
            voiceId: voice.id,
            temperature: input.tempreture,
            topP: input.topP,
            topK: input.topK,
            repetitionPenalty: input.repetitionPenalty,
          },
          select: {
            id: true,
          },
        });

        generationId = generation.id;
        dataObjectKey = `generations/orgs/${ctx.orgId}/${generation.id}`;
        // generations/org/<orgId>/<generationId>

        await uploadAudio({ buffer, key: dataObjectKey });

        await prisma.generations.update({
          where: {
            id: generation.id,
          },
          data: {
            dataObjectKey,
          },
        });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_err) {
        if (generationId) {
          await prisma.generations
            .delete({
              where: {
                id: generationId,
              },
            })
            .catch(() => {});
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to store generated audio",
        });
      }

      if (!generationId || !dataObjectKey) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to store generated audio",
        });
      }

      return {
        id: generationId,
      };
    }),
});
