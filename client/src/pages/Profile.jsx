import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
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
import ProfileHEaderSkeleton from "../components/Profile/ProfileHEaderSkeleton";

// #
// #
// #
// #
// #
export default function Profile() {
  const { id } = useParams();
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
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

  // Global Stand
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isVisitor = isLoggedIn ? user.id !== id : true;

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

        console.log("Run get user profile");
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
        console.log(response.data.comments);
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
                    <div className="px-5 py-3 rounded-lg border bg-white text-black cursor-pointer">
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
