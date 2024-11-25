"use client";

import { IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
});

export default function QuickStartPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Quick Start Guide</h1>
      <p className="text-lg text-slate-600 leading-7">
        Get started with ReviewFlow by obtaining your API key and exploring our core features. This
        guide will help you understand the basics of our review management system.
      </p>

      {/* Getting Your API Key */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Getting Your API Key</h2>
        <p className="text-slate-600 mb-4">
          To use ReviewFlow, you'll need an API key. Follow these steps:
        </p>
        <ol className="space-y-3 text-slate-600 list-decimal list-inside">
          <li>Navigate to the Dashboard Settings.</li>
          <li>Go to the "API Keys" section.</li>
          <li>Copy your API key.</li>
        </ol>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
          <p className="text-amber-800 text-sm">
            🔐 Never share your API key or commit it to version control. If compromised, rotate your
            key immediately from the dashboard.
          </p>
        </div>
      </div>

      {/* Core Features */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-slate-200 rounded-lg p-6">
            <h3 className="font-medium text-slate-900 mb-2">Review Management</h3>
            <p className="text-sm text-slate-600 mb-4">
              Create, retrieve, and moderate reviews through our REST API.
            </p>
            <div className="bg-slate-900 rounded-lg p-3">
              <code className={`${ibmPlexMono.className} text-slate-100 text-xs whitespace-pre`}>
                {`POST   /api/reviews
GET    /api/reviews
PUT    /api/reviews/:id`}
              </code>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-6">
            <h3 className="font-medium text-slate-900 mb-2">Widget Integration</h3>
            <p className="text-sm text-slate-600 mb-4">
              Embed review collection forms on your website using our widget system.
            </p>
            <div className="bg-slate-900 rounded-lg p-3">
              <code className={`${ibmPlexMono.className} text-slate-100 text-xs whitespace-pre`}>
                {`GET    /api/widgets/:id
POST   /api/widgets/create`}
              </code>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-6">
            <h3 className="font-medium text-slate-900 mb-2">Analytics</h3>
            <p className="text-sm text-slate-600 mb-4">
              Access detailed analytics about your reviews and user engagement.
            </p>
            <div className="bg-slate-900 rounded-lg p-3">
              <code className={`${ibmPlexMono.className} text-slate-100 text-xs whitespace-pre`}>
                {`GET    /api/analytics/overview
GET    /api/analytics/trends`}
              </code>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-6">
            <h3 className="font-medium text-slate-900 mb-2">Webhook Events</h3>
            <p className="text-sm text-slate-600 mb-4">
              Receive real-time notifications for review events.
            </p>
            <div className="bg-slate-900 rounded-lg p-3">
              <code className={`${ibmPlexMono.className} text-slate-100 text-xs whitespace-pre`}>
                {`POST   /api/webhooks/configure
GET    /api/webhooks/logs`}
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Authentication</h2>
        <p className="text-slate-600 mb-4">Include your API key in the request headers:</p>
        <div className="bg-slate-900 rounded-lg p-4">
          <code className={`${ibmPlexMono.className} text-slate-100 block text-sm whitespace-pre`}>
            {`curl -H "Authorization: Bearer your_api_key_here" \\
     -H "Content-Type: application/json" \\
     https://api.reviewflow.com/reviews`}
          </code>
        </div>
      </div>

      {/* Rate Limits */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Rate Limits</h2>
        <div className="border border-slate-200 rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Free Tier</span>
              <span className="text-slate-900 font-medium">1,000 requests/day</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Pro Tier</span>
              <span className="text-slate-900 font-medium">10,000 requests/day</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Scale Tier</span>
              <span className="text-slate-900 font-medium">150,000 requests/day</span>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Next Steps</h2>
        <ul className="space-y-3 text-slate-600">
          <li className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Explore our detailed API documentation
          </li>
          <li className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Set up webhook notifications
          </li>
          <li className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Configure your first review widget
          </li>
        </ul>
      </div>

      {/* Navigation Footer */}
      <div className="mt-16 pt-8 border-t border-slate-200">
        <div className="flex justify-between items-center">
          <Link
            href="/docs/introduction"
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <svg className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
            <span className="ml-2 text-slate-400">|</span>
            <span className="ml-2">Introduction</span>
          </Link>
          <Link
            href="/docs/api-reference"
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <span className="mr-2">API Reference</span>
            <span className="mr-2 text-slate-400">|</span>
            Next
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
