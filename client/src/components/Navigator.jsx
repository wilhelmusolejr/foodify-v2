import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";

// Components
import Logo from "./Logo";
import NavLink from "./NavLink";
import FormLabelInput from "./FormLabelInput";
import FormLabel from "./FormLabel";

// Library
import axios from "axios";

export default function Navigator() {
  const [formData, setFormData] = useState({
    firstName: "Elias",
    lastName: "Vance",
    email: "elias.vance94@gmail.com",
    password: "SecureP@ssword123",
    gender: "Male",
    bio: "Passionate baker and recipe tester, specializing in gluten-free desserts and low-carb meal prep. Always looking for new culinary challenges.",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e, target) => {
    setFormData((prevData) => ({
      ...prevData,
      [target]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("bonk");

    // Basic Client-Side Validation (e.g., check required fields)
    if (!formData.firstName || !formData.email || !formData.password) {
      setError("Please fill in all required fields (Name, Email, Password).");
      return;
    }

    // Check password minimum length (Schema minlength: 6)
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // --- API CALL LOGIC GOES HERE ---
      const response = await axios.post("http://localhost:5001/api/auth/register", formData);

      console.log("Registration Data:", response);

      // Success: Close modal and show success message
      // onClose();
    } catch (apiError) {
      console.log(apiError);
      setError("Registration failed. Please try a different email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
            <li>
              <a href="/search">
                <FontAwesomeIcon icon={faSearch} className="text-base" />
              </a>
            </li>
          </ul>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <NavLink label={"Login"} />
          <button className="bg-[#2B4A13] text-white px-5 uppercase py-3 rounded-lg font-medium">
            Register
          </button>
        </div>

        {/* BAR */}
        <div className="lg:hidden">
          <FontAwesomeIcon icon={faBars} className="text-3xl" />
        </div>
      </nav>

      {/* modal for register */}
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
        <div className="w-10/12 mx-auto max-w-[600px] bg-white rounded-lg ">
          {/* Heading */}
          <div className="p-5 border-b border-black/10">
            <h2 className="text-2xl font-bold">Create Your Account</h2>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-5 flex flex-col gap-5 max-h-[70vh] overflow-auto"
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

            {/* Submission Button */}
            <div className="pt-5">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 disabled:bg-gray-400"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
