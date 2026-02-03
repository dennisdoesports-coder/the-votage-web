'use client';

import Image from 'next/image';

export function LeadPastors() {
  return (
    <section className="py-20 px-6 text-black md:px-[80px]" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            MEET OUR LEAD PASTORS
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto">
            Explore our journey, our heart for the truth, and find a community where you truly belong.
          </p>
        </div>

        {/* Pastor Profiles */}
        <div className="space-y-16">
          {/* Rev. Ohis Ojeikere - Image Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative aspect-[4/3]">
              <Image
                src="/img/about/lead-rev.jpg"
                alt="Rev. Ohis Ojeikere preaching"
                fill
                className="w-full h-auto rounded-3xl object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectPosition: 'center 20%' }}
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold">Rev. Ohis Ojeikere</h3>
              <p className="text-base md:text-lg leading-relaxed">
                Rev. Ohis Ojeikere is a seasoned teacher and visionary with an apostolic mandate to reach this generation. From leading children's ministry at age 13 to serving as an RCCG Youth Pastor, his life has been defined by a deep commitment to the Great Commission. In 2013, he co-founded The Winlos, a global media ministry impacting millions.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                Following a divine instruction in 2018, he founded The Votage Church to bridge digital reach with spiritual depth. He is dedicated to the business of fervent prayer and presenting every man mature in Christ.
              </p>
            </div>
          </div>

          {/* Pastor Anwinli Ojeikere - Text Left, Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:order-1">
              <h3 className="text-2xl md:text-3xl font-bold">Pastor Anwinli Ojeikere</h3>
              <p className="text-base md:text-lg leading-relaxed">
                Pastor Anwinli Ojeikere is a gifted minister and prayer catalyst dedicated to helping believers fulfill their divine purpose. As a pillar of The Votage and co-visionary of The Winlos, she leverages creative mediums to broadcast the Gospel globally.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                She is the convener of the Refresh Miracle Service and Refresh Morning Prayers, hosting a daily global altar at 5:00 AM. Her ministry emphasizes New Creation realities and spiritual growth. Standing as a spiritual mother, she is committed to fostering an environment where the supernatural is a daily experience.
              </p>
            </div>
            <div className="relative aspect-[4/3] lg:order-2">
              <Image
                src="/img/about/lead-FL.jpg"
                alt="Pastor Anwinli Ojeikere speaking"
                fill
                className="w-full h-auto rounded-3xl object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LeadPastors;