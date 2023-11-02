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
    <section className="pb-8 text-gray-900 dark:bg-gray-900 ">
      <div className="flex flex-col items-center justify-start pt-10 mx-auto space-y-8 h-1/2 px-14 sm:md:px-8">
        <h1 className="text-2xl font-bold dark:text-white">Change Password</h1>

        <form onSubmit={submitHandler} className="w-full max-w-md space-y-6">
          {status && (
            <div className="text-center text-blue-500 dark:text-blue-300">
              {status}
            </div>
          )}

          <div>
            <label
              className="block mb-2 text-sm font-medium dark:text-white"
              htmlFor="old-password">
              Current Password
            </label>
            <input
              className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:border-white dark:bg-gray-800 dark:text-white sm:text-sm"
              type="password"
              id="old-password"
              ref={oldPasswordRef}
              onClick={() => setStatus("")}
            />
          </div>

          <div>
            <label
              className="block mb-2 text-sm font-medium dark:text-white"
              htmlFor="new-password">
              New Password
            </label>
            <input
              className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:border-white dark:bg-gray-800 dark:text-white sm:text-sm"
              type="password"
              id="new-password"
              ref={newPasswordRef}
              onClick={() => setStatus("")}
            />
          </div>

          <div>
            <label
              className="block mb-2 text-sm font-medium dark:text-white"
              htmlFor="confirm-new-password">
              Confirm New Password
            </label>
            <input
              className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:border-white dark:bg-gray-800 dark:text-white sm:text-sm"
              type="password"
              id="confirm-new-password"
              ref={confirmNewPasswordRef}
              onClick={() => setStatus("")}
            />
          </div>

          <div className="text-center">
            <button className="px-6 py-2 mt-4 text-sm font-medium text-white bg-blue-500 border border-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:border-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
export default ProfileForm;
