import { create } from "zustand";

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";

const getInitialState = () => {
  const storedToken = localStorage.getItem("authToken");
  const storedUser = DEMO_MODE ? JSON.parse(localStorage.getItem("authUser") || "null") : null;

  return {
    token: storedToken || null,
    user: storedUser || null,
    isLoggedIn: !!storedToken,
  };
};

export const useAuthStore = create((set) => ({
  ...getInitialState(),

  login: ({ token, user }) => {
    // 1. Persist the token to Local Storage
    localStorage.setItem("authToken", token);

    // DEMO MODE: persist user too
    if (DEMO_MODE) {
      localStorage.setItem("authUser", JSON.stringify(user));
    }

    // 2. Update the Zustand Store (Reactivity)
    set({
      token: token,
      user: user,
      isLoggedIn: true,
    });
  },

  logout: () => {
    // 1. Clear the token from Local Storage (Persistence cleanup)
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");

    // 2. Reset the Zustand Store state
    set({
      token: null,
      user: null,
      isLoggedIn: false,
    });
  },

  setUser: (user) => set({ user }),
}));
