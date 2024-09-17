"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-xl font-bold text-gray-800">
            GitConnect
          </Link>
          <div className="space-x-4">
            <Link
              href="/developers"
              className="text-gray-600 hover:text-gray-800"
            >
              Developers
            </Link>
            {user ? (
              <>
                <Link
                  href="/profile/edit"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Profile
                </Link>
                <button
                  onClick={signOut}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
