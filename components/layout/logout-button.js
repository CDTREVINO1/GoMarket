"use client";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button
      className="... block rounded py-2 pl-3 pr-4 text-gray-900 transition delay-150 duration-300 ease-in-out  hover:-translate-y-1 hover:bg-gray-100 hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-blue-500 lg:hover:scale-110"
      onClick={() => signOut()}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
