import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function TrybeSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-white px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div>
            <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/img/connect-images.png"
                alt="Trybe"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex flex-col items-end">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-black text-black mb-6 leading-tight uppercase text-right">
              Your Trybe is Waiting
            </h2>

            <p className="font-body text-gray-800 text-base md:text-lg leading-relaxed mb-8 text-right">
              While Connect Groups focus on interests and stages of life, Trybes focus on proximity—ensuring you are never too far from your church family.
            </p>

            <Button className="font-display bg-white text-black hover:bg-gray-50 px-8 py-4 font-bold text-base rounded-full shadow-md shadow-black/40 transition-all hover:shadow-lg">
              LINK TO TRYBE
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
