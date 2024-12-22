import { User } from "@shared/user";
import { getAuth } from "firebase/auth";

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001/new-tes-16c61/us-central1/api" 
    : process.env.NEXT_PUBLIC_API_URL || "https://new-tes-16c61.cloudfunctions.net/api"; 

const getAuthorizationHeader = async (): Promise<string> => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("User is not authenticated");
  }

  const token = await currentUser.getIdToken();
  return `Bearer ${token}`;
};

export const fetchUserData = async (id: string): Promise<User> => {
  try {
    const authHeader = await getAuthorizationHeader();

    const response = await fetch(`${API_BASE_URL}/fetch-user-data/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error fetching user data: ${response.statusText}`);
    }

    return (await response.json()) as User;
  } catch (error) {
    console.error("Fetch User Data Error:", error);
    throw error;
  }
};

export const updateUserData = async (id: string, data: Partial<User>): Promise<User> => {
  try {
    const authHeader = await getAuthorizationHeader();

    const response = await fetch(`${API_BASE_URL}/update-user-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader, 
      },
      body: JSON.stringify({ id, ...data }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error updating user data: ${response.statusText}`);
    }

    return (await response.json()) as User;
  } catch (error) {
    console.error("Update User Data Error:", error);
    throw error;
  }
};
