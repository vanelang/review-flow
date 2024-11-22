"use client";

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
import { ThemeToggle } from "@/components/theme-toggle";

// Mock data for the chart
const mockChartData = [
  { name: "Jan", reviews: 40, apiCalls: 2400 },
  { name: "Feb", reviews: 30, apiCalls: 1398 },
  { name: "Mar", reviews: 60, apiCalls: 9800 },
  { name: "Apr", reviews: 45, apiCalls: 3908 },
  { name: "May", reviews: 75, apiCalls: 4800 },
  { name: "Jun", reviews: 65, apiCalls: 3800 },
];

// Mock recent reviews
const mockReviews = [
  {
    id: 1,
    author: "Sarah Johnson",
    rating: 5,
    content: "Excellent service! Would highly recommend.",
    date: "2024-03-15",
    source: "Widget",
  },
  {
    id: 2,
    author: "Mike Peters",
    rating: 4,
    content: "Great product, just a few minor issues.",
    date: "2024-03-14",
    source: "API",
  },
  {
    id: 3,
    author: "Emily Chen",
    rating: 5,
    content: "Absolutely love it! Perfect for our needs.",
    date: "2024-03-13",
    source: "Form",
  },
];

export default function DashboardPage() {
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
              <p className="text-2xl font-semibold text-slate-900 dark:text-white mt-2">315</p>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
              +12%
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">API Usage</p>
              <p className="text-2xl font-semibold text-slate-900 dark:text-white mt-2">8.2k</p>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              Normal
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Active Widgets
              </p>
              <p className="text-2xl font-semibold text-slate-900 dark:text-white mt-2">6</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Avg. Rating</p>
              <p className="text-2xl font-semibold text-slate-900 dark:text-white mt-2">4.8</p>
            </div>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
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
              <AreaChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis
                  stroke="#94a3b8"
                  tickFormatter={(value) =>
                    millify(value, {
                      precision: 1,
                      lowercase: false,
                    })
                  }
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    borderRadius: "0.5rem",
                    color: "#f8fafc",
                  }}
                  formatter={(value) =>
                    millify(value as number, {
                      precision: 1,
                      lowercase: false,
                    })
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
              <AreaChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis
                  stroke="#94a3b8"
                  tickFormatter={(value) =>
                    millify(value, {
                      precision: 1,
                      lowercase: false,
                    })
                  }
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    borderRadius: "0.5rem",
                    color: "#f8fafc",
                  }}
                  formatter={(value) =>
                    millify(value as number, {
                      precision: 1,
                      lowercase: false,
                    })
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

      {/* Recent Reviews */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center">
            <h3 className="text-slate-900 dark:text-white font-semibold">Recent Reviews</h3>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
              View all
            </button>
          </div>
        </div>
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {mockReviews.map((review) => (
            <div key={review.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
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
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      via {review.source}
                    </span>
                  </div>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">{review.content}</p>
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap ml-6">
                  {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
