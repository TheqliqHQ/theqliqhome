import Image from "next/image";

export default function ContactFaqHero() {
  return (
    <section className="flex items-start justify-between gap-10 w-full">
      {/* Title */}
      <h1 className="text-[60px] leading-[72px] font-normal text-[rgb(32,33,36)] max-w-[640px]">
        Let’s talk about your next big move.
      </h1>

      {/* Image */}
      <div className="w-[424px] h-[570.47px] flex-shrink-0">
        <Image
          src="/hero/contact.png"
          alt="Contact Hero"
          width={424}
          height={570}
          priority
          className="object-contain select-none pointer-events-none"
          draggable={false}
        />
      </div>
    </section>
  );
}
