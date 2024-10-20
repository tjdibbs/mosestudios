import React from "react";
import Image from "next/image";
import { teamMembers } from "@lib/constants";
import InfoLayout from "@comp/info/InfoLayout";

function Team() {
  return (
    <InfoLayout>
      <div className="team-container p-4">
        <div className="header max-w-3xl mx-auto text-center mt-10">
          <div className="title font-extrabold text-3xl mb-2">
            THE ROSHE<span className="text-primary">STUDIOS</span> TEAM
          </div>
          <div className="leading-6">
            We believe in a diverse range of personnel to bring creative skills,
            thoughts, and ideas to the table. Our workforce of over 25 persons
            consists of youth mostly within the age range of 21 and 40. We all
            have a sense of shared responsibility in a friendly work environment
            that fosters creativity and learning.
          </div>
        </div>

        <div className="members flex gap-6 flex-wrap justify-center mx-auto my-20">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="h-auto p-6 w-[450px] max-w-[400px] min-h-[400px] grid place-items-center place-content-center  text-center bg-bgDarkSecondary text-white/90 rounded-xl shadow-lg"
            >
              <div className="image-wrap">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={150}
                  height={150}
                  className="rounded-full border-4 border-solid border-black object-cover"
                />
              </div>
              <div className="name mt-3 font-bold">{member.name}</div>
              <div className="role mb-3 text-sm text-primary capitalize">
                {member.role}
              </div>

              <div className="">{member.description}</div>
            </div>
          ))}
        </div>
      </div>
    </InfoLayout>
  );
}

export default Team;
5;
