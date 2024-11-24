"use client"

import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Label} from "@/components/ui/label";
import React, {useActionState, useState} from "react";
import {signInAction} from "@/app/(auth-pages)/actions";
import {Input} from "@/components/ui/input";
import {cn} from "@/utils/cn";
import {Eye, EyeOff, LoaderCircle} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function LoginForm() {
  const [state, action, pending] = useActionState(signInAction, {});
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} className="grid gap-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email
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
                  Password
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
              </div>
              <Button type="submit" className="w-full">
                {pending && (
                    <LoaderCircle
                        className="-ms-1 me-2 animate-spin"
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                    />
                )}
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href={"/sign-up"} className="underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
  )
}