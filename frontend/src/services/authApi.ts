import { supabase } from "../lib/supabase";


const API_URL =
  "http://127.0.0.1:8000";


export async function getAuthenticatedUser() {

  const {
    data: {
      session,
    },
  } =
    await supabase.auth.getSession();


  if (!session) {

    throw new Error(
      "Not authenticated."
    );

  }


  const response =
    await fetch(
      `${API_URL}/auth/me`,
      {
        headers: {
          Authorization:
            `Bearer ${session.access_token}`,
        },
      }
    );


  if (!response.ok) {

    const error =
      await response.json();

    throw new Error(
      error.detail ||
      "Authentication failed."
    );

  }


  return response.json();
}