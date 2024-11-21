import Image from "next/image";

import MatteoImg from "@/public/profile-matteo.jpeg";

export default function XLinks() {
  return (
    <div className="mb-12 flex items-center justify-center gap-2 text-sm">
      <span className="text-zinc-500">Brought to you by</span>
      <span className="-ml-0.5 flex -space-x-2">
        <a
          className="group relative h-7 w-7 overflow-hidden rounded-full border-2 border-background"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="absolute inset-0 object-cover object-center transition-transform duration-300 group-hover:scale-110"
            src={MatteoImg}
            alt="Matteo's profile image"
            width={24}
            height={24}
          />
        </a>
      </span>
    </div>
  );
}
