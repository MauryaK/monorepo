"use client";
import { Card } from "@repo/ui/components/ui/card";
import RegistrationForm from "../components/auth-form/registration";
import { Button } from "@repo/ui/components/ui/button";
import { useCallback, useState } from "react";
import LoginForm from "../components/auth-form/Login-form";
type AuthMode = 'login' | 'signup';

export default function Home() {
  const [mode, setMode] = useState<AuthMode>('signup');

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
  }, []);
  const isSignup = mode === "signup";
  function LogoIcon() {
    return (
      <div className="flex bg-gray-100 items-center justify-center w-[45px] h-[45px] mx-auto rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2" />
        </svg>
      </div>
    );
  }
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <Card className="w-[400px] rounded-sm border p-5">
        <LogoIcon />
        <h1 className="text-center text-2xl font-bold text-blue-700">Apexes</h1>
        <p className="mb-4 text-center text-gray-500">{isSignup ? "Sign up into your account" : "Login to your account"}</p>
        {isSignup ? <RegistrationForm /> : <LoginForm />}
        <div className="my-4 text-center text-gray-500">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <Button
            variant="link"
            onClick={toggleMode}
            className="p-0 text-blue-500"
          >
            {isSignup ? "Login" : "Sign Up"}
          </Button>
        </div>
      </Card>
    </main>
  );
}
