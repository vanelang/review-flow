"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Define the Review type based on our schema
interface Review {
  id: string;
  authorName: string;
  rating: number;
  content: string;
  createdAt: string;
  source: string;
  status: "pending" | "approved" | "rejected";
}

export default function ReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const params = new URLSearchParams({
        search: searchTerm,
        status: statusFilter,
        source: sourceFilter,
      });

      const response = await fetch(`/api/reviews?${params}`);
      if (!response.ok) throw new Error("Failed to fetch reviews");

      const data = await response.json();
      setReviews(data);
    } catch (error) {
      toast.error("Failed to load reviews");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update review status
  const updateReviewStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update review");

      toast.success(`Review ${newStatus} successfully`);
      fetchReviews(); // Refresh the list
      router.refresh();
    } catch (error) {
      toast.error("Failed to update review");
      console.error(error);
    }
  };

  // Fetch reviews when filters change
  useEffect(() => {
    fetchReviews();
  }, [searchTerm, statusFilter, sourceFilter]);

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
          {isLoading ? (
            <div className="p-6 text-center">Loading...</div>
          ) : reviews.length === 0 ? (
            <div className="p-6 text-center text-slate-500">No reviews found</div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="p-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-medium text-slate-900 dark:text-white">
                        {review.authorName}
                      </span>
                      <div className="flex items-center text-yellow-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
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
                      <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500" />
                        via {review.source}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">{review.content}</p>

                    {/* Action Buttons for Pending Reviews */}
                    {review.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateReviewStatus(review.id, "approved")}
                          className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 
                            bg-blue-700 text-white rounded-lg hover:bg-blue-800"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateReviewStatus(review.id, "rejected")}
                          className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 
                            bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 
                            border border-slate-200 dark:border-slate-700 rounded-lg"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Date and Menu - updated styles */}
                  <div className="flex items-center gap-3 mt-4 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {review.createdAt}
                    </span>
                    <button
                      className="p-1 -m-1 text-slate-400 hover:text-slate-600 
                        dark:text-slate-500 dark:hover:text-slate-300 
                        rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 
                        transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
