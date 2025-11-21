import { create } from "zustand";

const getInitialState = () => {
  const token = localStorage.getItem("authToken");

  // Initialize isLoggedIn to true only if a token exists
  return {
    token: token || null,
    user: null,
    isLoggedIn: !!token,
  };
};

export const useAuthStore = create((set) => ({
  ...getInitialState(),

  login: ({ token, user }) => {
    // 1. Persist the token to Local Storage
    localStorage.setItem("authToken", token);

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

    // 2. Reset the Zustand Store state
    set({
      token: null,
      user: null,
      isLoggedIn: false,
    });
  },

  setUser: (user) => set({ user }),
}));
