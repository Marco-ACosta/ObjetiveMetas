"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged, getAuth, User, signOut } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { app } from "../services/firebase/firebaseConfiguration";

interface AuthContextProviderProps {
  children: ReactNode;
}

const auth = getAuth(app);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [userAuth, setUserAuth] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (authUserCredentials: User | null) => {
        setUserAuth(authUserCredentials);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  async function logout() {
    let result = null,
      error = null;
    try {
      result = await signOut(auth);
    } catch (e) {
      error = e;
    }

    return { result, error };
  }

  return (
    <AuthContext.Provider value={{ userAuth, logout }}>
      {loading ? (
        <div className="min-h-screen bg-gray-800 flex justify-center items-center">
          <h1 className="text-white text-3xl">Loading...</h1>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default getAuth;