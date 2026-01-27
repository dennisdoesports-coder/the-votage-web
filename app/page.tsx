import { Navbar } from '@/components/layout/navbar';
import { HeroSection } from '@/components/hero/hero-section';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <main>
        <HeroSection />
      </main>
    </div>
  );
}
