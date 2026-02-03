import Image from "next/image";

export default function WhyJoinSection() {
  const reasons = [
    {
      title: "SPIRITUAL GROWTH",
      description:
        "Information about connect, what it is and what they do to present the kingdom, the power aod",
    },
    {
      title: "REAL CONNECTIONS",
      description:
        "Information about connect, what it is and what they do to present the kingdom, the power And",
    },
    {
      title: "GET ANSWERS",
      description:
        "Information about connect, what it is and what they do to present the kingdom, the power aoD",
    },
    {
      title: "BECOME FAMILY",
      description:
        "Info/talks about connect, what it is and what they/we/me ohnvndgmk, the power AoD",
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-white px-4 relative overflow-hidden">
      {/* Mobile Background Image with Gradient Overlay */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/img/why-you-should-join-a-connect-group.png"
          alt="Connect Group"
          fill
          className="object-cover"
        />
        {/* Gradient overlay - darker at top and bottom for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-black text-white md:text-black mb-10 leading-tight uppercase">
              Why You Should Join a<br />
              Connect Group
            </h2>

            <div className="space-y-6 max-w-lg w-full">
              {reasons.map((reason, index) => (
                <div key={index}>
                  <p className="font-body text-sm md:text-base text-white md:text-gray-700 leading-relaxed">
                    <span className="font-display font-black text-white md:text-black uppercase tracking-wide">{reason.title}</span> : {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Image (Desktop only) */}
          <div className="hidden md:block">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/img/why-you-should-join-a-connect-group.png"
                alt="Connect Group"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
