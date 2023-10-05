"use client";

import qs from "query-string";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { Video, VideoOff } from "lucide-react";

import { ActionTooltip } from "@/components/action-tooltip";

export const ChatVideoButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isVideo = searchParams?.get("video");

  const onClick = () => {
    const url = qs.stringifyUrl({
      url: pathname || "",
      query: {
        video: isVideo ? undefined : true,
      },
    });

    router.push(url);
  };

  const Icon = isVideo ? VideoOff : Video;
  const tooltip = isVideo ? "비디오 끄기" : "비디오 켜기";

  return (
    <ActionTooltip side="bottom" label={tooltip}>
      <button onClick={onClick} className="hover:opacity-75 transition mr-4">
        <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
      </button>
    </ActionTooltip>
  );
};
