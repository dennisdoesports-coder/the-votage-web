import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function SermonsPage() {
  return (
    <div className="relative w-full overflow-hidden">
      <Navbar />
      
      <main className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Sermons</h1>
          <p className="text-lg text-gray-600 mb-8">
            Explore our collection of sermons and teachings. Grow in your faith 
            through powerful messages from God's word.
          </p>
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <p className="text-gray-500">Sermons library coming soon...</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
