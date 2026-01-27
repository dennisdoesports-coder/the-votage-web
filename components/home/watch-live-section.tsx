import React from 'react';
import { Play } from 'lucide-react';

export const WatchLiveSection = () => {
  return (
    <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/46dc/8659/51dc0527629daa8b350aeb3e8d03e768?Expires=1770595200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=R2-PUj0EB2Jpx2Gn5pzZUn~SLxdPc-UYwa3NBD59XjHnxkDrRoeyiveYYTP1LApog7fWEks8Fmj~TLQrcyDbjTVqfYjx42hJnFKCY-TOfVMXewyK0903gu5vfvs0iKpQj-ss4cGmlG89UtEmFqQrLZqNHF76TLfWmkvn7R6jDanToRfgPQCeLx5nlMbKIDSri~K7wCKD4Z8tq~ENk-JZazZHvncLqrfqn2QJhtKx78jYpv3TtqrtthRahIM9sDjI5rv8Jy9iY7CXtaDegxfuqOTPIG8VncAPiA55qLWs4NHfziXx2adVcu9U9PI6x1K5w05RZDvr3k6YGY7QrEr3jg__')"
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <button className="w-24 h-24 bg-brand-red rounded-3xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg">
          <Play className="w-10 h-10 fill-current" />
        </button>
        <h2 className="font-display font-bold text-4xl lg:text-5xl text-white uppercase tracking-wider">
          Watch Live
        </h2>
      </div>
    </section>
  );
};
