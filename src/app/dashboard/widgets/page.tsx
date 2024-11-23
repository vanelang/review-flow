"use client";

import { useState } from "react";

// Mock data for widgets
const mockWidgets = [
  {
    id: 1,
    name: "Product Reviews",
    type: "review-form",
    status: "active",
    lastUpdated: "2024-03-15",
    totalReviews: 128,
    description: "Main product review collection form",
    domains: ["example.com", "store.example.com"],
  },
  {
    id: 2,
    name: "Testimonials Slider",
    type: "testimonial",
    status: "active",
    lastUpdated: "2024-03-14",
    totalReviews: 45,
    description: "Homepage testimonials carousel",
    domains: ["example.com"],
  },
  {
    id: 3,
    name: "Rating Badge",
    type: "rating",
    status: "inactive",
    lastUpdated: "2024-03-10",
    totalReviews: 89,
    description: "Product page rating display",
    domains: ["store.example.com"],
  },
];

export default function WidgetsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Widgets</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            Manage your review collection and display widgets
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg 
            hover:bg-blue-800 transition font-medium shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Widget
        </button>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockWidgets.map((widget) => (
          <div
            key={widget.id}
            className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 
              dark:border-slate-700 p-6 hover:shadow-lg transition group"
          >
            {/* Widget Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {widget.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {widget.description}
                </p>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${
                    widget.status === "active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200"
                  }`}
              >
                {widget.status.charAt(0).toUpperCase() + widget.status.slice(1)}
              </span>
            </div>

            {/* Widget Info */}
            <div className="space-y-4">
              {/* Type and Stats */}
              <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  {widget.type
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  {widget.totalReviews} reviews
                </div>
              </div>

              {/* Domains */}
              <div className="flex flex-wrap gap-2">
                {widget.domains.map((domain, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium
                      bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {domain}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Updated {widget.lastUpdated}
                </span>
                <div className="flex gap-2">
                  <button
                    className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 
                      dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 
                      transition"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    className="p-2 text-slate-600 dark:text-slate-400 hover:text-red-600 
                      dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 
                      transition"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Widget Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Create New Widget
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Widget Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 
                    bg-white dark:bg-slate-800 text-slate-900 dark:text-white 
                    focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter widget name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Widget Type
                </label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 
                    bg-white dark:bg-slate-800 text-slate-900 dark:text-white 
                    focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="review-form">Review Form</option>
                  <option value="testimonial">Testimonial</option>
                  <option value="rating">Rating Badge</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 
                    bg-white dark:bg-slate-800 text-slate-900 dark:text-white 
                    focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter widget description"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 
                    dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 
                    transition font-medium"
                >
                  Create Widget
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
