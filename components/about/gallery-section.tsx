'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const images = [
  {
    id: 4, // Far Left (Duplicate for layout balance)
    url: "https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/f732/d2e5/1e55735a0d6d5f35a7d020d6f8ed0965?Expires=1770595200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=YPnNdhX7ouf4TDUgXU7twjD4tqag6lZyiGdcSp8T7AHMvy564~EVfePd4Sip~5tGu4pmLsyRcUeBy1k8OXjAnBhKwkXJs5Hz99HbelCHeDgSl69VxgsrOjqt6yIbUKoH2aAqAYFgfouPnOp~wKK-biC7e0FdBKHHGaBks4w8MOQLtE5QB0xGZf8Fj5TMy7as9mcQzdD16hUs6nGWeIwNJMIUiBExB79Qz1YzxaFtPXEn7qctlmYhC7sxGUx0Y-74XFXezDfFdX3FbZH66b~sUsFpQfEo7Tk5J5ojth4jqOoI-FxGzfQ1vpOxuJfbk06eEp0i30tSpLKOsf53MCY1ew__",
    alt: "Community gathering"
  },
  {
    id: 1, // Left
    url: "/img/connect-images.png",
    alt: "Worship service"
  },
  {
    id: 2, // Center (Speaker)
    url: "https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/32fd/a76e/1e7b36933f0f9675cbeccefe6066034d?Expires=1770595200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=R9~W5HN92uSSzEax8FF7Pn~7ZW0IXtoW-nCJCjFVHvqv3DxlUL6VP9gSMz~fV7mLppr6W9qOdVYV4NA0fzG7Zbnm60BJf6nM7oJCyRRBpXdOiNMnGHVO02h-KOvF3PIRSwx7TEqpGqrKJqDdAWJrRZXiWTd-wZceQMEvzzEi-IVh5JkuGyKBptrco-iOe1Gf6TjLiIraOR6aSJJqSRFsWHEdb403Zgs8OgZH5XEjxJtCC2yF-Dw25jkJcYDHFkBjotpuquUUzdWRxd07-H5eSA4iMUfft-sNyeyzwOL2ffEy8w-~9gwPtqzq6qsJqSdaefOX3u7gACO7W0gkFoH3qw__",
    alt: "Speaker on stage"
  },
  {
    id: 3, // Right
    url: "https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/f732/d2e5/1e55735a0d6d5f35a7d020d6f8ed0965?Expires=1770595200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=YPnNdhX7ouf4TDUgXU7twjD4tqag6lZyiGdcSp8T7AHMvy564~EVfePd4Sip~5tGu4pmLsyRcUeBy1k8OXjAnBhKwkXJs5Hz99HbelCHeDgSl69VxgsrOjqt6yIbUKoH2aAqAYFgfouPnOp~wKK-biC7e0FdBKHHGaBks4w8MOQLtE5QB0xGZf8Fj5TMy7as9mcQzdD16hUs6nGWeIwNJMIUiBExB79Qz1YzxaFtPXEn7qctlmYhC7sxGUx0Y-74XFXezDfFdX3FbZH66b~sUsFpQfEo7Tk5J5ojth4jqOoI-FxGzfQ1vpOxuJfbk06eEp0i30tSpLKOsf53MCY1ew__",
    alt: "Community gathering"
  },
  {
    id: 5, // Far Right (Duplicate for layout balance)
    url: "https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/654e/950f/1977d165bfe0eede3a7eeb54a5815f6f?Expires=1770595200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=omWHzMqxZWWvAR6-4rkmhxO9juSUEIj7UX54XHqIsc44czdXNGIi-sQoj-5C9xIDmJhv9dUxD54xILXFWjhRHsqwVaIc2my8v8meZlS-tbimYUERL9zW8JD27BHDkf4UV1nxpbv2JY12Cpv~dBNVB5yQ79EtndRwC3Gyiyklq-29256PxSmgesfXfc3Rd2mXZWY9EwA7SesoLTipYRr4QpmOlwq0IZe0~iyC2NWQw0H2IE0ri1ZCvcU2mT4f2PEk~mzNK28oVSAwqr72x~IPwCjWfDwJS2QZiZ-g1b3IkjedNpcL1jVJP1~fJrJowFStyeNHSk9q3XyFgyE7JM9F8A__",
    alt: "Worship service"
  }
];

// Height variants for alternating pattern
const getHeightClass = (index: number) => {
  const heights = [
    'h-[420px] md:h-[480px] lg:h-[520px]', // High
    'h-[340px] md:h-[400px] lg:h-[440px]', // Low
    'h-[460px] md:h-[520px] lg:h-[560px]', // Higher (center)
    'h-[340px] md:h-[400px] lg:h-[440px]', // Low
    'h-[420px] md:h-[480px] lg:h-[520px]', // High
  ];
  return heights[index] || heights[0];
};

export const GallerySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation with staggered reveal
      gsap.from(".gallery-item", {
        y: 150,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: "power4.out",
        delay: 0.3
      });

      // Subtle continuous float animation for even items
      gsap.to(".gallery-item-even", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5
      });

      // Subtle continuous float animation for odd items (opposite direction)
      gsap.to(".gallery-item-odd", {
        y: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    // Cancel any ongoing animations on the target
    gsap.killTweensOf(e.currentTarget);
    
    // Smooth scale up with enhanced effects
    gsap.to(e.currentTarget, { 
      scale: 1.08, 
      y: -15,
      zIndex: 50,
      boxShadow: "0px 30px 60px rgba(0,0,0,0.35)",
      borderRadius: "50px",
      duration: 0.5, 
      ease: "power3.out" 
    });

    // Brighten the image
    gsap.to(e.currentTarget.querySelector('img'), {
      filter: "brightness(1.1)",
      duration: 0.3
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    // Cancel any ongoing animations on the target
    gsap.killTweensOf(e.currentTarget);
    
    // Return to original state with smooth transition
    gsap.to(e.currentTarget, { 
      scale: 1, 
      y: 0,
      zIndex: 1,
      boxShadow: "0px 10px 15px -3px rgba(0, 0, 0, 0.1)",
      borderRadius: "40px",
      duration: 0.5, 
      ease: "power3.out" 
    });

    // Reset image brightness
    gsap.to(e.currentTarget.querySelector('img'), {
      filter: "brightness(1)",
      duration: 0.3
    });
  };

  return (
    <div ref={containerRef} className="w-full relative overflow-hidden py-16 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      
      <div 
        ref={trackRef}
        className="flex justify-center items-end gap-4 md:gap-6 px-4 min-w-max md:min-w-0 relative z-10"
      >
        {images.map((img, index) => (
          <div 
            key={img.id}
            className={`
              gallery-item relative flex-shrink-0 
              w-[240px] md:w-[280px] lg:w-[320px] 
              ${getHeightClass(index)}
              ${index % 2 === 0 ? 'gallery-item-even' : 'gallery-item-odd'}
              rounded-[40px] md:rounded-[50px] 
              overflow-hidden shadow-lg cursor-pointer bg-gray-200
              transform-gpu will-change-transform
            `}
            onMouseEnter={(e) => handleMouseEnter(e, index)}
            onMouseLeave={(e) => handleMouseLeave(e, index)}
          >
            <img 
              src={img.url} 
              alt={img.alt} 
              className="w-full h-full object-cover transition-transform duration-700"
            />
            {/* Enhanced overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity duration-300" />
            
            {/* Subtle border glow on hover */}
            <div className="absolute inset-0 border-2 border-white/20 rounded-[40px] md:rounded-[50px] opacity-0 transition-opacity duration-300" />
          </div>
        ))}
      </div>
      
      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
};

export default GallerySection;
