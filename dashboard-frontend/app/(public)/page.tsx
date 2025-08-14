'use client'
import { SignIn, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const { user } = useUser();
  if (user) {
    return redirect("/dashboard");
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignIn
        signUpUrl=""
        appearance={{
          elements: {
            footer: { display: "none" },
            footerActionLink: { display: "none" },
          },
        }}
      />
    </div>
  );
}
