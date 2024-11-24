import Illustration from "@/components/illustration";
import Newsletter from "@/components/subscribe-form";
import XLinks from "@/components/x-links";
import type { Metadata } from "next";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Sdeng Manager",
  description:
      "An extensive collection of copy-and-paste components for quickly building app UIs. Free, open-source, and ready to drop into your projects.",
};

export default function Page() {
  return (
      <>
        <Illustration />
        <Header />
        <main>
          <div className="px-4 sm:px-6">
            <div className="mx-auto w-full max-w-3xl">
              <div className="mb-4">
                <p className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-background px-3 py-1 text-sm font-medium text-foreground shadow-sm shadow-black/[.12] dark:bg-accent">
                <span className="mr-2 flex shrink-0 border-r border-border pr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="none">
                    <path
                        className="fill-zinc-500"
                        d="M6.958.713a1 1 0 0 0-1.916 0l-.999 3.33-3.33 1a1 1 0 0 0 0 1.915l3.33.999 1 3.33a1 1 0 0 0 1.915 0l.999-3.33 3.33-1a1 1 0 0 0 0-1.915l-3.33-.999-1-3.33Z"
                    />
                  </svg>
                </span>
                  New digital way to organize
                </p>
              </div>

              <div className="mb-16">
                <h1 className="mx-auto mb-4 max-w-3xl text-4xl/[1.1] font-extrabold tracking-tight text-foreground md:text-5xl/[1.1]">
                  Beautiful UI components built with Tailwind CSS and Next.js.
                </h1>
                <p className="text-lg text-muted-foreground">
                  Origin UI is an extensive collection of copy-and-paste components for quickly
                  building app UIs. It&#39;s free, open-source, and ready to drop into your projects.
                </p>
              </div>

              <Newsletter />

              <div className="mt-16">
                <XLinks />
              </div>
            </div>
          </div>
        </main>
      </>
  );
}