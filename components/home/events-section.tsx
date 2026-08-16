import React from 'react';
import Image from 'next/image';

const events = [
  {
    id: 1,
    title: 'Afro Gospel Rave (A Mega Play)',
    subtitle: null,
    date: 'Sun. Sep 6, 2026',
    time: "2pm (WAT)",
    image: '/img/agr.jpeg'
  },
  {
    id: 2,
    title: 'Apostolic Shift',
    subtitle: null,
    date: 'Sat. September 22nd - Sun. September 23rd, 2026',
    time: '3:00PM (WAT) & 8pm (WAT)',
    image: '/img/apostolicshift.jpeg'
  }
];

export const EventsSection = () => {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <h2 className="font-copperplate font-bold text-3xl lg:text-5xl text-black uppercase text-center mb-16">
          Up Coming Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-[0px_4px_20px_rgba(0,0,0,0.05)] hover:shadow-xl transition-shadow duration-300 p-3 flex flex-col gap-4 group"
            >
              <div className="aspect-[4/5] w-full overflow-hidden rounded relative bg-gray-200">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
              </div>
              <div className="px-2 pb-4">
                <h3 className="font-copperplate text-xl text-black mb-1">{event.title}</h3>
                <p className="font-copperplate text-base text-black mb-2">{event.subtitle}</p>
                <p className="font-body text-xs text-[#4E4E4E]">{event.date}</p>
                {event.time && (
                  <p className="font-body text-xs text-[#4E4E4E] mt-1">{event.time}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
