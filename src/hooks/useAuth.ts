"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { account } from "../lib/appwrite";
import { AppwriteUser } from "../types/appwrite";

export const useAuth = () => {
  const [user, setUser] = useState<AppwriteUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const session = await account.get();
      setUser(session);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      await account.create("unique()", email, password, name);
      await signIn(email, password);
    } catch (error) {
      console.error("Sign up failed", error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await account.createSession(email, password);
      await checkUserStatus();
      router.push("/");
    } catch (error) {
      console.error("Sign in failed", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      router.push("/signin");
    } catch (error) {
      console.error("Sign out failed", error);
    }
  };

  return { user, loading, signUp, signIn, signOut };
};
