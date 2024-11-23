"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
          {isSignIn ? "Welcome back" : "Create an account"}
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          {isSignIn ? "Sign in to access your dashboard" : "Get started with ReviewFlow today"}
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4">
        {!isSignIn && (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
            placeholder="••••••••"
          />
        </div>
        {isSignIn && (
          <div className="flex justify-end">
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
              Forgot password?
            </button>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition font-medium"
        >
          {isSignIn ? "Sign In" : "Create Account"}
        </button>
      </form>

      {/* Toggle Sign In/Sign Up */}
      <div className="text-center">
        <p className="text-slate-600 dark:text-slate-400">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
