import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, MapPin } from 'lucide-react';
import type { EventItem } from '@/lib/contentful';

export interface EventsSectionProps {
  events?: EventItem[];
}

const defaultEvents: EventItem[] = [
  {
    id: '1',
    title: 'Afro Gospel Rave (A Mega Play)',
    subtitle: '',
    date: 'Sun. Sep 6, 2026',
    time: "2pm (WAT)",
    location: null,
    image: '/img/agr.jpeg'
  },
  {
    id: '2',
    title: 'Apostolic Shift',
    subtitle: '',
    date: 'Sat. September 22nd - Sun. September 23rd, 2026',
    time: '3:00PM (WAT) & 8pm (WAT)',
    location: null,
    image: '/img/apostolicshift.jpeg'
  }
];

export const EventsSection = ({ events = defaultEvents }: EventsSectionProps) => {
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
              <div className="px-3 pb-5 pt-1">
                <h3 className="font-copperplate text-xl text-black leading-tight mb-1.5">{event.title}</h3>
                <p className="font-copperplate text-sm text-[#4E4E4E] leading-snug mb-4">{event.subtitle}</p>

                {/* Practical details, separated from the billing above so the
                    card reads as "what it is" then "when and where". */}
                <dl className="border-t border-gray-100 pt-3 flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-3.5 h-3.5 mt-px shrink-0 text-[#9A9A9A]" aria-hidden="true" />
                    <dd className="font-body text-xs text-black leading-snug">{event.date}</dd>
                  </div>

                  {event.time && (
                    <div className="flex items-start gap-2">
                      <Clock className="w-3.5 h-3.5 mt-px shrink-0 text-[#9A9A9A]" aria-hidden="true" />
                      <dd className="font-body text-xs text-[#4E4E4E] leading-snug">{event.time}</dd>
                    </div>
                  )}

                  {event.location && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 mt-px shrink-0 text-[#9A9A9A]" aria-hidden="true" />
                      <dd className="font-body text-xs text-[#4E4E4E] leading-snug">
                        {event.location}
                      </dd>
                    </div>
                  )}
                </dl>
                <div className="px-3 pb-5 pt-1">
                  <h3 className="font-copperplate text-xl text-black leading-tight mb-1.5">{event.title}</h3>
                  <p className="font-copperplate text-sm text-[#4E4E4E] leading-snug mb-4">{event.subtitle}</p>

                  {/* Practical details, separated from the billing above so the
                    card reads as "what it is" then "when and where". */}
                  <dl className="border-t border-gray-100 pt-3 flex flex-col gap-2">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-3.5 h-3.5 mt-px shrink-0 text-[#9A9A9A]" aria-hidden="true" />
                      <dd className="font-body text-xs text-black leading-snug">{event.date}</dd>
                    </div>

                    {event.time && (
                      <div className="flex items-start gap-2">
                        <Clock className="w-3.5 h-3.5 mt-px shrink-0 text-[#9A9A9A]" aria-hidden="true" />
                        <dd className="font-body text-xs text-[#4E4E4E] leading-snug">{event.time}</dd>
                      </div>
                    )}

                    {event.location && (
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 mt-px shrink-0 text-[#9A9A9A]" aria-hidden="true" />
                        <dd className="font-body text-xs text-[#4E4E4E] leading-snug">
                          {event.location}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
          ))}
            </div>
      </div>
    </section>
  );
};

export default EventsSection;
