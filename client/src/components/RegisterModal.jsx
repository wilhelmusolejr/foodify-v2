import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faXmark } from "@fortawesome/free-solid-svg-icons";

// Components
import FormLabelInput from "./FormLabelInput";
import FormLabel from "./FormLabel";
import { useAuthStore } from "../stores/useAuthStore";
import ModalContainer from "./ModalContainer";

// Library
import axios from "axios";

// Context
import { useModal } from "../context/ModalContext";

import { ENV } from "@/config/env";

function generateRandomEmail() {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const domains = ["gmail.com", "yahoo.com", "outlook.net", "mailservice.co"];

  // Helper function to generate a random string of a given length
  const generateRandomString = (length) => {
    let result = "";
    const charLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
  };

  // 1. Generate username parts (e.g., "user" and "id73")
  const prefix = generateRandomString(Math.floor(Math.random() * 4) + 4); // 4-7 chars
  const suffix = generateRandomString(Math.floor(Math.random() * 3) + 2); // 2-4 chars

  // 2. Select a random domain
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];

  // 3. Combine parts
  return `${prefix}.${suffix}@${randomDomain}`;
}

export default function RegisterModal() {
  // CONTEXT
  const { openModal, closeModal } = useModal();
  const randomEmail = generateRandomEmail();

  let message = {
    invalid: "Please fill in all required fields.",
    invalidEmail: "invalid email format",
    invalidPassword: "Password must be at least 6 characters long.",
  };

  // STATE
  const [formData, setFormData] = useState({
    firstName: "Elias",
    lastName: "Vance",
    email: randomEmail,
    password: "SecureP@ssword123",
    gender: "Male",
    bio: "Passionate baker and recipe tester, specializing in gluten-free desserts and low-carb meal prep. Always looking for new culinary challenges.",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Zustand
  const login = useAuthStore((state) => state.login);

  // EFFECT
  useEffect(() => {
    let timer;
    if (isSuccess) {
      timer = setTimeout(() => {
        closeModal();
      }, 5000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isSuccess, closeModal]);

  // HANDLER
  const handleChange = (e, target) => {
    setFormData((prevData) => ({
      ...prevData,
      [target]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Client-Side Validation (e.g., check required fields)
    if (!formData.firstName || !formData.email || !formData.password) {
      setError(message.invalid);
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError(message.invalidEmail);
      return;
    }

    // Check password minimum length (Schema minlength: 6)
    if (formData.password.length < 6) {
      setError(message.invalidPassword);
      return;
    }

    // DEMO MODE
    if (ENV.isDemoMode) {
      setError("");
      setIsLoading(true);

      // Optional: fake a tiny delay so it feels real
      setTimeout(() => {
        // You can also store demo user in localStorage here if you want
        // localStorage.setItem("demo_user", JSON.stringify(formData));

        setIsLoading(false);
        setIsSuccess(true);

        let generatedId = Date.now();

        // You can also call login() with a fake token/user if you want the app to behave "logged in"
        login({
          token: "demo-token",
          user: {
            id: generatedId,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            gender: formData.gender,
            bio: formData.bio,
            profile_image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${generatedId}`,
          },
        });

        // Show demo note
        setError("Demo mode: this account exists only in your browser (no real backend/database).");
      }, 700);

      return;
    }

    // BACKEND
    // BACKEND
    // BACKEND
    try {
      setIsLoading(true);
      setError("");

      let backend_api_url = `${ENV.backendUrl}/api/auth/register`;
      const response = await axios.post(backend_api_url, formData);
      const { token, user } = response.data;

      if (response.status === 201) {
        setIsSuccess(true);
        login({ token, user });
      }
    } catch (apiError) {
      // console.error("Registration error:", apiError);

      // Backend offline / network issue
      if (!apiError.response) {
        // No response at all from server: network error, CORS, server down, etc.
        setError(
          "The server is currently unavailable. Please try again later or run the backend locally."
        );
        setIsSuccess(false);
        return;
      }

      // Backend is up but returned an error (4xx/5xx)
      const status = apiError.response.status;
      const messageFromServer = apiError.response.data?.message;

      if (status >= 500) {
        setError("Server error. Please try again later.");
      } else if (status === 400 || status === 409) {
        // validation / conflict / duplicate email, etc.
        setError(
          messageFromServer || "Registration failed due to invalid data. Please check your input."
        );
      } else {
        setError(messageFromServer || "Registration failed. Please try again.");
      }

      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenLogin = () => openModal("login");

  return (
    <ModalContainer>
      <div className="w-10/12 mx-auto max-w-[400px] bg-white rounded-lg ">
        {/* Heading */}
        <div className="p-5 py-7 border-b border-black/10 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Create Your Account</h2>
          <FontAwesomeIcon
            icon={faXmark}
            size="2x"
            className="cursor-pointer close-modal"
            onClick={closeModal}
          />
        </div>

        <div className="h-[70vh] relative flex flex-col">
          {isSuccess ? (
            // --- SUCCESS MESSAGE DISPLAY ---
            <div className="absolute inset-0 h-full w-full z-10 flex flex-col justify-center items-center bg-white rounded-lg shadow-2xl p-8 text-center">
              {/* Replaced generic SVG with Font Awesome Utensils Icon */}
              <FontAwesomeIcon
                icon={faUtensils}
                className="text-6xl text-amber-500 mb-6 animate-pulse"
              />

              <h3 className="text-2xl font-semibold text-green-600 mb-6">Registration Complete!</h3>
              <p className="text-base text-gray-600 mb-4">
                Your account is ready. Get cooking with your first recipe!
              </p>
              <p className="text-sm text-gray-500 mb-6">Closing in 5 seconds...</p>

              <button
                // Assuming this calls the onClose function passed as a prop
                onClick={closeModal}
                className="mt-2 px-8 py-3 cursor-pointer bg-green-700 text-white close-modal font-bold rounded-xl shadow-lg hover:bg-green-800 transition duration-200 uppercase tracking-wider"
              >
                Start Exploring Recipes
              </button>
            </div>
          ) : isLoading ? (
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
            // --- REGISTRATION FORM (Existing JSX) ---
            <>
              <form
                onSubmit={handleSubmit}
                id="registerForm"
                className={`p-5 flex flex-col gap-5 overflow-y-auto grow `}
              >
                {/* Error Message */}
                {error && (
                  <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg border border-red-300">
                    {error}
                  </div>
                )}

                {/* input */}
                <FormLabelInput
                  labelName={"First name"}
                  isRequired={true}
                  inputType={"text"}
                  id={"firstName"}
                  value={formData.firstName}
                  onChange={handleChange}
                />

                {/* input */}
                <FormLabelInput
                  labelName={"Last name"}
                  isRequired={true}
                  inputType={"text"}
                  id={"lastName"}
                  value={formData.lastName}
                  onChange={handleChange}
                />

                {/* input */}
                <FormLabelInput
                  labelName={"Email"}
                  isRequired={true}
                  inputType={"email"}
                  id={"email"}
                  value={formData.email}
                  onChange={handleChange}
                />

                {/* input */}
                <FormLabelInput
                  labelName={"Password"}
                  isRequired={true}
                  inputType={"password"}
                  id={"password"}
                  value={formData.password}
                  onChange={handleChange}
                />

                {/* input */}

                <div className="">
                  <FormLabel labelName={"Gender"} htmlFor={"gender"} />
                  <select
                    name="gender"
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => {
                      handleChange(e, "gender");
                    }}
                    className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="">Select an option</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                {/* input */}

                <div className="">
                  <FormLabel labelName={"Bio"} htmlFor={"bio"} />

                  <textarea
                    name="bio"
                    id="bio"
                    rows="3"
                    value={formData.bio}
                    onChange={(e) => {
                      handleChange(e, "bio");
                    }}
                    maxLength="500"
                    className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Tell us a little about yourself"
                  />
                </div>
              </form>

              {/* FOOTER - Fixed at the bottom of the modal */}
              <div className="p-5 border-t border-gray-200 bg-white sticky bottom-0 z-20">
                <button
                  disabled={isLoading}
                  form="registerForm"
                  type="submit"
                  className="w-full cursor-pointer flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150"
                >
                  {isLoading ? "Creating account..." : "Register"}
                </button>
                <div className="text-center pt-4">
                  <p className="text-sm">
                    Already registered?{" "}
                    <span className="text-green-800 font-medium underline ">
                      <button className="cursor-pointer uppercase" onClick={handleOpenLogin}>
                        login now
                      </button>
                    </span>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </ModalContainer>
  );
}
