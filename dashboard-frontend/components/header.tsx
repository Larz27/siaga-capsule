import Image from "next/image";

export default function Header() {
  return (
    <header className="p-4 flex justify-between items-center sticky top-0 bg-slate-100 z-10">
      <div className="flex items-center gap-2">
        <Image
          unoptimized
          src="/images/logo.png"
          alt="Siaga Capsule Logo"
          className="size-8"
          width={32}
          height={32}
        />
        <span className="font-bold text-xl text-gray-800">Siaga Capsule</span>
      </div>
    </header>
  );
}
