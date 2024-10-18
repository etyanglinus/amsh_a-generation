"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

// Define an interface for the team member object
interface TeamMember {
  name: string;
  image: string;
  role: string;
  description: string;
}

const AboutSectionThree = () => {
  // Use the interface to define the type for the state
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch('/api/team');
        const data: TeamMember[] = await response.json(); // Ensure fetched data matches the type
        setTeamMembers(data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers();
  }, []);

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
                <div key={index} className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
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
