import Link from "next/link";

const Footer = () => {
  return (
    <footer className="m-4 mt-auto bg-white rounded-lg shadow dark:bg-gray-900">
      <div className="w-full max-w-screen-xl p-4 mx-auto md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="#" className="flex items-center mb-4 sm:mb-0">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Online-Store
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link href="/resources" className="mr-4 hover:underline md:mr-6">
                Resources
              </Link>
              <Link href="/legal" className="mr-4 hover:underline md:mr-6">
                Legal
              </Link>
              <Link href="/privacy" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </Link>
              <Link href="/terms" className="mr-4 hover:underline md:mr-6">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <Link href="#" className="hover:underline">
            Online-Store™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
