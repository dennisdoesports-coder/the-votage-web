import React from 'react';
import { Play, Send } from 'lucide-react';
import { Button } from '../ui/button';

const mediaLinks = [
  {
    icon: <Send className="w-6 h-6 text-white" fill="currentColor" />,
    iconBg: 'bg-gradient-to-b from-[#2AABEE] to-[#229ED9]',
    title: 'SUNDAY SERMONS',
    subtitle: 'REV. OHIS',
    desc: 'Breaking patterns & generational strong hold',
  },
  {
    icon: <Play className="w-6 h-6 text-white" fill="currentColor" />,
    iconBg: 'bg-brand-red',
    title: 'STREAM REFRESH PROGRAMS',
    subtitle: 'EVERY LAST SATURDAY OF THE MONTH',
    desc: 'Anwinli Ojeikere(THE WINLOS)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-brand-green" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
    iconBg: 'bg-white',
    title: 'SUNDAY SERMONS',
    subtitle: 'PASTOR ANWINLI OJEIKERE',
    desc: 'The Available Man',
  },
  {
    icon: <Play className="w-6 h-6 text-white" fill="currentColor" />,
    iconBg: 'bg-brand-red',
    title: 'WATCH OUR MOVIES AND SHORT SKITS',
    subtitle: 'LEARNS THAT WILL IMPACT YOUR LIFE',
    desc: 'The Winlos',
  },
];

export const MediaSection = () => {
  return (
    <section className="bg-media-gradient py-20 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Media List */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-white uppercase mb-12 leading-tight">
              Access our Media <br /> and Sermons
            </h2>

            <div className="space-y-4">
              {mediaLinks.map((link, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-[36px] bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${link.iconBg}`}>
                    {link.icon}
                  </div>
                  <div>
                    <h4 className="font-display text-white text-sm lg:text-base mb-1 group-hover:text-brand-blue transition-colors">
                      {link.title}
                    </h4>
                    <p className="font-display text-white/60 text-xs mb-1">
                      {link.subtitle}
                    </p>
                    <p className="font-body text-white/80 text-xs lg:text-sm">
                      {link.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Featured Video */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-[72px] overflow-hidden aspect-[4/3] group cursor-pointer">
              <img 
                src="https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/e468/ce16/c3e7d315a7cc84454d5daeaac8948ea3?Expires=1770595200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Ul7Uzjybtq-O5QuU0YvFKEW38GUKhD4KjHGMbnswGZHvvy22ZpjXRv69j3RL-AN9VvEdlZCWunCy9cm1mCByH8IPeYtfMOMnGQvzpHGRGWwXxwDybxiP25JsprzMXwfY~TECOCa7JAHEOtEXZwmHwSZ79asAlEzHwhmlvNjXgf0~rc~n7xcfGJEQl~mqN7CkN3xjm9gHxRtzZYvlHLH-QHlERhsv24TvI1mX5ju8pQByVHYCw1P19bskdh9AtNZVrlEmWcn3XGOweceK70C0YCPD-KSljiFszCybB8s5Z9XZzpRFexzgUz9m8dsGCPZQJ~M3ykpgMR2PvKMYVtn2Uw__" 
                alt="Latest Sermon" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              
              {/* Overlay Card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/15 backdrop-blur-md rounded-[36px] p-6 lg:p-8 border border-white/10">
                <h3 className="font-display text-2xl text-white mb-2">Understanding servanthood</h3>
                <p className="font-display text-lg text-white/80 mb-4">Rev. Pastor OHIS</p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm text-white/60 uppercase tracking-wider">Latest Sermon</span>
                  <Button variant="outline" className="rounded-full px-8 py-2 border-white text-white hover:bg-white hover:text-black">
                    Watch
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
