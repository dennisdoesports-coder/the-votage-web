import React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { HeroSection } from '@/components/hero/hero-section';
import { InfoCardsSection } from '@/components/home/info-cards-section';
import { BelongSection } from '@/components/home/belong-section';
import MediaSermons from '@/components/home/media-section';
import { getMediaItems } from '@/lib/media';
import { getHero, getEvents } from '@/lib/contentful';
import { EventsSection } from '@/components/home/events-section';
import { WatchLiveSection } from '@/components/home/watch-live-section';
import { TrustSection } from '@/components/home/trust-section';
import { QuickLinksSection } from '@/components/home/quick-links-section';
import { Footer } from '@/components/layout/footer';

export default async function Home() {
  const [mediaItems, hero, events] = await Promise.all([
    getMediaItems(),
    getHero(),
    getEvents(),
  ]);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <main>
        <HeroSection hero={hero} />
        <InfoCardsSection />
        <BelongSection />
        <MediaSermons items={mediaItems} />
        <EventsSection events={events} />
        <WatchLiveSection />
        <TrustSection />
        <QuickLinksSection />
      </main>
      <Footer />
    </div>
  );
}
