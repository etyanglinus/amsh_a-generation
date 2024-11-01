"use client";
import Image from "next/image";
import { useState } from "react";

// Define an interface for the team member object
interface TeamMember {
  name: string;
  image: string;
  role: string;
  description: string;
}

const AboutSectionThree = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      name: "Samuel Kodilu",
      image: "/images/team/ceo.jpg", // Update with actual image path
      role: "CEO",
      description: "Leading the company towards innovation and growth.",
    },
    {
      name: "Justine Timberlake Omwenga",
      image: "/images/team/cfo.jpg", // Update with actual image path
      role: "CFO",
      description: "Managing financial strategies and operations.",
    },
    {
      name: "Robert Aundo",
      image: "/images/team/coo.jpeg", // Update with actual image path
      role: "COO",
      description: "Overseeing daily operations and business functions.",
    },
    {
      name: "Andrew Kyosi",
      image: "/images/team/head of coporate.jpg", // Update with actual image path
      role: "Head of Corporate",
      description: "Driving corporate strategy and partnerships.",
    },
  ]);

  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          {/* Team Introduction Section */}
          <div className="w-full px-4 lg:w-1/2">
            <div className="max-w-[470px]">
              <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                Meet the Team
              </h3>
              <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                Our team is made up of talented individuals who are committed to building financial solutions. We bring diverse skills and a collaborative spirit to everything we do.
              </p>
            </div>
          </div>

          {/* Team Member Profiles Section */}
          <div className="w-full px-4 lg:w-1/2">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2">
              {teamMembers.map((member, index) => (
                <div key={index} className="w-[300px] rounded-lg shadow-lg overflow-hidden bg-white text-center p-4">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gray-300">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="mb-2 text-lg font-bold text-black dark:text-white">{member.name}</h4>
                  <p className="mb-2 text-sm font-semibold text-gray-500">{member.role}</p>
                  <p className="text-sm text-body-color">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionThree;
