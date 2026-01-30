import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function GivePage() {
  return (
    <div className="relative w-full overflow-hidden">
      <Navbar />
      
      <main className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Give</h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your generosity. Your giving helps us continue our mission 
            to share the life-giving message of Jesus and raise devoted followers of Christ.
          </p>
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <p className="text-gray-500">Give functionality coming soon...</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
