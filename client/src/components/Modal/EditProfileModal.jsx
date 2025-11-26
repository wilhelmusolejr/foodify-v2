import React, { useState } from "react";

// Component
import ModalContainer from "@components/ModalContainer";
import FormLabel from "@components/FormLabel";
import FormLabelInput from "@components/FormLabelInput";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "../../stores/useAuthStore";
import { useModal } from "../../context/ModalContext";

export default function EditProfileModal({ data }) {
  const { closeModal } = useModal();

  let backend_url = import.meta.env.VITE_BACKEND_URL;
  const token = useAuthStore.getState().token;

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    current_password: "",
    new_password: "",
    gender: data.gender,
    bio: data.bio,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You must be logged in");
      return;
    }

    // Basic Client-Side Validation (e.g., check required fields)
    if (!formData.firstName || !formData.email) {
      setError("Please fill in all required fields (Name, Email).");
      return;
    }

    // Check password minimum length (Schema minlength: 6)
    if (formData.current_password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Check password minimum length (Schema minlength: 6)
    if (formData.new_password.length < 6 && formData.new_password) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);
    setError("");

    console.log(token);

    try {
      let backend_api_url = `${backend_url}/api/user/updateProfile`;
      const response = await axios.post(backend_api_url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);

      if (response.status === 201) {
        setIsSuccess(true);
        login({ token, user });
      }
    } catch (apiError) {
      console.log(apiError);
      console.log(apiError.response.data.message);
      setError(
        apiError.response?.data?.message || "Registration failed. Please try a different email."
      );
      setIsSuccess(false); // Ensure success state is false on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e, target) => {
    setFormData((prevData) => ({
      ...prevData,
      [target]: e.target.value,
    }));
  };

  return (
    <ModalContainer>
      <div className="w-10/12 mx-auto max-w-[600px] bg-white rounded-lg ">
        {/* Heading */}
        <div className="p-5 py-7 border-b border-black/10 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Update profile</h2>
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
                onClick={() => {
                  handleButtonModal("");
                }}
                className="mt-2 px-8 py-3 cursor-pointer bg-green-700 text-white close-modal font-bold rounded-xl shadow-lg hover:bg-green-800 transition duration-200 uppercase tracking-wider"
              >
                Okay
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
                id="updateForm"
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
                  inputType={"text"}
                  id={"firstName"}
                  value={formData.firstName}
                  onChange={handleChange}
                />

                {/* input */}
                <FormLabelInput
                  labelName={"Last name"}
                  inputType={"text"}
                  id={"lastName"}
                  value={formData.lastName}
                  onChange={handleChange}
                />

                {/* input */}
                <FormLabelInput
                  labelName={"Email"}
                  inputType={"email"}
                  id={"email"}
                  isDisabled={true}
                  value={formData.email}
                  onChange={handleChange}
                />

                {/* input */}
                <FormLabelInput
                  labelName={"Current Password"}
                  isRequired={true}
                  inputType={"password"}
                  id={"current_password"}
                  value={formData.current_password}
                  onChange={handleChange}
                />

                {/* input */}
                <FormLabelInput
                  labelName={"New Password"}
                  inputType={"password"}
                  id={"new_password"}
                  value={formData.new_password}
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
                  form="updateForm"
                  type="submit"
                  className="w-full cursor-pointer flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150"
                >
                  Update profile
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </ModalContainer>
  );
}
