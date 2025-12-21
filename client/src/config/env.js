export const ENV = {
  backendUrl: import.meta.env.VITE_BACKEND_URL,
  isDemoMode: import.meta.env.VITE_DEMO_MODE === "true",
  foodApiUrl: import.meta.env.VITE_FOOD_API,
  pageName: import.meta.env.VITE_PAGE_NAME,
  maxTry: import.meta.env.VITE_MAX_TRY,
  offlineErrorMessage: "The server is currently offline. Please try again later.",
};
