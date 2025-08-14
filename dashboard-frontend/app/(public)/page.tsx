import { SignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
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
