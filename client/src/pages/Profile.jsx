import React, { useEffect, useState } from "react";

import Navigator from "@components/Navigator";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck, faComment, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import Recipe from "@components/Recipe";
import Footer from "@components/Footer";
import Heading from "@components/Heading";
import CommentItem from "@components/CommentItem";
import Paragraph from "@components/Paragraph";

import { useParams } from "react-router-dom";
import axios from "axios";
import { faBookmark, faCommentAlt } from "@fortawesome/free-regular-svg-icons";
import RecipeItem from "../components/RecipeItem";

export default function Profile() {
  const { id } = useParams();
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

  // STATE
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [userBookmarks, setUserBookmarks] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  // Get user profile
  useEffect(() => {
    const getUserProfile = async (id) => {
      try {
        setIsLoading(true);

        // api url
        const BACKEND_API = `http://localhost:5001/api/user/profile/${id}`;

        // request
        const response = await axios.get(BACKEND_API);
        response.data.user.profile_path = `https://placehold.co/40x40/4c3c3a/ffffff?text=${response.data.user.firstName[0]}`;
        setUserProfile(response.data.user);
        setIsLoading(false);
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
        const BACKEND_API = `http://localhost:5001/api/bookmark/getUserBookmarks/${id}`;

        // request
        const response = await axios.get(BACKEND_API);
        setUserBookmarks(response.data.bookmarks);
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
        const BACKEND_API = `http://localhost:5001/api/comment/getUserComments/${id}`;

        // request
        const response = await axios.get(BACKEND_API);
      } catch (err) {
        console.error("error getting comments:", err);
      }
    };

    getUserComments(id);
  }, [id]);

  // Get user recipes via api
  useEffect(() => {
    if (!id) return;

    let ids = userBookmarks.map((bookmark) => bookmark?.recipe_id);
    let idsString = ids.join(",");

    const apiUrl = `https://api.spoonacular.com/recipes/informationBulk?ids=${idsString}&apiKey=${apiKey}`;

    const fetchRecipeData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 1. Axios handles the request
        const response = await axios.get(apiUrl);
        setRecipes(response.data);
        console.log(response.data);
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
          <>
            {/* header skeleton */}
            <div className="bg-gray-100 dark:bg-gray-200 animate-pulse">
              <div className="w-10/12 mx-auto max-w-7xl py-20 mt-10 min-h-[60vh] flex items-center">
                <div className="flex flex-col md:flex-row gap-10 md:max-w-[700px] mx-auto w-full">
                  {/* Image Placeholder */}
                  <div className="text-center flex justify-center items-center">
                    <div className="w-52 h-52 rounded-full bg-gray-300 dark:bg-gray-400"></div>
                  </div>

                  {/* Data Placeholders */}
                  <div className="flex-1">
                    {/* Name Placeholder */}
                    <div className="h-10 w-3/4 bg-gray-300 dark:bg-gray-400 rounded mb-4"></div>

                    {/* Bio Placeholder */}
                    <div className="space-y-2 mb-5">
                      <div className="h-4 w-full bg-gray-300 dark:bg-gray-400 rounded"></div>
                      <div className="h-4 w-11/12 bg-gray-300 dark:bg-gray-400 rounded"></div>
                      <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-400 rounded"></div>
                    </div>

                    {/* Stats Placeholders */}
                    <div className="flex gap-2 flex-col capitalize text-lg lg:text-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* header */}
            <div className="bg-green-900">
              <div className="w-10/12 mx-auto max-w-7xl py-20 mt-10 text-white min-h-[60vh] flex items-center border relative">
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
                    {/* <Paragraph className="mb-5 text-[#f5f5f5] ">{userProfile.bio}</Paragraph> */}
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
                <div className="absolute bottom-10 right-10">
                  {/* button */}
                  <div className="px-5 py-3 rounded-lg border bg-white text-black cursor-pointer">
                    Settings
                  </div>
                </div>
              </div>
            </div>

            {/* content */}
            <div className="w-10/12 mx-auto max-w-7xl">
              {/* favorites */}
              <div className="my-40">
                <div className="flex justify-between items-center">
                  <Heading type="h2" className="mb-10">
                    Saved Recipes
                  </Heading>

                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faArrowRight} size="x" />
                    <p>See more</p>
                  </div>
                </div>

                {userBookmarks.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[30vh] ">
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
                  <div className="border min-h-[30vh] flex justify-center items-center border-black/10 rounded-lg">
                    <div className="text-center ">
                      <FontAwesomeIcon icon={faBookmark} size="2x" className="text-yellow-500" />
                      <h3 className="mt-2 text-lg font-semibold text-gray-900">
                        {userProfile.firstName} hasn't bookmarked any recipes.
                      </h3>
                      <p className="mt-1 text-md text-gray-500">
                        This section will update once they start saving their favorite dishes.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* comments */}
              <div className="">
                <Heading type="h2" className="mb-10">
                  Comments{" "}
                </Heading>

                {userComments.length > 0 ? (
                  <>
                    <div className="flex gap-5 flex-col max-w-lg min-h-[30vh">
                      {/* item */}
                      <CommentItem comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, inventore." />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="border min-h-[30vh] flex justify-center items-center border-black/10 rounded-lg">
                      <div className="text-center ">
                        <FontAwesomeIcon
                          icon={faCommentDots}
                          size="2x"
                          className="text-yellow-500"
                        />
                        <h3 className="mt-2 text-lg font-semibold text-gray-900">
                          {userProfile.firstName} has not yet commented on any recipes.
                        </h3>
                        <p className="mt-1 text-md text-gray-500">
                          This section will update once they start commenting to their favorite
                          dishes.
                        </p>
                      </div>
                    </div>
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
