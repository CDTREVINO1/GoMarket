"use client";

import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  const retypePasswordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [status, setStatus] = useState("");
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current?.value;
    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef?.current.value;
    const enteredPasswordRetype = retypePasswordInputRef.current?.value;

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
      if (enteredPassword.trim() !== enteredPasswordRetype.trim()) {
        return;
      }

      try {
        const result = await createUser(
          enteredUsername,
          enteredPassword,
          enteredEmail
        );

        setStatus(result.message);
      } catch (error) {
        setStatus(error.message);
      }
    }
  };

  return (
    <section className="w-screen bg-slate-100 text-black dark:bg-slate-800">
      <div className="mx-auto flex h-screen flex-col items-center justify-between px-14 pt-16 sm:md:px-8 ">
        <div className="w-full rounded-lg bg-white shadow-xl dark:bg-slate-400 sm:md:max-w-sm md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100 md:text-2xl">
              {isLogin ? "Login" : "Sign Up"}
            </h1>
            {status && <h3>{status}</h3>}
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={submitHandler}
            >
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-slate-100"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                  placeholder="username"
                  type="text"
                  id="username"
                  required
                  ref={usernameInputRef}
                  onClick={() => {
                    setStatus("");
                  }}
                />
              </div>
              {!isLogin && (
                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                    placeholder="email"
                    type="email"
                    id="email"
                    required
                    ref={emailInputRef}
                    onClick={() => {
                      setStatus("");
                    }}
                  />
                </div>
              )}
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="focus:ring-primary-600  focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                  placeholder="••••••••"
                  type="password"
                  id="password"
                  required
                  ref={passwordInputRef}
                  onClick={() => {
                    setStatus("");
                  }}
                />
              </div>
              {!isLogin && (
                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100"
                    htmlFor="retype-password"
                  >
                    Re-type Password
                  </label>
                  <input
                    className="focus:ring-primary-600  focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                    placeholder="••••••••"
                    type="password"
                    id="retype-password"
                    required
                    ref={retypePasswordInputRef}
                    onClick={() => {
                      setStatus("");
                    }}
                  />
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex w-full items-center">
                  <button
                    type="submit"
                    data-cy="create-account"
                    className="hover:bg-primary-700 focus:ring-primary-300 mr-auto rounded-lg border border-slate-400 bg-slate-400 px-4 py-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 dark:border-slate-500 dark:bg-slate-600 dark:text-white "
                  >
                    {isLogin ? "Login" : "Create Account"}
                  </button>
                  <button
                    className="hover:bg-primary-700 focus:ring-primary-300 ml-14 rounded-lg border border-slate-400 bg-slate-400 px-4 py-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 dark:border-slate-600 dark:bg-slate-600 dark:text-white"
                    type="button"
                    onClick={switchAuthModeHandler}
                  >
                    {isLogin ? "Create account" : "Login with existing account"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthForm;
