"use client"

import Link from "next/link";
import React from "react";
import { useActionState, useState } from "react"
import {cn} from "@/utils/cn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {signUpAction} from "@/app/(auth-pages)/actions";
import {
  AlertDialog, AlertDialogAction, AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Eye, EyeOff, LoaderCircle} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function SignUpForm() {
  const [state, action, pending] = useActionState(signUpAction, {});

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

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
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  First Name <span className="text-destructive">*</span>
                </Label>
                <Input
                    className={cn(!!state.errors?.firstName &&
                        "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30",
                    )}
                    id="firstName"
                    name="firstName"
                    placeholder="Name"
                    defaultValue={state.firstName}
                    disabled={pending}
                    required/>
                {state?.errors?.firstName &&
                    <p className="mt-2 text-xs text-destructive"
                       role="alert"
                       aria-live="polite">{state.errors.firstName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">
                  Last Name <span className="text-destructive">*</span>
                </Label>
                <Input
                    className={cn(!!state.errors?.lastName &&
                        "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30",
                    )}
                    id="lastName"
                    name="lastName"
                    placeholder="Surname"
                    defaultValue={state.firstName}
                    disabled={pending}
                    required/>
                {state?.errors?.lastName &&
                    <p className="mt-2 text-xs text-destructive"
                       role="alert"
                       aria-live="polite">{state.errors.lastName}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                  className={cn(!!state.errors?.email &&
                      "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30",
                  )}
                  id="email"
                  name="email"
                  placeholder="Your email address"
                  type="email"
                  defaultValue={state.email}
                  disabled={pending}
                  required/>
              {state?.errors?.email &&
                  <p className="mt-2 text-xs text-destructive"
                     role="alert"
                     aria-live="polite">{state.errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                Password <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                    className={cn("pe-8", !!state.errors?.password &&
                        "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30",
                    )}
                    id="password"
                    name="password"
                    type={isVisible ? "text" : "password"}
                    placeholder="Your password"
                    defaultValue={state.password}
                    disabled={pending}
                    required/>
                <button
                    className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    aria-pressed={isVisible}
                    aria-controls="password"
                >
                  {isVisible ? (
                      <EyeOff size={16} strokeWidth={2} aria-hidden="true"/>
                  ) : (
                      <Eye size={16} strokeWidth={2} aria-hidden="true"/>
                  )}
                </button>
              </div>
              {state?.errors?.password && (
                <div>
                  <p className="mt-2 text-xs text-destructive"
                     role="alert"
                     aria-live="polite">Password must:</p>
                  <ul className="text-xs text-destructive"
                      role="alert"
                      aria-live="polite">
                    {state.errors.password.map((error) => (
                        <li key={error}>- {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={pending}>
              {pending && (
                  <LoaderCircle
                      className="-ms-1 me-2 animate-spin"
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                  />
              )}
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