import React, { useEffect, useMemo, useState } from "react";
import { data, useParams } from "react-router-dom";

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
import EditProfileModal from "@components/Modal/EditProfileModal";
import ProfileHEaderSkeleton from "@components/Profile/ProfileHEaderSkeleton";

// GLOBAL STATE
import { useAuthStore } from "../stores/useAuthStore";

// LIBRARY
import axios from "axios";

import { getRandomApiKey } from "../utils/apiUtils";
import { useQuery } from "@tanstack/react-query";
import { useModal } from "../context/ModalContext";
import RecipeItemSkeleton from "../components/RecipeItemSkeleton";

import toast, { Toaster } from "react-hot-toast";

import bookmarkData from "../demo/bookmarks.json";
import userData from "../demo/users.json";
import commentData from "../demo/comments.json";

// Skeleton data
let skeletonRecipes = Array.from({ length: 8 }, () => <RecipeItemSkeleton />);

import offlineRecipeData from "./recipe.json";

export default function Profile() {
  const { modalType, openModal } = useModal();

  const { id } = useParams();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const BACKEND_USER_URL = `${BACKEND_URL}/api/user`;
  const BACKEND_BOOKMARK_URL = `${BACKEND_URL}/api/bookmark`;
  const BACKEND_COMMENT_URL = `${BACKEND_URL}/api/comment`;
  const FOOD_API = import.meta.env.VITE_FOOD_API;
  const PAGE_NAME = import.meta.env.VITE_PAGE_NAME;
  const MAX_TRY = Number(import.meta.env.VITE_MAX_TRY);
  const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";

  const MAX_RECIPES_DISPLAY = 8;

  const queryObject = {
    enabled: !!id && !DEMO_MODE,
    retry: 1,
    staleTime: 1000 * 60 * 2,
  };

  // STATE

  // Global Stand
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  if (isLoggedIn) {
    user.id = user.id.toString();
  }
  const isVisitor = isLoggedIn ? user.id !== id : true;

  // Get user profile
  // Get user profile
  const fetchUserProfile = async ({ queryKey, signal }) => {
    const [, id] = queryKey;
    if (!id) throw new Error("Missing user id");

    const BACKEND_API = `${BACKEND_USER_URL}/profile/${id}`;
    const res = await axios.get(BACKEND_API, { signal });

    const user = res?.data?.user ?? {};

    return {
      ...user,
    };
  };
  const demoFetchUserProfile = () => {
    if (!isVisitor) {
      return user;
    } else {
      for (let user in userData) {
        if (id === userData[user]._id.$oid) {
          return userData[user];
        }
      }
    }
  };
  const {
    data: userProfile = {},
    isLoading: userProfileLoading,
    error: userProfileError,
  } = useQuery({
    queryKey: ["user-profile", id],
    queryFn: fetchUserProfile,
    initialData: demoFetchUserProfile,
    ...queryObject,
  });

  // Get user bookmarks
  // Get user bookmarks
  const fetchUserBookmarks = async ({ queryKey, signal }) => {
    const [, id] = queryKey;
    if (!id) throw new Error("Missing user id");

    const BACKEND_API = `${BACKEND_BOOKMARK_URL}/getUserBookmarks/${id}`;
    const res = await axios.get(BACKEND_API, { signal });
    return res.data.bookmarks;
  };
  const demoFetchUserBookmarks = () => {
    let userBookmarks = [];

    if (!isVisitor) {
      if (user?.bookmark?.length === 0) {
        userBookmarks = [];
      } else {
        userBookmarks = user?.bookmark;
      }
    } else {
      for (let bookmark in bookmarkData) {
        let currentBookmarkUserId = bookmarkData[bookmark].user_id.$oid;

        if (currentBookmarkUserId === id) {
          userBookmarks.push(bookmarkData[bookmark]);
        }
      }
    }

    return userBookmarks;
  };
  const {
    data: userBookmarks = [],
    isLoading: userBookmarksLoading,
    error: userBookmarksError,
  } = useQuery({
    queryKey: ["user-bookmarks", id],
    queryFn: fetchUserBookmarks,
    ...queryObject,
    initialData: demoFetchUserBookmarks,
    select: (bookmark = []) => bookmark.slice(0, 8),
  });

  // Get user comments
  // Get user comments
  const fetchUserComments = async ({ queryKey, signal }) => {
    const [, id] = queryKey;
    if (!id) throw new Error("Missing user id");

    const BACKEND_API = `${BACKEND_COMMENT_URL}/getUserComments/${id}`;
    const res = await axios.get(BACKEND_API, { signal });
    return res.data.comments;
  };
  const demoFetchUserComments = () => {
    let listComments = [];

    if (!isVisitor) {
      listComments = user?.comment ? user?.comment : [];
    } else {
      for (let comment in commentData) {
        if (commentData[comment].user_id.$oid === id) {
          listComments.push(commentData[comment]);
        }
      }
    }

    return listComments;
  };
  const {
    data: userComments = [],
    isLoading: userCommentsLoading,
    error: userCommentsError,
  } = useQuery({
    queryKey: ["user-comments", id],
    queryFn: fetchUserComments,
    ...queryObject,
    initialData: demoFetchUserComments,
  });

  // Get user recipes via api
  // Get user recipes via api
  // Get user recipes via api
  // Get user recipes via api
  const bookmarkIds = useMemo(() => {
    // extract numeric/string ids and join into a stable string
    return (
      userBookmarks
        ?.map((b) => b?.recipe_id)
        .filter(Boolean)
        .join(",") ?? ""
    );
  }, [userBookmarks]);

  const fetchRecipe = async ({ queryKey, signal }) => {
    // queryKey: ["recipes", id, idsString]
    const [, id, idsString] = queryKey;

    for (let attempt = 1; attempt <= MAX_TRY; attempt++) {
      try {
        const apiKey = getRandomApiKey();

        const apiUrl = `${FOOD_API}/recipes/informationBulk?ids=${idsString}&apiKey=${apiKey}`;

        const res = await axios.get(apiUrl, { signal });
        return res.data;
      } catch (error) {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;
        console.warn(`Attempt ${attempt} failed (status: ${status}): ${message}`);

        if (attempt === MAX_TRY) {
          const localRecipes = Array.from({ length: userBookmarks.length }, () => ({
            ...offlineRecipeData,
          }));

          toast.error("Showing offline data. API LIMIT");

          return localRecipes;
        }
      }
    }
  };
  const {
    data: recipeData = [],
    isLoading: recipesLoading,
    error: recipesError,
  } = useQuery({
    queryKey: ["recipes", id, bookmarkIds],
    queryFn: fetchRecipe,
    ...queryObject,
    enabled: !!id && bookmarkIds.length > 0,
  });

  let recipes = recipeData.length === 0 ? skeletonRecipes : recipeData;

  // Page title
  useEffect(() => {
    if (isVisitor) {
      document.title = `${userProfile.firstName} ${userProfile.lastName} Profile | ${PAGE_NAME}`;
    } else {
      document.title = `My Profile | ${PAGE_NAME}`;
    }
  }, [userProfile]);

  return (
    <>
      {/* Navigator */}
      <Navigator />

      <Toaster position="top-center" reverseOrder={false} />

      <div className="">
        {userProfileLoading ? (
          <ProfileHEaderSkeleton />
        ) : (
          <>
            {/* header */}
            <div className="bg-green-900">
              <div className="w-10/12 mx-auto max-w-7xl py-20 mt-10 text-white min-h-[60vh] flex items-center  relative">
                <div className="flex flex-col md:flex-row gap-10 md:max-w-[700px] mx-auto items-center">
                  {/* image */}
                  <div className="w-40 h-40 text-center flex justify-center items-center ">
                    <img
                      src={userProfile.profile_image}
                      alt={`${userProfile.firstName}'s profile`}
                      className="w-full h-full rounded-full object-cover shadow-md border border-white/10"
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
                    </div>
                  </div>
                </div>

                {/* settings button */}
                {!isVisitor && (
                  <div className="absolute bottom-5 right-5 md:bottom-10 md:right-10">
                    {/* button */}
                    <button
                      onClick={() => {
                        openModal("user-setting");
                      }}
                      className="px-5 py-3 rounded-lg border bg-white text-black cursor-pointer"
                    >
                      Settings
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* content */}
            <div className="w-10/12 mx-auto max-w-7xl">
              {/* favorites */}
              <div className="my-40">
                {/* Heading */}
                <div className="flex justify-between items-center mb-10">
                  <Heading type="h2" className="">
                    Saved Recipes
                  </Heading>

                  {/* See more */}
                  {userBookmarks.length >= MAX_RECIPES_DISPLAY && (
                    <a href={`/bookmark/${id}`} className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faArrowRight} size="1x" />
                      <p className="text-xl">See more</p>
                    </a>
                  )}
                </div>

                {/* Content */}
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

      {modalType === "user-setting" && <EditProfileModal data={userProfile} />}

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
