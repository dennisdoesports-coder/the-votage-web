import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function TrybeSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-white px-4 relative">
      {/* Mobile Background Image */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/img/connect-images.png"
          alt="Trybe"
          fill
          className="object-cover"
        />
        {/* Dark overlay for text visibility */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Image (Desktop only) */}
          <div className="hidden md:block">
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/img/connect-images.png"
                alt="Trybe"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex flex-col items-center text-center md:items-end md:text-right">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-black text-white md:text-black mb-4 leading-tight uppercase">
              Your Trybe is Waiting
            </h2>

            <p className="font-body text-white md:text-gray-700 text-sm md:text-base leading-relaxed mb-6 max-w-md">
              While Connect Groups focus on interests and stages of life, Trybes focus on proximity—ensuring you are never too far from your church family.
            </p>

            <Button className="font-display bg-white text-black hover:bg-gray-50 px-8 py-4 font-bold text-sm uppercase rounded-full shadow-[0_4px_0_0_rgba(0,0,0,1)] border-2 border-black transition-all hover:shadow-[0_2px_0_0_rgba(0,0,0,1)] hover:translate-y-[2px]">
              Link to Trybe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
