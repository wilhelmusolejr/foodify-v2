import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck, faUtensils, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faCommentAlt } from "@fortawesome/free-regular-svg-icons";

// COMPONENTS
import RecipeItem from "@components/RecipeItem";
import EmptyRecipe from "@components/Profile/EmptyRecipe";
import EmptyComment from "@components/Profile/EmptyComment";
import Footer from "@components/Footer";
import Heading from "@components/Heading";
import CommentItem from "@components/CommentItem";
import Navigator from "@components/Navigator";

// GLOBAL STATE
import { useAuthStore } from "../stores/useAuthStore";

// LIBRARY
import axios from "axios";
import ProfileHEaderSkeleton from "@components/Profile/ProfileHEaderSkeleton";

import { getRandomApiKey } from "../utils/apiUtils"; // Import the helper
import ModalContainer from "@components/ModalContainer";
import FormLabel from "@components/FormLabel";
import FormLabelInput from "@components/FormLabelInput";

export default function Profile() {
  let backend_url = import.meta.env.VITE_BACKEND_URL;
  const token = useAuthStore.getState().token;

  const { id } = useParams();

  const apiKey = getRandomApiKey();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const BACKEND_USER_URL = `${BACKEND_URL}/api/user`;
  const BACKEND_BOOKMARK_URL = `${BACKEND_URL}/api/bookmark`;
  const BACKEND_COMMENT_URL = `${BACKEND_URL}/api/comment`;
  const FOOD_API = import.meta.env.VITE_FOOD_API;

  const MAX_RECIPES_DISPLAY = 8;

  // STATE
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [userBookmarks, setUserBookmarks] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState("");

  // Global Stand
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isVisitor = isLoggedIn ? user.id !== id : true;

  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    current_password: "",
    new_password: "",
    gender: "",
    bio: "",
  });

  // Get user profile
  useEffect(() => {
    const getUserProfile = async (id) => {
      try {
        setIsLoading(true);

        // api url
        const BACKEND_API = `${BACKEND_USER_URL}/profile/${id}`;

        // request
        const response = await axios.get(BACKEND_API);
        response.data.user.profile_path = `https://placehold.co/40x40/4c3c3a/ffffff?text=${response.data.user.firstName[0]}`;
        setUserProfile(response.data.user);
        setIsLoading(false);
        setFormData((prevData) => ({
          ...prevData,
          ...response.data.user,
        }));

        console.log("Run get user profile");
        console.log(response.data.user);
      } catch (err) {
        console.error("error getting comments:", err);
      }
    };

    getUserProfile(id);
  }, [id]);

  // Get user bookmarks by user id
  useEffect(() => {
    const getUserBookmarks = async (id) => {
      try {
        setIsLoading(true);

        // api url
        const BACKEND_API = `${BACKEND_BOOKMARK_URL}/getUserBookmarks/${id}`;

        // request
        const response = await axios.get(BACKEND_API);
        setUserBookmarks(response.data.bookmarks);

        console.log("Run get user bookmarks");
      } catch (err) {
        console.error("error getting comments:", err);
      }
    };

    getUserBookmarks(id);
  }, [id]);

  // Get user comments by user id
  useEffect(() => {
    const getUserComments = async (id) => {
      try {
        setIsLoading(true);

        // api url
        const BACKEND_API = `${BACKEND_COMMENT_URL}/getUserComments/${id}`;

        // request
        const response = await axios.get(BACKEND_API);

        setUserComments(response.data.comments);

        console.log("Run get user comments");
      } catch (err) {
        console.error("error getting comments:", err);
      }
    };

    getUserComments(id);
  }, [id]);

  // Get user recipes via api
  useEffect(() => {
    if (!id) return;
    if (userBookmarks.length === 0) return;

    let ids = userBookmarks.map((bookmark) => bookmark?.recipe_id);
    let idsString = ids.join(",");

    const apiUrl = `${FOOD_API}/recipes/informationBulk?ids=${idsString}&apiKey=${apiKey}`;

    const fetchRecipeData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 1. Axios handles the request
        const response = await axios.get(apiUrl);
        setRecipes(response.data);

        console.log("Run get user api recipe");
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipeData();
  }, [userBookmarks]);

  //
  //
  //

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

  function handleButtonModal(modalType) {
    setShowModal(modalType);
  }

  return (
    <>
      {/* Navigator */}
      <Navigator />

      <div className="">
        {isLoading ? (
          <ProfileHEaderSkeleton />
        ) : (
          <>
            {/* header */}
            <div className="bg-green-900">
              <div className="w-10/12 mx-auto max-w-7xl py-20 mt-10 text-white min-h-[60vh] flex items-center  relative">
                <div className="flex flex-col md:flex-row gap-10 md:max-w-[700px] mx-auto items-center">
                  {/* image */}
                  <div className="w-40 h-40 text-center flex justify-center items-center">
                    <img
                      src={userProfile.profile_path}
                      alt={`${userProfile.firstName}'s profile`}
                      className="w-full h-full rounded-full object-cover shadow-md"
                    />
                  </div>
                  {/* data */}
                  <div className="flex-1">
                    <h1 className="text-3xl lg:text-4xl xl:text-4xl font-bold mb-2">
                      {userProfile.firstName} {userProfile.lastName}
                    </h1>
                    <p className="text-lg mb-5 font-light  text-[#f4f4f4]">{userProfile.bio}</p>
                    <div className="flex gap-2 flex-col capitalize">
                      {/* item */}
                      <div className="flex items-center gap-2 font-light  text-[#f4f4f4]">
                        <FontAwesomeIcon icon={faBookmark} />
                        <p>{userBookmarks.length} recipes saved</p>
                      </div>

                      {/* item */}
                      <div className="flex items-center gap-2 font-light  text-[#f4f4f4]">
                        <FontAwesomeIcon icon={faCommentAlt} />
                        <p>{userComments.length} activities</p>
                      </div>

                      {/* item */}
                      <div className="flex items-center gap-2 font-light  text-[#f4f4f4]">
                        <FontAwesomeIcon icon={faCheck} />
                        <p>35 recipes saved</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* settings button */}
                {!isVisitor && (
                  <div className="absolute bottom-10 right-10">
                    {/* button */}
                    <div
                      onClick={() => {
                        handleButtonModal("profile_edit");
                      }}
                      className="px-5 py-3 rounded-lg border bg-white text-black cursor-pointer"
                    >
                      Settings
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* content */}
            <div className="w-10/12 mx-auto max-w-7xl">
              {/* favorites */}
              <div className="my-40">
                <div className="flex justify-between items-center mb-10">
                  <Heading type="h2" className="">
                    Saved Recipes
                  </Heading>

                  {/* See more */}

                  {userBookmarks.length > MAX_RECIPES_DISPLAY && (
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faArrowRight} size="1x" />
                      <p className="text-xl">See more</p>
                    </div>
                  )}
                </div>

                {userBookmarks.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[40vh] ">
                    {recipes.map((recipe, index) => (
                      <RecipeItem
                        key={index}
                        image_name={recipe.image}
                        id={recipe.id}
                        name={recipe.title}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyRecipe isVisitor={isVisitor} userProfile={userProfile} />
                )}
              </div>

              {/* comments */}
              <div className="">
                <Heading type="h2" className="mb-10">
                  Comments
                </Heading>

                {userComments.length > 0 ? (
                  <>
                    <div className="flex gap-5 flex-col max-w-lg min-h-[40vh]">
                      {/* item */}
                      {userComments.map((comment, index) => (
                        <CommentItem key={index} userProfile={userProfile} commentData={comment} />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <EmptyComment isVisitor={isVisitor} userProfile={userProfile} />
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {showModal === "profile_edit" && (
        <ModalContainer handleModal={handleButtonModal} currentModal={showModal}>
          <div className="w-10/12 mx-auto max-w-[600px] bg-white rounded-lg ">
            {/* Heading */}
            <div className="p-5 py-7 border-b border-black/10 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Update profile</h2>
              <FontAwesomeIcon
                icon={faXmark}
                size="2x"
                className="cursor-pointer close-modal"
                onClick={() => {
                  handleButtonModal("");
                }}
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

                  <h3 className="text-2xl font-semibold text-green-600 mb-6">
                    Registration Complete!
                  </h3>
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
                      value={formData.password}
                      onChange={handleChange}
                    />

                    {/* input */}
                    <FormLabelInput
                      labelName={"New Password"}
                      inputType={"password"}
                      id={"new_password"}
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
      )}

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <Footer />
    </>
  );
}
