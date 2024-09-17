"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { databases } from "../../../lib/appwrite";
import { Developer } from "../../../types/appwrite";

interface ProfileFormData {
  name: string;
  bio: string;
  education: string;
  experience: string;
  githubUsername: string;
}

export default function EditProfile() {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>();

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    if (!user) return;

    try {
      await databases.updateDocument<Developer>(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
        user.$id,
        {
          name: data.name,
          bio: data.bio,
          education: data.education.split("\n"),
          experience: data.experience.split("\n"),
          githubUsername: data.githubUsername,
        }
      );
      // Show success message or redirect
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="bio" className="block mb-1">
            Bio
          </label>
          <textarea
            id="bio"
            {...register("bio")}
            className="w-full px-3 py-2 border rounded"
            rows={4}
          ></textarea>
        </div>
        <div>
          <label htmlFor="education" className="block mb-1">
            Education (one per line)
          </label>
          <textarea
            id="education"
            {...register("education")}
            className="w-full px-3 py-2 border rounded"
            rows={4}
          ></textarea>
        </div>
        <div>
          <label htmlFor="experience" className="block mb-1">
            Work Experience (one per line)
          </label>
          <textarea
            id="experience"
            {...register("experience")}
            className="w-full px-3 py-2 border rounded"
            rows={4}
          ></textarea>
        </div>
        <div>
          <label htmlFor="githubUsername" className="block mb-1">
            GitHub Username
          </label>
          <input
            id="githubUsername"
            type="text"
            {...register("githubUsername")}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
