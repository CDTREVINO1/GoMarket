import { getServerSession } from "next-auth/next";
import { authOptions } from "lib/auth";
import { redirect } from "next/navigation";
import UserProfile from "components/profile/user-profile";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/auth");

  return <UserProfile />;
}
