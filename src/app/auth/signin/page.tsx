"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignIn) {
        // Sign In
        const response = await fetch("/api/auth/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to sign in");
        }

        await signIn(formData.email, formData.password);
        router.push("/dashboard");
      } else {
        // Sign Up
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to create account");
        }

        // Automatically sign in after successful signup
        await signIn(formData.email, formData.password);
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

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

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isSignIn && (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
              placeholder="John Doe"
              required={!isSignIn}
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
            placeholder="you@company.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
            placeholder="••••••••"
            required
          />
        </div>
        {isSignIn && (
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Forgot password?
            </button>
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {isSignIn ? "Signing in..." : "Creating account..."}
            </span>
          ) : (
            <span>{isSignIn ? "Sign In" : "Create Account"}</span>
          )}
        </button>
      </form>

      {/* Toggle Sign In/Sign Up */}
      <div className="text-center">
        <p className="text-slate-600 dark:text-slate-400">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsSignIn(!isSignIn);
              setError("");
              setFormData({ email: "", password: "", name: "" });
            }}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
