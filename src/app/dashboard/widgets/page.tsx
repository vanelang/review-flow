"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Widget {
  id: string;
  name: string;
  type: "review-form" | "testimonial" | "rating";
  config: Record<string, any>;
  styles?: Record<string, any>;
  domains: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CreateWidgetData {
  name: string;
  type: "review-form" | "testimonial" | "rating";
  domains: string[];
  config: Record<string, any>;
}

// Add this new component for the skeleton loading
function WidgetsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center">
        <div>
          <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg" />
          <div className="mt-1 h-4 w-64 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        </div>
        <div className="h-10 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg" />
      </div>

      {/* Widgets Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 
              dark:border-slate-700 p-6 animate-pulse"
          >
            {/* Widget Header Skeleton */}
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg" />
              </div>
              <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
            </div>

            {/* Widget Info Skeleton */}
            <div className="space-y-4">
              {/* Type Skeleton */}
              <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />

              {/* Domains Skeleton */}
              <div className="flex flex-wrap gap-2">
                {[1, 2].map((j) => (
                  <div key={j} className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded-md" />
                ))}
              </div>

              {/* Actions Skeleton */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WidgetsPage() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState<CreateWidgetData>({
    name: "",
    type: "review-form",
    domains: [],
    config: {},
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch widgets
  useEffect(() => {
    async function fetchWidgets() {
      try {
        const response = await fetch("/api/widgets");
        if (!response.ok) throw new Error("Failed to fetch widgets");
        const data = await response.json();
        setWidgets(data);
      } catch (error) {
        toast.error("Failed to load widgets");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchWidgets();
  }, []);

  // Create widget
  const handleCreateWidget = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/widgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create widget");
      }

      const newWidget = await response.json();
      setWidgets((prev) => [...prev, newWidget]);
      setShowCreateModal(false);
      toast.success("Widget created successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create widget");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete widget
  const handleDeleteWidget = async (widgetId: string) => {
    if (!confirm("Are you sure you want to delete this widget?")) return;

    try {
      const response = await fetch(`/api/widgets/${widgetId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete widget");

      setWidgets((prev) => prev.filter((widget) => widget.id !== widgetId));
      toast.success("Widget deleted successfully");
    } catch (error) {
      toast.error("Failed to delete widget");
      console.error(error);
    }
  };

  // Toggle widget status
  const handleToggleStatus = async (widget: Widget) => {
    try {
      const response = await fetch(`/api/widgets/${widget.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !widget.isActive }),
      });

      if (!response.ok) throw new Error("Failed to update widget status");

      const updatedWidget = await response.json();
      setWidgets((prev) => prev.map((w) => (w.id === widget.id ? updatedWidget : w)));
      toast.success("Widget status updated");
    } catch (error) {
      toast.error("Failed to update widget status");
      console.error(error);
    }
  };

  if (loading) {
    return <WidgetsSkeleton />;
  }

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
        {widgets.map((widget) => (
          <div
            key={widget.id}
            className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 
              dark:border-slate-700 p-6 hover:shadow-lg transition"
          >
            {/* Widget Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {widget.name}
                </h3>
              </div>
              <button
                onClick={() => handleToggleStatus(widget)}
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${
                    widget.isActive
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200"
                  }`}
              >
                {widget.isActive ? "Active" : "Inactive"}
              </button>
            </div>

            {/* Widget Info */}
            <div className="space-y-4">
              {/* Type */}
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {widget.type
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
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
                  Updated {new Date(widget.updatedAt).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDeleteWidget(widget.id)}
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
            <form onSubmit={handleCreateWidget} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Widget Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 
                    bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Widget Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as "review-form" | "testimonial" | "rating",
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 
                    bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                >
                  <option value="review-form">Review Form</option>
                  <option value="testimonial">Testimonial</option>
                  <option value="rating">Rating Badge</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Domains (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.domains.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      domains: e.target.value.split(",").map((d) => d.trim()),
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 
                    bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="example.com, store.example.com"
                  required
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
                  disabled={submitting}
                  className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 
                    transition font-medium disabled:opacity-50"
                >
                  {submitting ? "Creating..." : "Create Widget"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
