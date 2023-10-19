import CEO from "@assets/ceo.jpg";
import Dolapo from "@assets/dolapo.jpg";
import Aballero from "@assets/aballero.jpg";
import Yusuf from "@assets/yusuf.png";
import Uhe from "@assets/uhe.jpg";

const teamMembers = [
  {
    name: "EMANUEL ABALLERO",
    role: "Technical Artist",
    image: Aballero,
  },
  {
    name: "OLAOPA DOLAPO",
    role: "Business Development",
    image: Dolapo,
  },
  {
    name: "MOSES OMOBOLAJI",
    role: "founder/creative director",
    image: CEO,
    description: (
      <div className="description text-xs mb-6">
        <p>
          Moses Omobolaji has been a digital artist since 2014 and has a
          background in 3D animation as well as Still and Motion Graphics. He
          has worked in <b>OrangeVfx studios</b> and{" "}
          <b>Taeps Animation Studios</b> as an animator.
        </p>
        <p className="mt-4">
          While in orange, he worked on several projects including the{" "}
          <b>AU Agenda</b>
          2063. and he is currently directing his debut short film{" "}
          <b>NEW AGE</b> set to be released in 2024.
        </p>
      </div>
    ),
  },
  {
    name: "UHEADA ",
    role: "Concept Artist",
    image: Uhe,
  },
  {
    name: "YUSUF ABDURRAHMAH",
    role: "CHARACTER ARTIST ",
    image: Yusuf,
  },
];

export default teamMembers;
