"use client";

import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Footer from "components/layout/footer";

const createUser = async (username, password, email) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ username, password, email }),
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

function AuthForm() {
  const emailInputRef = useRef();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmedPasswordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [status, setStatus] = useState("");
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const clearLoginRefs = () => {
    usernameInputRef.current.value = "";
    passwordInputRef.current.value = "";
  };

  const clearCreateAccountRefs = () => {
    usernameInputRef.current.value = "";
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    confirmedPasswordInputRef.current.value = "";
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current?.value;
    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef?.current.value;
    const confirmedPassword = confirmedPasswordInputRef.current?.value;

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        user: enteredUsername,
        password: enteredPassword,
        callbackUrl: "/",
      });

      if (!result.error) {
        router.refresh();
        router.replace("/");
      }
      setStatus(result.error);
    } else {
      if (enteredPassword.trim() !== confirmedPassword.trim()) {
        setStatus("New password and confirm password do not match.");
        return;
      }

      try {
        const result = await createUser(
          enteredUsername,
          enteredPassword,
          enteredEmail
        );

        clearCreateAccountRefs();
        switchAuthModeHandler();
        setStatus(result.message);
      } catch (error) {
        setStatus(error.message);
      }
    }
  };

  return (
    <section className="w-screen bg-slate-100 text-black dark:bg-slate-800">
      <div className="sm:md mx-auto mt-20 flex h-screen flex-col items-center justify-center px-6">
        <div className="mb-auto w-full rounded-lg bg-white shadow-xl dark:bg-slate-400 sm:md:max-w-sm md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100 md:text-2xl">
              {isLogin ? "Login" : "Sign Up"}
            </h1>
            {status && <h3>{status}</h3>}
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={submitHandler}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  required
                  ref={usernameInputRef}
                  className="w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  onClick={() => setStatus("")}
                />
              </div>
              {!isLogin && (
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    required
                    ref={emailInputRef}
                    className="w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    onClick={() => setStatus("")}
                  />
                </div>
              )}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  required
                  ref={passwordInputRef}
                  className="w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  onClick={() => setStatus("")}
                />
              </div>
              {!isLogin && (
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    placeholder="••••••••"
                    required
                    ref={confirmedPasswordInputRef}
                    className="w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    onClick={() => setStatus("")}
                  />
                </div>
              )}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  data-cy="create-account"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-400">
                  {isLogin ? "Log in" : "Create Account"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    switchAuthModeHandler();
                    isLogin ? clearLoginRefs() : clearCreateAccountRefs();
                  }}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-400">
                  {isLogin
                    ? "Create an Account"
                    : "Log in with Existing Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default AuthForm;
