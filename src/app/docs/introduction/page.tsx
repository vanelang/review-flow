"use client";

import { IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
});

export default function DocsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Introduction</h1>
      <p className="text-lg text-slate-600 leading-7">
        Welcome to the documentation for ReviewFlow. This comprehensive guide will provide you with
        all the necessary information to get started with ReviewFlow and become proficient in its
        usage.
      </p>

      {/* Project Overview */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Project Overview</h2>
        <p className="text-slate-600 leading-7">
          ReviewFlow is a powerful and versatile review management platform designed to streamline
          your customer feedback process. It provides a seamless workflow, enabling you to build
          robust and scalable review systems with ease. With ReviewFlow, you can leverage a wide
          range of cutting-edge technologies and features, empowering you to deliver high-quality
          review management efficiently.
        </p>
      </div>

      {/* Objectives and Goals */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Key Benefits</h2>
        <p className="text-slate-600 mb-6">
          ReviewFlow is designed to make review management effortless:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-slate-900">One-Step Setup</h3>
              <p className="text-sm text-slate-600">
                Get started in minutes with a single command installation
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-slate-900">Zero Infrastructure</h3>
              <p className="text-sm text-slate-600">
                No servers to maintain or complex infrastructure to manage
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-slate-900">Instant Updates</h3>
              <p className="text-sm text-slate-600">
                Real-time review monitoring and notifications
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-slate-900">Built-in Security</h3>
              <p className="text-sm text-slate-600">Enterprise-grade security out of the box</p>
            </div>
          </div>
        </div>
      </div>

      {/* Prerequisites */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Prerequisites</h2>
        <p className="text-slate-600">
          Before you begin working with ReviewFlow, ensure you have the following prerequisites
          installed and configured on your system.
        </p>
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
            <span className="ml-2">Getting Started</span>
          </Link>
          <Link
            href="/docs/quickstart"
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <span className="mr-2">Quick Start Guide</span>
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
