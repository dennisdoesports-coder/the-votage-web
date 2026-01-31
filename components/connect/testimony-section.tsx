export default function TestimonySection() {
  return (
    <section className="w-full py-16 md:py-24 bg-white px-4">
      <div className="max-w-5xl mx-auto">
        {/* Testimonial Card */}
        <div className="bg-black rounded-3xl p-8 md:p-12">
          {/* Heading */}
          <h3 className="font-display text-white text-xl md:text-2xl font-black uppercase mb-6 leading-tight">
            Testimony of How Connect Has Helped Me.
          </h3>

          {/* Testimony Text */}
          <p className="font-body text-white text-base md:text-lg leading-relaxed mb-6">
           lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
           </p>

          {/* Author */}
          <div className="pt-6 border-t border-gray-600">
            <p className="font-display text-white text-xs uppercase tracking-wider font-black">TESTIFIER TESTIMONY</p>
          </div>
        </div>
      </div>
    </section>
  );
}
