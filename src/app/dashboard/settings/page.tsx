"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { IBM_Plex_Mono } from "next/font/google";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
});

interface UserProfile {
  id: string;
  name: string;
  email: string;
  companyName: string | null;
  apiKey: string;
  autoApproveReviews: boolean;
}

// Add this new component for the skeleton loading
function SettingsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div>
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        <div className="mt-2 h-4 w-96 bg-slate-200 dark:bg-slate-700 rounded-lg" />
      </div>

      {/* Profile Section Skeleton */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg" />
          <div className="mt-2 h-4 w-64 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-lg" />
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <div className="h-10 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg" />
          </div>
        </div>
      </div>

      {/* API Keys Section Skeleton */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg" />
          <div className="mt-2 h-4 w-64 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <div>
                <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                <div className="h-4 w-64 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
              <div className="h-8 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-8 w-40 bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
        </div>
      </div>

      {/* Preferences Section Skeleton */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg" />
          <div className="mt-2 h-4 w-64 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <div className="h-4 w-40 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                  <div className="h-4 w-56 bg-slate-200 dark:bg-slate-700 rounded" />
                </div>
                <div className="h-6 w-11 bg-slate-200 dark:bg-slate-700 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  // Fetch user profile
  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("/api/users/me");
        if (!response.ok) throw new Error("Failed to fetch profile");
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        toast.error("Failed to load profile");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  // Handle profile update
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    try {
      const response = await fetch("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          companyName: profile.companyName,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update profile");
      }

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  // Generate new API key
  const handleGenerateApiKey = async () => {
    try {
      const response = await fetch("/api/users/me/api-key", {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to generate API key");

      const data = await response.json();
      setProfile((prev) => (prev ? { ...prev, apiKey: data.apiKey } : null));
      toast.success("New API key generated");
    } catch (error) {
      toast.error("Failed to generate API key");
    }
  };

  // Handle preference update
  const handlePreferenceUpdate = async (autoApprove: boolean) => {
    try {
      const response = await fetch("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          autoApproveReviews: autoApprove,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update preference");
      }

      setProfile((prev) => (prev ? { ...prev, autoApproveReviews: autoApprove } : null));
      toast.success("Preference updated successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update preference");
    }
  };

  if (loading) {
    return <SettingsSkeleton />;
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-center">
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">
            Error loading profile
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Please try refreshing the page
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Settings</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Profile</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Update your personal information
          </p>
        </div>
        <form onSubmit={handleProfileUpdate} className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={profile.companyName || ""}
                onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* API Keys Section - Updated with IBM Plex Mono font */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">API Keys</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Manage your API keys for integration
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">API Key</p>
                <p
                  className={`mt-1 text-sm text-slate-600 dark:text-slate-400 ${ibmPlexMono.className}`}
                >
                  {showApiKey ? profile.apiKey : "••••••••••••••••••••••••••"}
                </p>
              </div>
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
              >
                {showApiKey ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={handleGenerateApiKey}
              className="inline-flex items-center gap-2 text-sm text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Rotate API Key
            </button>
          </div>
        </div>
      </div>

      {/* Preferences Section - Updated */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Preferences</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Customize your review management experience
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Auto-approve Reviews
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Automatically approve new reviews
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={profile?.autoApproveReviews}
                onChange={(e) => handlePreferenceUpdate(e.target.checked)}
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-700"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-red-200 dark:border-red-900">
        <div className="p-6 border-b border-red-200 dark:border-red-900">
          <h2 className="text-lg font-semibold text-red-600 dark:text-red-500">Danger Zone</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Irreversible and destructive actions
          </p>
        </div>
        <div className="p-6">
          <button className="text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 font-medium">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
