import { voicesSearchParamsCache } from "@/features/voices/lib/params";
import { VoicesView } from "@/features/voices/views/voices-view";
import { prefetch, trpc, HydrateClient } from "@/trpc/server";
import { Metadata } from "next";
import { SearchParams } from "nuqs/server";

export const metadata: Metadata = { title: "voices" };
export default async function Voices({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { query } = await voicesSearchParamsCache.parse(searchParams);

  // localhost:3000/voices?query=Danesh
  prefetch(trpc.voices.getAll.queryOptions({ query }));

  return (
    <HydrateClient>
      <VoicesView />
    </HydrateClient>
  );
}
