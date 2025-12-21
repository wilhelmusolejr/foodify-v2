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
import RecipeItemSkeleton from "@components/RecipeItemSkeleton";

// GLOBAL STATE
import { useAuthStore } from "../stores/useAuthStore";

// LIBRARY
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { getRandomApiKey } from "../utils/apiUtils";
import { useQuery } from "@tanstack/react-query";
import { useModal } from "../context/ModalContext";

// DEMO
import bookmarkData from "../demo/bookmarks.json";
import userData from "../demo/users.json";
import commentData from "../demo/comments.json";

// ANIMATION
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/animations/motionVariants";

import { ENV } from "@/config/env";

// Skeleton data
let skeletonRecipes = Array.from({ length: 8 }, () => <RecipeItemSkeleton />);

import offlineRecipeData from "./recipe.json";

export default function Profile() {
  const { modalType, openModal } = useModal();

  const { id } = useParams();

  // URL
  const BACKEND_USER_URL = `${ENV.backendUrl}/api/user`;
  const BACKEND_BOOKMARK_URL = `${ENV.backendUrl}/api/bookmark`;
  const BACKEND_COMMENT_URL = `${ENV.backendUrl}/api/comment`;

  const MAX_RECIPES_DISPLAY = 8;

  const queryObject = {
    enabled: !!id && !ENV.isDemoMode,
    retry: 1,
    staleTime: 1000 * 60 * 2,
  };

  // Global Stand
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  if (isLoggedIn) {
    user.id = user.id.toString();
  }
  const isVisitor = isLoggedIn ? user.id !== id : true;

  // ---------------------------------------
  // Get user profile
  // ---------------------------------------
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
    initialData: ENV.isDemoMode ? demoFetchUserProfile : undefined,
    enabled: !!id && !ENV.isDemoMode,
    retry: 1,
    staleTime: 1000 * 60 * 2,
  });

  // ---------------------------------------
  // Get user bookmarks
  // ---------------------------------------
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
    enabled: !!id && !ENV.isDemoMode,
    retry: 1,
    staleTime: 1000 * 60 * 2,
    initialData: ENV.isDemoMode ? demoFetchUserBookmarks : undefined,
    select: (bookmark = []) => bookmark.slice(0, 8),
  });

  // ---------------------------------------
  // Get user comments
  // ---------------------------------------
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
    enabled: !!id && !ENV.isDemoMode,
    retry: 1,
    staleTime: 1000 * 60 * 2,
    initialData: ENV.isDemoMode ? demoFetchUserComments : undefined,
  });

  // ---------------------------------------
  // Get user recipes via api
  // ---------------------------------------
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

    for (let attempt = 1; attempt <= ENV.maxTry; attempt++) {
      try {
        const apiKey = getRandomApiKey();

        const apiUrl = `${ENV.foodApiUrl}/recipes/informationBulk?ids=${idsString}&apiKey=${apiKey}`;

        const res = await axios.get(apiUrl, { signal });
        return res.data;
      } catch (error) {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;
        console.warn(`Attempt ${attempt} failed (status: ${status}): ${message}`);

        if (attempt === ENV.maxTry) {
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

    staleTime: Infinity,
    cacheTime: Infinity,
    retry: 0,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  let recipes = recipeData.length === 0 ? skeletonRecipes : recipeData;

  // Page title
  useEffect(() => {
    if (isVisitor) {
      document.title = `${userProfile.firstName} ${userProfile.lastName} Profile | ${ENV.pageName}`;
    } else {
      document.title = `My Profile | ${ENV.pageName}`;
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
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[40vh] "
                  >
                    {recipes.map((recipe, index) => (
                      <motion.div key={index} variants={fadeUp}>
                        <RecipeItem image_name={recipe.image} id={recipe.id} name={recipe.title} />
                      </motion.div>
                    ))}
                  </motion.div>
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
