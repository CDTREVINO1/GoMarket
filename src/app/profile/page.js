import { getServerSession } from "next-auth/next";
import { authOptions } from "lib/auth";
import { redirect } from "next/navigation";
import ProfileForm from "components/profile/profile-form";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/auth");

  return (
    <main>
      <section className="h-screen w-screen bg-slate-300">
        <ProfileForm />
      </section>
    </main>
  );
}
