// frontend/src/components/DigitalKeepsake.tsx
import React from "react";

export interface DigitalKeepsakeProps {
  email:       string;
  submittedAt: string; // ISO timestamp
}

export const DigitalKeepsake: React.FC<DigitalKeepsakeProps> = ({
  email,
  submittedAt,
}) => {
  // fixed delivery date
  const deliveryDate = new Date("2035-01-01");
  const formattedDelivery = deliveryDate.toLocaleDateString("en-GB", {
    day:   "numeric",
    month: "short",
    year:  "numeric",
  });

  return (
    <section className="py-20 px-4 flex justify-center bg-[#1E1E3F]">
      <div className="relative w-full max-w-4xl">
        {/* 1) blank certificate graphic */}
        <img
          src="/SiagaCapsule_Cert.png"
          alt="Digital Certificate of Participation"
          className="w-full h-auto block"
        />

        {/* 2) email overlay */}
        <div
          className="absolute left-1/2 text-white font-bold"
          style={{
            top:       "38%",             // tweak until it’s perfectly aligned
            transform: "translateX(-50%)",
            fontSize:  "1.25rem",
          }}
        >
          {email}
        </div>

        {/* 3) delivery date overlay */}
        <div
          className="absolute left-1/2 text-yellow-300 font-semibold"
          style={{
            top:       "56%",            // tweak until it sits in the seal
            transform: "translateX(-50%)",
            fontSize:  "1rem",
          }}
        >
          Delivery by {formattedDelivery}
        </div>
      </div>
    </section>
  );
};
