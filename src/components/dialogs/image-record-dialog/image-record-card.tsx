"use client";

/* eslint-disable @next/next/no-img-element */
import { BaseRecordCard } from "@/components/dialogs/base-record-card";

interface ImageRecordCardProps {
  imageSrc: string;
  createAt: number;
  onClick: () => void;
  onDownload: () => void;
  onDelete: () => void;
}

export function ImageRecordCard({
  imageSrc,
  createAt,
  onClick,
  onDownload,
  onDelete,
}: ImageRecordCardProps) {
  return (
    <BaseRecordCard
      isImage={true}
      createAt={createAt}
      onClick={onClick}
      onDownload={onDownload}
      onDelete={onDelete}
      canScale={true}
    >
      <img
        src={imageSrc}
        alt="Generated Image"
        className="h-full w-full object-contain"
      />
    </BaseRecordCard>
  );
}
