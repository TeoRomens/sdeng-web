"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {SignupFormState, SignupFormSchema, SigninFormSchema, SigninFormState} from "@/lib/definitions";

export async function signUpAction(state: SignupFormState, formData: FormData): Promise<SignupFormState> {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      ...state,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  if (!origin) {
    throw new Error("No origin found in request headers");
  }

  const bcrypt = require('bcrypt');
  const hashedPassword = bcrypt.hash(password, 10);
  const { error } = await supabase.auth.signUp({
    email: validatedFields.data.email,
    password: hashedPassword.toString(),
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      message: error.message,
      status: "error"
    }
  }
  console.log("Sign up successfully");
  return {
    status: "success"
  }
}

export async function signInAction(state: SigninFormState, formData: FormData): Promise<SigninFormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validate form fields
  const validatedFields = SigninFormSchema.safeParse({
    email: email,
    password: password,
  });
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      ...state,
      email: email,
      password: password,
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  if (!origin) {
    throw new Error("No origin found in request headers");
  }

  const bcrypt = require('bcrypt');
  const hashedPassword = bcrypt.hash(password, 10);
  const { error } = await supabase.auth.signInWithPassword({
    email: validatedFields.data.email,
    password: hashedPassword.toString(),
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return {
      email: email,
      password: password,
      message: error.message,
      status: "error"
    }
  }

  return redirect("/m");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
        "error",
        "/forgot-password",
        "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
      "success",
      "/forgot-password",
      "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
        "error",
        "/protected/reset-password",
        "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
        "error",
        "/protected/reset-password",
        "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
        "error",
        "/protected/reset-password",
        "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};
