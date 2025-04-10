"use server";

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

export async function signUp(params: SignUpParams) {
  const { uid, email, name } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();

    if (userRecord.exists) {
      return {
        sucess: false,
        message: "User already exists",
      };
    }

    await db.collection("users").doc(uid).set({
      email,
      name,
    });
    return {
      sucess: true,
      message: "User created successfully",
    };
  } catch (error: any) {
    console.log(error, "error creating user");

    if (error.code === "auth/email-already-in-use") {
      throw new Error("Email already in use");
    } else if (error.code === "auth/invalid-email") {
      throw new Error("Invalid email");
    }

    return {
      sucess: false,
      message: "failed to create user",
    };
  }
}

const ONE_WEEK = 60 * 60 * 24 * 7 * 1000; // 1 week

export async function setSesssionCookie(idToken: string) {
  const cookieStore = await cookies();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK,
  });

  cookieStore.set("session", sessionCookie, {
    httpOnly: true,
    maxAge: ONE_WEEK,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function signInParams(params: SignInParams) {
  const { email, idToken } = params;
  try {
    const userCredential = await auth.getUserByEmail(email);

    if (!userCredential) {
      return {
        sucess: false,
        message: "User not found",
      };
    }

    await setSesssionCookie(idToken);

    return {
      sucess: true,
      message: "User signed in successfully",
    };
  } catch (error: any) {
    console.log(error, "error signing in user");

    if (error.code === "auth/user-not-found") {
      throw new Error("User not found");
    } else if (error.code === "auth/wrong-password") {
      throw new Error("Wrong password");
    }

    return {
      sucess: false,
      message: "failed to sign in user",
    };
  }
}


export async function getCurrentUser():Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value || null;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await db.collection("users").doc(decodedClaims.uid).get();

    if (!userRecord.exists) {
      return null;
    }

    const user = userRecord.data() as User;
    return {
        id: decodedClaims.uid,
        email: user.email,
        name: user.name,
        };



  } catch (error) {
    console.log(error, "error getting current user");
    return null;
  }
}

export async function isAuthenticated(){
    const user = await getCurrentUser();
    
    return !!user;
}
