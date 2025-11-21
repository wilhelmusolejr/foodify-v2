import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore";

export default function AuthLoader({ children }) {
  // Get the token and the setter action from the store
  const { token, isLoggedIn, setUser, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function verifyAndLoadUser() {
      // 1. Check if we have a token from localStorage (set during store initialization)
      if (token && isLoggedIn) {
        try {
          // 2. Set the Authorization Header for the request
          // This is how you send the JWT back to the server.
          const response = await axios.get("http://localhost:5001/api/auth/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // 3. Hydrate State: Server sends back the user object if the token is valid
          const user = response.data;
          setUser(user); // Use the action to update the user object in Zustand
        } catch (error) {
          // Token is expired, invalid, or server is down.
          console.error("Token verification failed:", error);
          // If verification fails, clear the invalid token and log the user out
          logout();
        } finally {
          // 4. Mark the loading process as complete
          setIsLoading(false);
        }
      } else {
        // No token, no need to check the server.
        setIsLoading(false);
      }
    }

    console.log("asa");

    verifyAndLoadUser();
  }, [token, isLoggedIn, setUser, logout]); // Dependency array ensures it runs when these values change

  // While loading, you can display a full-screen spinner or loading bar
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading Session...
      </div>
    );
  }

  // Once loaded, render the rest of the application
  return children;
}
