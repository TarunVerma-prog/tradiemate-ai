import Image from "next/image";

const teamMembers = [
  {
    image: "/images/team-01.jpg",
    name: "Lara Lamprecht",
    role: "CEO and Founder",
  },
  {
    image: "/images/team-02.jpg",
    name: "Timothy Chandran",
    role: "Head of Sales",
  },
  {
    image: "/images/team-03.jpg",
    name: "Marie Koniuszek",
    role: "Customer Success Lead",
  },
  {
    image: "/images/team-04.jpg",
    name: "Alyssa Chuzeville",
    role: "Head of Product",
  },
  {
    image: "/images/team-05.jpg",
    name: "Dominik Prasad",
    role: "Senior Researcher",
  },
  {
    image: "/images/team-06.jpg",
    name: "Darya Semenova",
    role: "Software Engineer",
  },
  {
    image: "/images/team-07.jpg",
    name: "Mary Pullgat",
    role: "Software Engineer",
  },
  {
    image: "/images/team-08.jpg",
    name: "Quentin Renvoye",
    role: "Senior Marketing Manager",
  },
  {
    image: "/images/team-09.jpg",
    name: "Justin Jackson",
    role: "Content & SEO Lead",
  },
  {
    image: "/images/team-10.jpg",
    name: "Alice Nguyen",
    role: "Engineering Manager",
  },
  {
    image: "/images/team-11.jpg",
    name: "Duyk Hermann",
    role: "Product Designer",
  },
  {
    image: "/images/team-12.jpg",
    name: "Kevon Cheung",
    role: "Creative Director",
  },
];

export default function Team() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1] md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              It's all about the people
            </h2>
          </div>
          {/* Members */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {teamMembers.map((member, index) => (
              <div key={index} className="w-40 text-center md:w-52">
                <div className="relative mb-4 inline-flex before:absolute before:inset-0 before:rounded-full before:bg-linear-to-b before:from-indigo-500 before:to-gray-950 before:opacity-15">
                  <Image
                    className="rounded-full"
                    src={member.image}
                    width={80}
                    height={80}
                    alt={`Team member ${member.name}`}
                  />
                </div>
                <div className="mb-1 font-nacelle text-lg text-gray-200">
                  {member.name}
                </div>
                <p className="text-sm text-indigo-200/65">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
