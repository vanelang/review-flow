"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import millify from "millify";
import { toast } from "sonner";

interface DashboardStats {
  reviews: {
    total: number;
    growth: number;
  };
  apiUsage: {
    total: number;
    successRate: number;
  };
  widgets: {
    total: number;
    active: number;
  };
  avgRating: number;
}

interface ChartData {
  date: string;
  reviews: number;
  apiCalls: number;
}

interface Review {
  id: string;
  authorName: string;
  rating: number;
  content: string;
  createdAt: string;
  source: string;
}

interface DashboardData {
  stats: DashboardStats;
  chartData: ChartData[];
  recentReviews: Review[];
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700"
          >
            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
            <div className="h-8 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700"
          >
            <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
            <div className="h-[300px] bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
        ))}
      </div>

      {/* Recent Reviews Skeleton */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6">
              <div className="h-4 w-48 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
              <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch("/api/dashboard/stats");
        if (!response.ok) throw new Error("Failed to fetch dashboard data");
        const data = await response.json();
        setData(data);
      } catch (error) {
        toast.error("Failed to load dashboard data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!data) {
    return <div>Error loading dashboard</div>;
  }

  const formatStatValue = (value: number) => {
    if (value === 0) {
      return <span className="text-lg text-slate-500 dark:text-slate-400">N/A</span>;
    }
    return millify(value);
  };

  const formatGrowth = (growth: number) => {
    if (growth === 0) {
      return <span className="text-xs text-slate-500 dark:text-slate-400">N/A</span>;
    }
    return `${growth >= 0 ? "+" : ""}${growth}%`;
  };

  const formatRating = (rating: number) => {
    if (rating === 0) {
      return <span className="text-lg text-slate-500 dark:text-slate-400">N/A</span>;
    }
    return rating.toFixed(1);
  };

  const formatWidgetCount = (active: number, total: number) => {
    if (total === 0) {
      return <span className="text-lg text-slate-500 dark:text-slate-400">N/A</span>;
    }
    return `${active}/${total}`;
  };

  // Function to ensure chart data is never empty
  const getChartData = (data: ChartData[]) => {
    if (data.length === 0) {
      // Create 6 months of empty data
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      return months.map((month) => ({
        date: month,
        reviews: 0,
        apiCalls: 0,
      }));
    }
    return data;
  };

  // Function to get Y-axis domain
  const getYAxisDomain = (dataKey: "reviews" | "apiCalls") => {
    if (!data) return [0, 1];
    const values = data.chartData.map((item) => item[dataKey]);
    const max = Math.max(...values);
    return max === 0 ? [0, 1] : [0, max];
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Total Reviews
              </p>
              <p className="text-2xl font-semibold text-slate-900 dark:text-white mt-2">
                {formatStatValue(data.stats.reviews.total)}
              </p>
            </div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                data.stats.reviews.growth === 0
                  ? "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                  : data.stats.reviews.growth > 0
                  ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                  : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
              }`}
            >
              {formatGrowth(data.stats.reviews.growth)}
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">API Usage</p>
              <p className="text-2xl font-semibold text-slate-900 dark:text-white mt-2">
                {formatStatValue(data.stats.apiUsage.total)}
              </p>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              {data.stats.apiUsage.successRate}% Success
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Active Widgets
              </p>
              <p className="text-2xl font-semibold text-slate-900 dark:text-white mt-2">
                {formatWidgetCount(data.stats.widgets.active, data.stats.widgets.total)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Avg. Rating</p>
              <p className="text-2xl font-semibold text-slate-900 dark:text-white mt-2">
                {formatRating(data.stats.avgRating)}
              </p>
            </div>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    data.stats.avgRating === 0
                      ? "text-slate-200 dark:text-slate-600"
                      : i < Math.round(data.stats.avgRating)
                      ? "text-yellow-400"
                      : "text-slate-200 dark:text-slate-600"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="text-slate-900 dark:text-white font-semibold mb-4">Review Trends</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={getChartData(data.chartData)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis
                  stroke="#94a3b8"
                  domain={getYAxisDomain("reviews")}
                  tickFormatter={(value) => millify(value, { precision: 1 })}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    borderRadius: "0.5rem",
                    color: "#f8fafc",
                  }}
                  formatter={(value: number) =>
                    value === 0 ? "N/A" : millify(value, { precision: 1 })
                  }
                />
                <Area
                  type="monotone"
                  dataKey="reviews"
                  stroke="#2563eb"
                  fill="#1d4ed8"
                  name="Reviews"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="text-slate-900 dark:text-white font-semibold mb-4">API Usage</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={getChartData(data.chartData)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis
                  stroke="#94a3b8"
                  domain={getYAxisDomain("apiCalls")}
                  tickFormatter={(value) => millify(value, { precision: 1 })}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    borderRadius: "0.5rem",
                    color: "#f8fafc",
                  }}
                  formatter={(value: number) =>
                    value === 0 ? "N/A" : millify(value, { precision: 1 })
                  }
                />
                <Area
                  type="monotone"
                  dataKey="apiCalls"
                  stroke="#0891b2"
                  fill="#0e7490"
                  name="API Calls"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Reviews - Updated with empty state */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center">
            <h3 className="text-slate-900 dark:text-white font-semibold">Recent Reviews</h3>
            {data.recentReviews.length > 0 && (
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                View all
              </button>
            )}
          </div>
        </div>
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {data.recentReviews.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-slate-500 dark:text-slate-400">
                No reviews yet. Reviews will appear here once customers start providing feedback.
              </p>
            </div>
          ) : (
            data.recentReviews.map((review) => (
              <div key={review.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
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
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        via {review.source}
                      </span>
                    </div>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">{review.content}</p>
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap ml-6">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
