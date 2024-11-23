"use client";

import { useState } from "react";

// Mock data for reviews
const mockReviews = [
  {
    id: 1,
    author: "Sarah Johnson",
    rating: 5,
    content: "Excellent service! Would highly recommend.",
    date: "2024-03-15",
    source: "Widget",
    status: "approved",
  },
  {
    id: 2,
    author: "Mike Peters",
    rating: 4,
    content: "Great product, just a few minor issues.",
    date: "2024-03-14",
    source: "API",
    status: "pending",
  },
  {
    id: 3,
    author: "Emily Chen",
    rating: 5,
    content: "Absolutely love it! Perfect for our needs.",
    date: "2024-03-13",
    source: "Form",
    status: "approved",
  },
  // Add more mock reviews...
];

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  // Filter reviews based on search term and filters
  const filteredReviews = mockReviews.filter((review) => {
    const matchesSearch =
      review.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || review.status === statusFilter;
    const matchesSource = sourceFilter === "all" || review.source === sourceFilter;
    return matchesSearch && matchesStatus && matchesSource;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Reviews</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Manage and moderate your customer reviews
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Source Filter */}
          <div>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
            >
              <option value="all">All Sources</option>
              <option value="Widget">Widget</option>
              <option value="API">API</option>
              <option value="Form">Form</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {filteredReviews.map((review) => (
            <div key={review.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-slate-900 dark:text-white">
                      {review.author}
                    </span>
                    <div className="flex items-center text-yellow-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span
                      className={`text-sm px-2.5 py-0.5 rounded-full font-medium
                        ${
                          review.status === "approved"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : review.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }
                      `}
                    >
                      {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      via {review.source}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">{review.content}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-sm text-slate-500 dark:text-slate-400">{review.date}</span>
                  <div className="flex gap-2">
                    {review.status === "pending" && (
                      <>
                        <button className="text-sm px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition">
                          Approve
                        </button>
                        <button className="text-sm px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition">
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
