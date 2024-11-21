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

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  errors: {
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
  },
  message: ""
};

export default function SignUpForm() {
  const [state, action, pending] = useActionState(signUpAction, initialState);

  return (
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
  );
}
