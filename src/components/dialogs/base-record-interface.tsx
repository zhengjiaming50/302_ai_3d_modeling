import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ReactNode } from "react";
import { EmptyInterface } from "./empty-interface";
import { cn } from "@/lib/utils";

interface BaseRecordInterfaceProps {
  children: ReactNode;
  isEmpty: boolean;
  triggerLabel: string;
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function BaseRecordInterface({
  children,
  isEmpty,
  triggerLabel,
  title,
  open,
  setOpen,
}: BaseRecordInterfaceProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" type="button">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn("h-[80vh] max-w-[80vw]", isEmpty ? "" : "content-start")}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {isEmpty ? (
          <EmptyInterface />
        ) : (
          <div className="grid h-full grid-cols-5 gap-4 overflow-y-auto pt-4 max-md:grid-cols-3 max-sm:grid-cols-1">
            {children}
          </div>
        )}
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
