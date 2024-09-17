import React from "react";
import Link from "next/link";
import { databases } from "../../lib/appwrite";
import { Developer } from "../../types/appwrite";

async function getDevelopers(): Promise<Developer[]> {
  try {
    const response = await databases.listDocuments<Developer>(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!
    );
    return response.documents;
  } catch (error) {
    console.error("Failed to fetch developers", error);
    return [];
  }
}

export default async function DeveloperList() {
  const developers = await getDevelopers();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Developers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {developers.map((developer) => (
          <Link href={`/developers/${developer.$id}`} key={developer.$id}>
            <div className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold">{developer.name}</h2>
              <p className="text-gray-600">{developer.email}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
