import Image from "next/image";

import Dialog from "@/components/ui/Dialog/Dialog";
import DialogTrigger from "@/components/ui/DialogTrigger/DialogTrigger";
import type { ProjectImage } from "@/content/projects";

interface ZoomImageProps {
  /** Unique id for the viewer dialog. */
  id: string;
  image: ProjectImage;
  alt: string;
  enlargeLabel: string;
  closeLabel: string;
}

/** A drawing that opens full size in a viewer; any click or Escape closes it. */
export default function ZoomImage({ id, image, alt, enlargeLabel, closeLabel }: ZoomImageProps) {
  return (
    <>
      <DialogTrigger dialogId={id} className={image.tall ? "zoom-image zoom-image--tall" : "zoom-image"}>
        <span className="visually-hidden">{enlargeLabel}: </span>
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={alt}
          sizes="(max-width: 820px) 100vw, 560px"
        />
      </DialogTrigger>

      <Dialog id={id} label={alt} closeLabel={closeLabel} closeOnClick className="zoom-viewer">
        <Image src={image.src} width={image.width} height={image.height} alt={alt} sizes="min(1080px, 100vw)" />
      </Dialog>
    </>
  );
}
