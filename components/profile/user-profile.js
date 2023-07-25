"use client";

import ProfileForm from "./profile-form";

export default function UserProfile() {
  const changePasswordHandler = async (passwordData) => {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
  };

  return (
    <main>
      <section className="h-screen w-screen bg-slate-300">
        <ProfileForm onChangePassword={changePasswordHandler} />
      </section>
    </main>
  );
}
