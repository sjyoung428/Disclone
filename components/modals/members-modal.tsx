"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModalStore } from "@/hooks/use-modal-store";

import { ServerWithMebersWithProfiles } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from "@/components/user-avatar";

export const MembersModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModalStore();

  const isModalOpen = isOpen && type === "members";
  const { server } = data as { server: ServerWithMebersWithProfiles };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            멤버 관리하기
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6 ">
          {server?.members?.map((member) => (
            <div key={member.id} className="flex items-center gap-x-2 mb-6">
              <UserAvatar src={member.profile.imageUrl} />
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
