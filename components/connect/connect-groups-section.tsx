"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

function BlurPlaceholder() {
  return <div className="absolute inset-0 bg-gray-200 animate-pulse" />;
}

export default function ConnectGroupsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const groups = [
    {
      id: 1,
      name: "KABOO CONNECT",
      day: "Tuesdays",
      location: "143 Airport Road, Ajao ADP Junction",
      time: "5:00pm",
    },
    {
      id: 2,
      name: "KABOO CONNECT",
      day: "Tuesdays",
      location: "342 Airport Road, Ajao ADP Junction",
      time: "5:00pm",
    },
    {
      id: 3,
      name: "KABOO CONNECT",
      day: "Tuesdays",
      location: "142 Airport Road, Ajao ADP Junction",
      time: "5:00pm",
    },
    {
      id: 4,
      name: "KABOO CONNECT",
      day: "Tuesdays",
      location: "142 Airport Road, Ajao ADP Junction",
      time: "5:00pm",
    },
  ];

  const cardsToShow = 4; // Show 4 cards at a time
  const maxIndex = Math.max(0, groups.length - cardsToShow);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="w-full py-12 md:py-16 px-4 bg-[#FFF8F0]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 text-center">
              <h2 className="font-copperplate text-2xl md:text-3xl lg:text-4xl font-black text-black leading-tight uppercase">
                FIND A CONNECT THAT FITS INTO<br />
                YOUR SCHEDULE
              </h2>
            </div>
            <div className="flex items-center gap-2 ml-4 md:hidden">
              <button 
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="p-1.5 hover:bg-white/50 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronUp className="w-4 h-4 text-black" />
              </button>
              <button 
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className="p-1.5 hover:bg-white/50 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronDown className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
          <p className="font-body text-gray-700 text-xs md:text-sm max-w-3xl mx-auto text-center">
            Browse through connect group, more than words, they define our identity and guide how we live, love, serve, and grow as a community.
          </p>
        </div>

        {/* Connect Groups Carousel */}
        <div className="overflow-hidden md:overflow-visible">
          <div 
            className="flex gap-4 md:grid md:grid-cols-4 md:gap-6 md:max-w-5xl md:mx-auto transition-transform duration-500 ease-out md:transition-none"
            style={{ 
              transform: `translateX(-${currentIndex * (200 + 16)}px)`,
            }}
          >
            {groups.map((group) => (
              <div key={group.id} className="relative rounded-xl w-[200px] flex-shrink-0 overflow-hidden shadow-md group cursor-pointer">
                {/* Background Image */}
                <div className="relative w-full h-[280px]">
                  <BlurPlaceholder />
                  <Image
                    src="/img/connect-images.png"
                    alt={group.name}
                    fill
                    className="object-cover relative z-10"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQCEAxEPwAB//9k="
                  />
                  
                  {/* Arrow Icon */}
                  <button className="absolute top-3 right-3 hover:opacity-80 transition-opacity z-10">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M36.3959 68.1616C24.5383 62.4535 19.5664 48.2515 25.2745 36.3938C30.9826 24.5362 45.1847 19.5643 57.0423 25.2724C68.8999 30.9805 73.8718 45.1826 68.1637 57.0402C62.4556 68.8978 48.2535 73.8698 36.3959 68.1616ZM55.8278 27.7953C45.3578 22.7552 32.8375 27.1383 27.7974 37.6083C22.7572 48.0784 27.1404 60.5986 37.6104 65.6388C48.0804 70.6789 60.6007 66.2957 65.6408 55.8257C70.681 45.3557 66.2978 32.8354 55.8278 27.7953Z" fill="currentColor"/>
                      <path d="M56.1551 53.9013L50.7252 38.3911L35.215 43.821L34.2992 41.2048L52.4255 34.859L58.7713 52.9854L56.1551 53.9013Z" fill="currentColor"/>
                      <path d="M50.3145 36.0176L52.8373 37.2321L42.5142 58.6767L39.9913 57.4622L50.3145 36.0176Z" fill="currentColor"/>
                    </svg>
                  </button>

                  {/* Dark Gradient Overlay at Bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-copperplate text-white font-black mb-3 text-sm uppercase leading-tight">{group.name}</h3>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <p className="font-body text-white text-[11px]">{group.day}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-white flex-shrink-0 mt-0.5" />
                        <p className="font-body text-white/90 text-[11px] leading-tight">{group.location}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <p className="font-body text-white text-[11px]">{group.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
