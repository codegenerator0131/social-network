import React from "react";
import { databases } from "../../../lib/appwrite";
import { Developer } from "../../../types/appwrite";

async function getDeveloper(id: string): Promise<Developer | null> {
  try {
    const response = await databases.getDocument<Developer>(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
      id
    );
    return response;
  } catch (error) {
    console.error("Failed to fetch developer", error);
    return null;
  }
}

async function getGithubRepos(username: string): Promise<any[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    const data = await response.json();
    return data.slice(0, 5); // Get the first 5 repos
  } catch (error) {
    console.error("Failed to fetch GitHub repos", error);
    return [];
  }
}

export default async function DeveloperProfile({
  params,
}: {
  params: { id: string };
}) {
  const developer = await getDeveloper(params.id);
  const repos = developer ? await getGithubRepos(developer.githubUsername) : [];

  if (!developer) {
    return <div>Developer not found</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{developer.name}</h1>
      <p className="text-xl text-gray-600 mb-4">{developer.email}</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Bio</h2>
        <p>{developer.bio}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Education</h2>
        <ul className="list-disc pl-5">
          {developer.education.map((edu, index) => (
            <li key={index}>{edu}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Work Experience</h2>
        <ul className="list-disc pl-5">
          {developer.experience.map((exp, index) => (
            <li key={index}>{exp}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">GitHub Repositories</h2>
        <ul className="space-y-2">
          {repos.map((repo: any) => (
            <li key={repo.id} className="bg-white p-4 rounded shadow">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {repo.name}
              </a>
              <p className="text-sm text-gray-600">{repo.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
