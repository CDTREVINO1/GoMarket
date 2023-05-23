import Link from "next/link";
import { useEffect, useState } from "react";
import { Collapse } from "flowbite";

const Header = (props) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const $targetEl = document.getElementById("targetEl");
    const $triggerEl = document.getElementById("triggerEl");

    const options = {
      onCollapse: () => {
        console.log("element has been collapsed");
      },
      onExpand: () => {
        console.log("element has been expanded");
      },
      onToggle: () => {
        console.log("element has been toggled");
      },
    };
    const collapse = new Collapse($targetEl, $triggerEl, options);
  }, []);

  const handleToggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <header>
      <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
          <Link href="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Online-Store
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-hamburger"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-hamburger"
            aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"></path>
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-hamburger">
            <ul className="flex flex-col mt-4 font-medium rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <li>
                <Link
                  href="auth"
                  className="duration-300 ... hover:-translate-y-1 lg:hover:scale-110 transition ease-in-out delay-150 block py-2 pl-3 pr-4  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  aria-current="page">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="duration-300 ... hover:-translate-y-1 lg:hover:scale-110 transition ease-in-out delay-150 block py-2 pl-3 pr-4  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="duration-300 ... hover:-translate-y-1 lg:hover:scale-110 transition ease-in-out delay-150 block py-2 pl-3 pr-4  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Products
                </Link>
              </li>
              <Link
                href="#"
                className="duration-300 ... hover:-translate-y-1 lg:hover:scale-110 transition ease-in-out delay-150 block py-2 pl-3 pr-4  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Logout
              </Link>
              <li>
              <button onClick={props.onShowCart}>Shopping Cart</button>
              </li>
              <Link
                href="/cart"
                className="duration-300 ... hover:-translate-y-1 lg:hover:scale-110 transition ease-in-out delay-150 block py-2 pl-3 pr-4  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"></Link>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
