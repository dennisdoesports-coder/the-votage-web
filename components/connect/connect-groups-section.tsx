import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MapPin } from "lucide-react";

export default function ConnectGroupsSection() {
  const groups = [
    {
      id: 1,
      name: "KABOD CONNECT",
      day: "Tuesdays",
      location: "143 Airport Road, Ajao ADP Junction",
      time: "5:00pm",
    },
    {
      id: 2,
      name: "NEWNESS CONNECT",
      day: "Tuesdays",
      location: "342 Airport Road, Ajao ADP Junction",
      time: "5:00pm",
    },
    {
      id: 3,
      name: "UGBOWO CONNECT",
      day: "Tuesdays",
      location: "142 Airport Road, Ajao ADP Junction",
      time: "5:00pm",
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-white px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-black mb-4 leading-tight uppercase">
            FIND A CONNECT THAT FITS<br />
            INTO YOUR SCHEDULE
          </h2>
          <p className="font-body text-gray-700 text-base md:text-lg max-w-2xl mx-auto">
            Browse through connect group, more than words, they define our identity and guide how we live, serve, and grow as a community.
          </p>
        </div>

        {/* Connect Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {groups.map((group) => (
            <div key={group.id} className="bg-black rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
              {/* Group Image */}
              <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600 mb-4 flex-shrink-0">
                <Image
                  src="/img/connect-images.png"
                  alt={group.name}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Group Info */}
              <div className="flex-1 flex flex-col">
                <h3 className="font-display text-white font-black mb-4 text-base uppercase">{group.name}</h3>

                <div className="space-y-3 mb-6">
                  <div>
                    <p className="font-body text-white font-semibold text-sm">{group.day}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-white flex-shrink-0" />
                    <p className="font-body text-gray-300 text-xs">{group.location}</p>
                  </div>
                  <div>
                    <p className="font-body text-white text-sm">
                      <span className="font-semibold">Time</span> {group.time}
                    </p>
                  </div>
                </div>

                <Button className="font-body w-full bg-white text-black hover:bg-gray-200 font-bold rounded-full py-2.5 text-sm transition-colors duration-200 mt-auto">
                  Join Group
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
