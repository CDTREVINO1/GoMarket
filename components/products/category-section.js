"use client"

import { Fragment, useState } from "react"
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { XMarkIcon } from "@heroicons/react/24/outline"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default function CategorySection({ products }) {
  const [open, setOpen] = useState(false)

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  )

  const filters = [
    {
      id: "categories",
      name: "Categories",
      options: categories.map((category) => ({
        value: category,

        label: capitalizeFirstLetter(category),
      })),
    },
  ]

  return (
    <div className={`bg-gray-50 dark:bg-gray-600 `}>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 sm:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative flex flex-col w-full h-full max-w-xs py-4 pb-6 ml-auto overflow-y-auto bg-white shadow-xl dark:bg-gray-900">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-200">
                    Filters
                  </h2>
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-700"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>

                <form className="mt-4">
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.name}
                      className="px-4 py-6 border-t border-gray-200"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="flow-root -mx-2 -my-3">
                            <Disclosure.Button className="flex items-center justify-between w-full px-2 py-3 text-sm text-gray-400 bg-white dark:text-gray-200">
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                {section.name}
                              </span>
                              <span className="flex items-center ml-6">
                                <ChevronDownIcon
                                  className={classNames(
                                    open ? "-rotate-180" : "rotate-0",
                                    "h-5 w-5 transform"
                                  )}
                                  aria-hidden="true"
                                />
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-700 border-gray-300 rounded focus:ring-blue-700"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-500 dark:text-gray-300"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="max-w-3xl px-4 mx-auto text-center sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="py-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            All Cards
          </h1>
          <p className="max-w-3xl mx-auto mt-4 text-base text-gray-500 dark:text-white">
            Thoughtfully designed objects for the workspace, home, and travel.
          </p>
        </div>

        <section
          aria-labelledby="filter-heading"
          className="flex items-center justify-end py-6 border-t border-gray-200 dark:border-gray-700"
        >
          <h2 id="filter-heading" className="sr-only">
            Product filters
          </h2>

          <div className="flex items-center justify-between">
            <button
              type="button"
              className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 sm:hidden"
              onClick={() => setOpen(true)}
            >
              Filters
            </button>

            <Popover.Group className="hidden sm:flex sm:items-baseline sm:space-x-8">
              {filters.map((section, sectionIdx) => (
                <Popover
                  as="div"
                  key={section.name}
                  id={`desktop-menu-${sectionIdx}`}
                  className="relative inline-block text-left"
                >
                  <div>
                    <Popover.Button className="inline-flex items-center justify-center text-sm font-medium text-gray-700 group hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                      <span>{section.name}</span>
                      {sectionIdx === 0 ? (
                        <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                          1
                        </span>
                      ) : null}
                      <ChevronDownIcon
                        className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-100"
                        aria-hidden="true"
                      />
                    </Popover.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Popover.Panel className="absolute right-0 z-10 p-4 mt-2 origin-top-right bg-white rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-900">
                      <form className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              defaultValue={option.value}
                              type="checkbox"
                              className="w-4 h-4 text-blue-700 border-gray-300 rounded focus:ring-blue-700"
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="pr-6 ml-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-gray-300"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </form>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              ))}
            </Popover.Group>
          </div>
        </section>
      </div>
    </div>
  )
}
