import { useQueryState } from "nuqs";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { voicesSearchParams } from "../lib/params";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VoicesToolbar() {
  const [query, setQuery] = useQueryState("query", voicesSearchParams.query);

  const [localQuery, setLocalQuery] = useState(query);

  const debouncedSetQuery = useDebouncedCallback(
    (value: string) => setQuery(value),
    300,
  );

  return (
    <div className='space-y-4'>
      <div>
        <h2 className='text-xl lg:text-2xl font-semibold tracking-tight'>
          All Libraries
        </h2>
        <p className='text-sm text-muted-foreground'>
          Discover Your Voices, or make your own{" "}
        </p>
      </div>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center gap-3'>
          <InputGroup>
            <InputGroupAddon className='lg:max-w-sm'>
              <Search className='size-4' />
            </InputGroupAddon>
            <InputGroupInput
              placeholder='Search voices...'
              value={localQuery}
              onChange={(e) => {
                setLocalQuery(e.target.value);
                debouncedSetQuery(e.target.value);
              }}
            />
          </InputGroup>
          <div className='ml-auto hidden lg:block'>
            <Button size={"sm"}>
              <Sparkles />
              Custom voice
            </Button>
          </div>
          <div className='lg:hidden'>
            <Button size={"sm"} className='w-full'>
              <Sparkles />
              Custom voice
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
