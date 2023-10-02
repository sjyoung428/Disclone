"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Server } from "@prisma/client";
import { isMacOS } from "@/lib/is-macOS";
import { useParams, useRouter } from "next/navigation";

interface ServerSearchProps {
  server: Server;
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

export const ServerSearch = ({ server, data }: ServerSearchProps) => {
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    setIsMac(isMacOS());
    const keydown = (event: KeyboardEvent) => {
      if ((event.key === "k" && event.metaKey) || event.ctrlKey) {
        event.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, []);

  const onClick = ({
    id,
    type,
  }: {
    id: string;
    type: "channel" | "member";
  }) => {
    setOpen(false);

    if (type === "member") {
      return router.push(`/servers/${params?.serverId}/conversations/${id}`);
    }

    if (type === "channel") {
      return router.push(`/servers/${params?.serverId}/channels/${id}`);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition "
      >
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
          검색
        </p>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
          <span className="text-xs">{isMac ? "⌘" : "Ctrl"}</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={`${server.name} 검색하기`} />
        <CommandList>
          <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                {data.map(({ id, icon, name }) => (
                  <CommandItem key={id} onSelect={() => onClick({ id, type })}>
                    {icon}
                    <span>{name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};
