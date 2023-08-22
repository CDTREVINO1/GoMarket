"use client";

import { useState, useRef } from "react";

function ProfileForm() {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();

  const [status, setStatus] = useState("");

  const changePasswordHandler = async (passwordData) => {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }

    return data;
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;
    const confirmedNewPassword = confirmNewPasswordRef.current?.value;

    if (enteredNewPassword.trim() !== confirmedNewPassword.trim()) {
      setStatus("New password and confirm password do not match.");
      return;
    }

    try {
      const result = await changePasswordHandler({
        oldPassword: enteredOldPassword,
        newPassword: enteredNewPassword,
      });

      setStatus(result.message);
    } catch (error) {
      setStatus(error.message);
    }

    oldPasswordRef.current.value = "";
    newPasswordRef.current.value = "";
    confirmNewPasswordRef.current.value = "";
  };

  return (
    <section className="w-screen bg-slate-100 text-black dark:bg-slate-800">
      <div className="mx-auto flex h-screen flex-col items-center justify-between px-14 pt-16 sm:md:px-8 ">
        <form onSubmit={submitHandler}>
          {status && <h3>{status}</h3>}
          <div className="items-center justify-between">
            <div className="">
              <label className="dark:text-gray-100" htmlFor="old-password">
                Current Password
              </label>
              <input
                className="focus:ring-primary-600 focus:border-primary-600 block rounded-lg border border-gray-300 bg-gray-50 p-1 text-gray-900 sm:text-sm"
                type="password"
                id="old-password"
                ref={oldPasswordRef}
                onClick={() => setStatus("")}
              />
            </div>
            <div>
              <label className="dark:text-gray-100" htmlFor="new-password">
                New Password
              </label>
              <input
                className="focus:ring-primary-600 focus:border-primary-600 block rounded-lg border border-gray-300 bg-gray-50 p-1 text-gray-900 sm:text-sm"
                type="password"
                id="new-password"
                ref={newPasswordRef}
                onClick={() => setStatus("")}
              />
            </div>

            <div>
              <label className="dark:text-gray-100" htmlFor="new-password">
                Confirm New Password
              </label>
              <input
                className="focus:ring-primary-600 focus:border-primary-600 block rounded-lg border border-gray-300 bg-gray-50 p-1 text-gray-900 sm:text-sm"
                type="password"
                id="confirm-new-password"
                ref={confirmNewPasswordRef}
                onClick={() => setStatus("")}
              />
            </div>
            <div>
              <button className="hover:bg-primary-700 focus:ring-primary-300 ml-6 mt-3 rounded-lg border border-slate-400 bg-slate-400 px-4 py-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 dark:border-slate-600 dark:bg-slate-600 dark:text-white ">
                Change Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ProfileForm;
