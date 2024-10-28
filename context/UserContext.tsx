import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { fetchUserDataServerSide } from "../services/userService"; // Function to fetch Firestore data

// Define a type for the user data
interface User {
  favourites: string[];
  uid: string;
  email: string;
  username: string;
}

// Create a context for the user data
const UserContext = createContext<User | null>(null);

// Create a provider component

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Fetch additional user data from Firestore
        const userData = await fetchUserDataServerSide(currentUser.uid);
        setUser({
          favourites: userData?.favourites,
          uid: currentUser.uid,
          email: currentUser.email!,
          username: userData?.username || "Guest", // Use "Guest" as fallback if username doesn't exist
        });
      } else {
        setUser(null); // User is logged out
      }
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

// Create a hook for easier access to the context
export const useUser = () => {
  return useContext(UserContext);
};
