"use client";

import { useState } from "react";
import { IBM_Plex_Mono } from "next/font/google";
import { colorClasses } from "@/config/colors";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
});

interface Endpoint {
  method: string;
  path: string;
  description: string;
  code: string;
}

interface Section {
  title: string;
  content: string;
  code?: string;
  endpoints?: Endpoint[];
}

const SECTIONS: Record<string, Section> = {
  introduction: {
    title: "Introduction",
    content:
      "Get started with ReviewFlow API and learn how to integrate customer reviews into your application seamlessly.",
  },
  quickstart: {
    title: "Quick Start",
    content: "Set up ReviewFlow in your application in minutes.",
    code: `
# Install via npm
npm install @reviewflow/js

# Initialize the client
import { ReviewFlow } from '@reviewflow/js';

const client = new ReviewFlow({
  apiKey: 'your_api_key_here'
});
    `,
  },
  authentication: {
    title: "Authentication",
    content: "Secure your API requests using your API key.",
    code: `
curl -X GET https://api.reviewflow.com/v1/reviews \\
  -H "Authorization: Bearer your_api_key_here"
    `,
  },
  reviews: {
    title: "Reviews API",
    content: "Comprehensive API endpoints for managing customer reviews.",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/reviews",
        description: "List all reviews with pagination and filtering options",
        code: `
curl -X GET "https://api.reviewflow.com/v1/reviews?page=1&limit=10" \\
  -H "Authorization: Bearer your_api_key_here"
        `,
      },
      {
        method: "POST",
        path: "/api/v1/reviews",
        description: "Create a new customer review",
        code: `
curl -X POST https://api.reviewflow.com/v1/reviews \\
  -H "Authorization: Bearer your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "rating": 5,
    "content": "Great product!",
    "authorName": "John Doe",
    "authorEmail": "john@example.com"
  }'
        `,
      },
    ],
  },
  widgets: {
    title: "Widgets",
    content: "Easy-to-integrate review collection and display widgets for your website.",
    code: `
<script src="https://cdn.reviewflow.com/widget.js"></script>
<div id="review-widget" data-widget-id="your_widget_id"></div>
    `,
  },
};

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Sidebar Navigation */}
        <div className="hidden lg:block lg:col-span-3">
          <nav className="sticky top-24 space-y-1 pr-4">
            {Object.entries(SECTIONS).map(([key, section]) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${
                  activeSection === key
                    ? `${colorClasses.background.card} ${colorClasses.text.primary} shadow-sm font-medium dark:bg-slate-800 dark:text-white`
                    : `${colorClasses.text.tertiary} hover:${colorClasses.background.card} dark:text-slate-400 dark:hover:bg-slate-800/50`
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <main className="lg:col-span-9">
          <div className="space-y-8">
            {/* Section Header */}
            <div className="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-700">
              <h1 className={`text-3xl font-semibold ${colorClasses.text.primary} dark:text-white`}>
                {SECTIONS[activeSection].title}
              </h1>
              <p className={`text-lg ${colorClasses.text.tertiary} dark:text-slate-400`}>
                {SECTIONS[activeSection].content}
              </p>
            </div>

            {/* Code Examples */}
            {SECTIONS[activeSection].code && (
              <div className="rounded-xl overflow-hidden">
                <div className="bg-slate-800 px-4 py-2 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className={`text-xs ${colorClasses.text.footer}`}>Code Example</div>
                </div>
                <div className={`${colorClasses.background.footer} p-5 overflow-x-auto`}>
                  <pre className={`${ibmPlexMono.className} text-slate-50 text-sm`}>
                    <code>{SECTIONS[activeSection].code}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* API Endpoints */}
            {SECTIONS[activeSection].endpoints && (
              <div className="space-y-8">
                {SECTIONS[activeSection].endpoints.map((endpoint, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1.5 text-xs font-medium rounded-md ${colorClasses.feature.blue.background} ${colorClasses.feature.blue.icon}`}
                      >
                        {endpoint.method}
                      </span>
                      <code
                        className={`${ibmPlexMono.className} text-sm ${colorClasses.text.primary} dark:text-slate-300`}
                      >
                        {endpoint.path}
                      </code>
                    </div>
                    <p className={`${colorClasses.text.tertiary} dark:text-slate-400 text-base`}>
                      {endpoint.description}
                    </p>
                    <div className="rounded-xl overflow-hidden">
                      <div className="bg-slate-800 px-4 py-2 flex items-center justify-between">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <div className={`text-xs ${colorClasses.text.footer}`}>Example Request</div>
                      </div>
                      <div className={`${colorClasses.background.footer} p-5 overflow-x-auto`}>
                        <pre className={`${ibmPlexMono.className} text-slate-50 text-sm`}>
                          <code>{endpoint.code}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
