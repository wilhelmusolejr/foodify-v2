import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faL, faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";

// Components
import Logo from "./Logo";
import NavLink from "./NavLink";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

import { useAuthStore } from "../stores/useAuthStore";
import { useRef } from "react";
import { useModal } from "../context/ModalContext";
import Button from "./Global/Button";

export default function Navigator() {
  const { modalType, openModal } = useModal();

  // Ref for handling clicks outside the dropdown
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [navIsOpen, navSetIsOpen] = useState(false);

  // Zustand
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const handleLogout = useAuthStore((state) => state.logout);

  let PLACEHOLDER_AVATAR;

  if (isLoggedIn) {
    PLACEHOLDER_AVATAR = `https://placehold.co/40x40/4c3c3a/ffffff?text=${user.firstName[0]}`;
  }

  return (
    <>
      {navIsOpen && (
        <div className="fixed inset-0 z-51 bg-black/90 flex flex-col items-center justify-center">
          {isLoggedIn && (
            <>
              {/* name */}
              <div className="relative bg-white w-10/12 rounded-lg px-3 py-1" ref={dropdownRef}>
                <div
                  className="flex items-center gap-2 p-2 cursor-pointer rounded-xl transition duration-150  "
                  onClick={() => setIsOpen(!isOpen)}
                  aria-expanded={isOpen}
                >
                  {/* Profile Picture (Avatar) */}
                  <img
                    src={user?.profileUrl || PLACEHOLDER_AVATAR}
                    alt={`${user.firstName}'s profile`}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-300 shadow-md"
                  />

                  {/* User Name */}
                  <div className="">
                    <h2 className="text-sm font-semibold text-gray-800">{user.firstName}</h2>
                  </div>

                  {/* Dropdown Indicator Icon */}
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-20 transition-opacity duration-200 origin-top-right animate-fade-in">
                    <a href={`/profile/${user.id}`} className="block p-5 border-b border-gray-100">
                      <p className="font-medium text-gray-900 truncate">Profile</p>
                    </a>

                    {/* Menu Items */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full p-5 text-red-600 cursor-pointer hover:bg-red-50 hover:text-red-700 transition duration-150"
                    >
                      {/* Logout Icon (Inline SVG) */}
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        ></path>
                      </svg>
                      Log Out
                    </button>
                  </div>
                )}

                {/* Simple CSS animation for a smoother dropdown appearance */}
                <style jsx="true">{`
                  @keyframes fade-in {
                    from {
                      opacity: 0;
                      transform: scale(0.95) translateY(-5px);
                    }
                    to {
                      opacity: 1;
                      transform: scale(1) translateY(0);
                    }
                  }
                  .animate-fade-in {
                    animation: fade-in 0.2s ease-out;
                  }
                `}</style>
              </div>
            </>
          )}

          {/* nav link */}
          <div className="mt-20">
            <ul className="uppercase flex gap-10 flex-col items-center">
              <NavLink label={"Home"} url="/" />
              <NavLink label={"About"} url="/about" />
              <NavLink label={"Category"} url="/category" />
              <NavLink label={"Blog"} url="/blog" />
              <NavLink label={"Faq"} url="/faq" />
              <li className="text-gray-500">
                <a href="/search">
                  <FontAwesomeIcon icon={faSearch} className="text-base" />
                </a>
              </li>
            </ul>
          </div>

          {!isLoggedIn && (
            <>
              {/* login and register */}
              <div className="flex items-center gap-4 mt-20">
                <button
                  className="text-xl cursor-pointer hover:underline text-white"
                  onClick={() => openModal("login")}
                >
                  Login
                </button>

                <div className="" onClick={() => openModal("register")}>
                  <Button>Register</Button>
                </div>
              </div>
            </>
          )}

          <FontAwesomeIcon
            icon={faXmark}
            size="2x"
            className="absolute top-10 right-10 text-white"
            onClick={() => {
              navSetIsOpen(false);
            }}
          />
        </div>
      )}

      <nav className="bg-white w-10/12 mx-auto mt-10 p-5 rounded-lg border border-black/20 flex justify-between items-center gap-20 lg:gap-10 sticky top-5 z-50 shadow-2xl">
        <div className="flex-1">
          <Logo />
        </div>

        <div className="hidden lg:block">
          <ul className="uppercase flex gap-5 items-center">
            <NavLink label={"Home"} url="/" />
            <NavLink label={"About"} url="/about" />
            <NavLink label={"Category"} url="/category" />
            <NavLink label={"Blog"} url="/blog" />
            <NavLink label={"Faq"} url="/faq" />
            <NavLink
              label={<FontAwesomeIcon icon={faSearch} className="text-base" />}
              url="/search"
            />
          </ul>
        </div>

        <div className="">
          {!isLoggedIn ? (
            <>
              {/* login and register */}
              <div className="hidden lg:flex items-center gap-4 ">
                <button
                  className="text-xl cursor-pointer hover:underline"
                  onClick={() => openModal("login")}
                >
                  Login
                </button>

                <div className="" onClick={() => openModal("register")}>
                  <Button>Register</Button>
                </div>
              </div>
            </>
          ) : (
            // Name
            <>
              <div className="relative hidden lg:block" ref={dropdownRef}>
                <div
                  className="flex items-center gap-2 p-2 cursor-pointer rounded-xl transition duration-150  "
                  onClick={() => setIsOpen(!isOpen)}
                  aria-expanded={isOpen}
                >
                  {/* Profile Picture (Avatar) */}
                  <img
                    src={user?.profileUrl || PLACEHOLDER_AVATAR}
                    alt={`${user.firstName}'s profile`}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-300 shadow-md"
                  />

                  {/* User Name */}
                  <div className="hidden sm:block">
                    <h2 className="text-sm font-semibold text-gray-800">{user.firstName}</h2>
                  </div>

                  {/* Dropdown Indicator Icon */}
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-20 transition-opacity duration-200 origin-top-right animate-fade-in">
                    <a href={`/profile/${user.id}`} className="block p-5 border-b border-gray-100">
                      <p className="font-medium text-gray-900 truncate">Profile</p>
                    </a>

                    {/* Menu Items */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full p-5 text-red-600 cursor-pointer hover:bg-red-50 hover:text-red-700 transition duration-150"
                    >
                      {/* Logout Icon (Inline SVG) */}
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        ></path>
                      </svg>
                      Log Out
                    </button>
                  </div>
                )}

                {/* Simple CSS animation for a smoother dropdown appearance */}
                <style jsx="true">{`
                  @keyframes fade-in {
                    from {
                      opacity: 0;
                      transform: scale(0.95) translateY(-5px);
                    }
                    to {
                      opacity: 1;
                      transform: scale(1) translateY(0);
                    }
                  }
                  .animate-fade-in {
                    animation: fade-in 0.2s ease-out;
                  }
                `}</style>
              </div>
            </>
          )}
        </div>

        {/* BAR */}
        <div className="lg:hidden">
          <FontAwesomeIcon
            icon={faBars}
            className="text-3xl"
            onClick={() => {
              navSetIsOpen(true);
            }}
          />
        </div>
      </nav>

      {modalType === "login" && <LoginModal />}
      {modalType === "register" && <RegisterModal />}
    </>
  );
}
