import React, { useState } from "react";

import FormLabelInput from "./FormLabelInput";
import { useAuthStore } from "../stores/useAuthStore";

// Library
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function LoginModal({ handleButtonModal }) {
  let backend_url = import.meta.env.VITE_BACKEND_URL;

  // STATE
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Zustand
  const login = useAuthStore((state) => state.login);

  // HANDLE
  const handleChange = (e, target) => {
    setFormData((prevData) => ({
      ...prevData,
      [target]: e.target.value,
    }));
  };

  const handleCloseModal = (e) => {
    if (e.target.classList.contains("close-modal")) {
      handleButtonModal("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Client-Side Validation (e.g., check required fields)
    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields (Email, Password).");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      let backend_api_url = `${backend_url}/api/auth/login`;
      const response = await axios.post(backend_api_url, formData);
      const { token, user } = response.data;
      login({ token, user });
      handleButtonModal("");
      set;
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Modal for Login */}
      <div
        className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 close-modal"
        onClick={handleCloseModal}
      >
        <div className="w-10/12 mx-auto max-w-[600px] bg-white rounded-lg">
          {/* Heading */}
          <div className="p-5 py-7 border-b border-black/10 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Log In</h2>
            <FontAwesomeIcon
              icon={faXmark}
              size="2x"
              className="cursor-pointer close-modal"
              onClick={handleCloseModal}
            />
          </div>

          {/* Height-Controlled Body */}
          <div className="h-[70vh] relative flex flex-col">
            {isLoading ? (
              // --- LOADING SPINNER ---
              <div className="bg-green-200/50 absolute inset-0 h-full w-full z-10 flex justify-center items-center">
                <div className="flex justify-center items-center py-10 w-full">
                  <div
                    className="w-12 h-12 border-4 border-gray-200 border-t-4 border-t-green-600 rounded-full animate-spin"
                    role="status"
                    aria-live="polite"
                  ></div>
                </div>
              </div>
            ) : (
              // --- LOGIN FORM & FOOTER ---
              <>
                <form
                  onSubmit={handleSubmit}
                  id="myAwesomeForm"
                  className={`p-5 flex flex-col gap-5 overflow-y-auto grow`}
                >
                  {/* Error Message */}
                  {error && (
                    <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg border border-red-300">
                      {error}
                    </div>
                  )}

                  {/* Email Input */}
                  <FormLabelInput
                    labelName={"Email"}
                    isRequired={true}
                    inputType={"email"}
                    id={"email"}
                    value={formData.email}
                    onChange={handleChange}
                  />

                  {/* Password Input */}
                  <FormLabelInput
                    labelName={"Password"}
                    isRequired={true}
                    inputType={"password"}
                    id={"password"}
                    value={formData.password}
                    onChange={handleChange}
                  />
                </form>

                {/* FOOTER - Fixed at the bottom of the modal */}
                <div className="p-5 border-t border-gray-200 bg-white sticky bottom-0 z-20 rounded-b-lg">
                  <button
                    form="myAwesomeForm"
                    type="submit"
                    className="w-full cursor-pointer flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150"
                  >
                    Log In
                  </button>
                  <div className="text-center pt-4">
                    <p className="text-sm">
                      Don't have an account yet?{" "}
                      <span className="text-green-800 font-medium underline ">
                        <button
                          className="cursor-pointer uppercase"
                          onClick={() => {
                            handleButtonModal("register");
                          }}
                        >
                          Register now
                        </button>
                      </span>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
