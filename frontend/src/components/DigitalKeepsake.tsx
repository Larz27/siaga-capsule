import React from "react";

export interface DigitalKeepsakeProps {
  email:       string;
  submittedAt: string; // ISO timestamp, e.g. "2025-07-14T03:07:57.000Z"
}

export const DigitalKeepsake: React.FC<DigitalKeepsakeProps> = ({
  email,
  submittedAt,
}) => {
  // You can derive a custom delivery date from submittedAt if you like.
  // Here we use the fixed “1 Jan 2035”:
  const deliveryDate = new Date("2035-01-01");
  const formattedDelivery = deliveryDate.toLocaleDateString("en-GB", {
    day:   "numeric",
    month: "short",
    year:  "numeric",
  });

  return (
    <section className="py-20 px-4 flex justify-center bg-[#1E1E3F]">
      <div className="relative w-full max-w-4xl">
        {/* Certificate background */}
        <img
          src="/SiagaCapsule_Cert.png"
          alt="Digital Certificate of Participation"
          className="w-full h-auto block"
        />

        {/* Overlay user email */}
        <div
          className="absolute left-1/2 text-white font-bold"
          style={{
            top:       "38%",             // tweak until it aligns perfectly
            transform: "translateX(-50%)",
            fontSize:  "1.25rem",
          }}
        >
          {email}
        </div>

        {/* Overlay delivery date */}
        <div
          className="absolute left-1/2 text-yellow-300 font-semibold"
          style={{
            top:       "56%",            // tweak until it sits over the seal
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
