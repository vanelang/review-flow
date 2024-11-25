"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DocsSidebar() {
  const pathname = usePathname();

  const isCurrentPage = (path: string) => {
    return pathname === path;
  };

  const getLinkClassName = (path: string, isSubItem: boolean = false) => {
    const baseClasses = "text-sm group flex items-center gap-2 py-1";
    const activeClasses = "text-blue-600 font-medium";
    const inactiveClasses = "text-slate-700";
    const subItemClasses = isSubItem ? "ml-2 border-l border-slate-200 pl-2" : "";

    return `${baseClasses} ${subItemClasses} ${
      isCurrentPage(path) ? activeClasses : inactiveClasses
    } hover:text-slate-900 transition-colors`;
  };

  return (
    <nav className="sticky top-24 space-y-10">
      {/* Getting Started Section */}
      <div className="space-y-3">
        <h2 className="text-[11px] font-semibold text-slate-900 uppercase tracking-wide">
          Getting Started
        </h2>
        <div className="flex flex-col">
          <Link href="/docs/introduction" className={getLinkClassName("/docs/introduction")}>
            <svg
              className="w-4 h-4 text-slate-400 group-hover:text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Introduction
          </Link>
          <Link href="/docs/quickstart" className={getLinkClassName("/docs/quickstart")}>
            <svg
              className="w-4 h-4 text-slate-400 group-hover:text-slate-600"
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
            Quick Start Guide
          </Link>
        </div>
      </div>

      {/* Components Section */}
      <div className="space-y-3">
        <h2 className="text-[11px] font-semibold text-slate-900 uppercase tracking-wide">
          Components
        </h2>
        <div className="flex flex-col">
          <Link
            href="/docs/components/review-form"
            className={getLinkClassName("/docs/components/review-form", true)}
          >
            <svg
              className="w-4 h-4 text-slate-400 group-hover:text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Review Form
          </Link>
          <Link
            href="/docs/components/testimonial"
            className={getLinkClassName("/docs/components/testimonial", true)}
          >
            <svg
              className="w-4 h-4 text-slate-400 group-hover:text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            Testimonial Display
          </Link>
          <Link
            href="/docs/components/rating"
            className={getLinkClassName("/docs/components/rating", true)}
          >
            <svg
              className="w-4 h-4 text-slate-400 group-hover:text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            Rating Widget
          </Link>
          <Link
            href="/docs/components/customization"
            className={getLinkClassName("/docs/components/customization", true)}
          >
            <svg
              className="w-4 h-4 text-slate-400 group-hover:text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            Customization
          </Link>
        </div>
      </div>
    </nav>
  );
}
