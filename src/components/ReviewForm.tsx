"use client";

import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";

interface ReviewFormProps {
  onSubmit: (data: {
    rating: number;
    title: string;
    content: string;
    authorName: string;
    authorEmail?: string;
    authorConsent: boolean;
  }) => void;
  theme?: "light" | "dark";
  requireEmail?: boolean;
  showTitle?: boolean;
  className?: string;
}

export default function ReviewForm({
  onSubmit,
  theme = "light",
  requireEmail = false,
  showTitle = true,
  className = "",
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [authorConsent, setAuthorConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bgColor = theme === "light" ? "bg-white" : "bg-slate-800";
  const textColor = theme === "light" ? "text-slate-900" : "text-white";
  const borderColor = theme === "light" ? "border-slate-200" : "border-slate-700";
  const inputBgColor = theme === "light" ? "bg-slate-50" : "bg-slate-900";
  const placeholderColor = theme === "light" ? "placeholder-slate-400" : "placeholder-slate-500";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    if (!content.trim()) {
      setError("Please enter a review");
      return;
    }

    if (!authorName.trim()) {
      setError("Please enter your name");
      return;
    }

    if (requireEmail && !authorEmail.trim()) {
      setError("Please enter your email");
      return;
    }

    if (!authorConsent) {
      setError("Please agree to the terms");
      return;
    }

    onSubmit({
      rating,
      title,
      content,
      authorName,
      authorEmail,
      authorConsent,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${bgColor} ${textColor} rounded-lg border ${borderColor} p-6 ${className}`}
    >
      {/* Rating */}
      <div className="space-y-2 mb-6">
        <label className="block text-sm font-medium">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 hover:scale-110 transition"
            >
              {value <= (hoverRating || rating) ? (
                <StarIcon className="w-6 h-6 text-yellow-400" />
              ) : (
                <StarIconOutline className="w-6 h-6 text-yellow-400" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Title (Optional) */}
      {showTitle && (
        <div className="space-y-2 mb-6">
          <label htmlFor="title" className="block text-sm font-medium">
            Title (Optional)
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full rounded-lg border ${borderColor} ${inputBgColor} px-4 py-2 text-sm ${placeholderColor}`}
            placeholder="Brief summary of your review"
          />
        </div>
      )}

      {/* Review Content */}
      <div className="space-y-2 mb-6">
        <label htmlFor="content" className="block text-sm font-medium">
          Review
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className={`w-full rounded-lg border ${borderColor} ${inputBgColor} px-4 py-2 text-sm ${placeholderColor}`}
          placeholder="Write your review here..."
        />
      </div>

      {/* Author Name */}
      <div className="space-y-2 mb-6">
        <label htmlFor="authorName" className="block text-sm font-medium">
          Your Name
        </label>
        <input
          type="text"
          id="authorName"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className={`w-full rounded-lg border ${borderColor} ${inputBgColor} px-4 py-2 text-sm ${placeholderColor}`}
          placeholder="John Doe"
        />
      </div>

      {/* Author Email (Optional or Required) */}
      <div className="space-y-2 mb-6">
        <label htmlFor="authorEmail" className="block text-sm font-medium">
          Email {requireEmail ? "" : "(Optional)"}
        </label>
        <input
          type="email"
          id="authorEmail"
          value={authorEmail}
          onChange={(e) => setAuthorEmail(e.target.value)}
          className={`w-full rounded-lg border ${borderColor} ${inputBgColor} px-4 py-2 text-sm ${placeholderColor}`}
          placeholder="john@example.com"
        />
      </div>

      {/* Consent Checkbox */}
      <div className="space-y-2 mb-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={authorConsent}
            onChange={(e) => setAuthorConsent(e.target.checked)}
            className="rounded border-slate-300"
          />
          <span className="text-sm">
            I agree to the terms and conditions and consent to sharing this review
          </span>
        </label>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 transition"
      >
        Submit Review
      </button>
    </form>
  );
}
