import { Message } from "@/types/messageTypes";
import { UrlApiResponse } from "@/utils/api/getUrlMetadata";
import Image from "next/image";

export default function LinkPreviewWithImage({ isLink }: { isLink: UrlApiResponse }) {
  if (!isLink.image) return null;

  return (
    <>
      <div className="w-full relative rounded-t-[16.25px] overflow-hidden">
        <Image
          width={1000}
          height={1000}
          className="w-full bg-cover"
          alt={isLink.description ?? ""}
          src={isLink.image} />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[3%]" />
      </div>
      <section className="break-words px-[11px] mt-[6.5px]">
        <p>{isLink.title}</p>
        <p className="text-[#7F7F81] font-medium pt-1">{isLink.webpage_url}</p>
      </section>
    </>
  )
}