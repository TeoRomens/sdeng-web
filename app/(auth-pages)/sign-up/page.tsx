"use client"

import Link from "next/link";
import React from "react";
import { useActionState } from "react"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Input06 from "@/components/input-06";
import {signUpAction} from "@/app/(auth-pages)/actions";
import {
  AlertDialog, AlertDialogAction, AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

export default function SignUpForm() {
  const [state, action, pending] = useActionState(signUpAction, {});

  return (
      <>
        <AlertDialog open={state.status === "success"}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="96" height="96" viewBox="0 0 48 48">
                <path fill="#c8e6c9"
                      d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
                <path fill="#4caf50"
                      d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"></path>
              </svg>
              <AlertDialogTitle>Sign up Success!</AlertDialogTitle>
              <AlertDialogDescription>
                Check your email for verification.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction asChild>
                <Link href={"/login"}>
                  Continue
                </Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Input06
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  placeholder="Mario"
                  defaultValue={state.firstName}
                  showError={!!state?.errors?.firstName}
                  errorMessage={state?.errors?.firstName?.[0]}
                  disabled={pending}
                  required
              />
              <Input06
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  placeholder="Rossi"
                  defaultValue={state.lastName}
                  showError={!!state?.errors?.lastName}
                  errorMessage={state?.errors?.lastName?.[0]}
                  disabled={pending}
                  required
              />
            </div>
            <Input06
                id="email"
                name="email"
                label="Email"
                type="email"
                placeholder="m@example.com"
                defaultValue={state.email}
                showError={!!state?.errors?.email}
                errorMessage={state?.errors?.email?.[0]}
                disabled={pending}
                required
            />
            <Input06
                id="password"
                name="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                defaultValue={state.password}
                showError={!!state?.errors?.password}
                errorMessage={state?.errors?.password?.[0]}
                disabled={pending}
                required
            />
            <Button type="submit" className="w-full" disabled={pending}>
              Create an account
            </Button>
            <Button variant="outline" className="w-full" disabled={pending}>
              Sign up with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href={"/login"} className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
      </>
  );
}
