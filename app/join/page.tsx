import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function JoinPage() {
  return (
    <div className="relative w-full overflow-hidden">
      <Navbar />
      
      <main className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Us</h1>
          <p className="text-lg text-gray-600 mb-8">
            There are many ways to get involved and become part of our community. 
            Find the perfect path for you to serve, connect, and grow.
          </p>
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <p className="text-gray-500">Join opportunities coming soon...</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
