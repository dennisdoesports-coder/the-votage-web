import Image from "next/image";

export default function WhyJoinSection() {
  const reasons = [
    {
      title: "SPIRITUAL GROWTH",
      description:
        "Information About Connect. What It Is And What They Do To Present The Kingdom, The Power AoD",
    },
    {
      title: "SPIRITUAL GROWTH",
      description:
        "Information About Connect. What It Is And What They Do To Present The Kingdom, The Power And",
    },
    {
      title: "SPIRITUAL GROWTH",
      description:
        "Information About Connect. What It Is And What CVNGSCVMVHMH VNCF AND THEYRE COMING.",
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-black px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-white mb-12 leading-tight uppercase">
              Why You<br />
              Should Join a<br />
              Connect Group
            </h2>

            <div className="space-y-8">
              {reasons.map((reason, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-white flex-shrink-0 mt-0.5">
                      <span className="text-black text-sm font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-base font-black text-white tracking-wider mb-3 uppercase">
                      {reason.title}
                    </h3>
                    <p className="font-body text-gray-300 text-lg leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Image */}
          <div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
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
