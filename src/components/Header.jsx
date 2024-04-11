import { Fragment, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useState } from "react";
import { CryptoContext, CryptoProvider } from "../CryptoContext";
import { Link } from "react-router-dom";

export const Header = () => {
  const { curr, setCurr } = useContext(CryptoContext);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function onClickHandler(curr) {
    setCurr(curr);
  }

  return (
    <nav className="bg-gray-950 border-b-gray-800 border-b-2 static">
      <div className="flex justify-around">
        <Link to="/">
          <svg
            className="mt-2 text-yellow-500"
            xmlns="http://www.w3.org/2000/svg"
            width="6em"
            height="6em"
            viewBox="0 0 48 48"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M40.5 5.5h-33a2 2 0 0 0-2 2v33a2 2 0 0 0 2 2h33a2 2 0 0 0 2-2v-33a2 2 0 0 0-2-2"
            />
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m15.39 42.5l5.421-11.353l1.378 3.084l3.474-9.627l1.745 2.304l2.514-5.563l1.128 1.43L42.5 9.133m-28.228 4.949h-1.717"
            />
            <path
              fill="none"
              stroke="currentColor"
              stroke-linejoin="round"
              d="M14.272 14.082v4.846h3.199a2.423 2.423 0 1 0 0-4.846Z"
            />
            <path
              fill="none"
              stroke="currentColor"
              stroke-linejoin="round"
              d="M14.272 18.928v5.165h3.41a2.583 2.583 0 1 0 0-5.165Z"
            />
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.272 24.09h-1.717m1.713.032v1.589m2.779-1.589v1.589m-2.779-13.379v1.59m2.779-1.59v1.59"
            />
          </svg>
        </Link>
        <Menu as="div" className="relative inline-block text-left mt-8">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent text-yellow-500 px-3 py-2 text-sm font-semibold border-yellow-500 border shadow-sm ring-1 ring-inset hover:bg-gray-600">
              {curr}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </Menu.Button>
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
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active
                          ? "bg-slate-400 text-yellow-500"
                          : "text-yellow-500",
                        "block px-4 py-2 text-sm"
                      )}
                      onClick={() => onClickHandler("USD")}
                    >
                      USD
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active
                          ? "bg-slate-400 text-yellow-500"
                          : "text-yellow-500",
                        "block px-4 py-2 text-sm"
                      )}
                      onClick={() => onClickHandler("CAD")}
                    >
                      CAD
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  );
};
