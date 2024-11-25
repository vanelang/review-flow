"use client";

import { IBM_Plex_Mono } from "next/font/google";
import ReviewForm from "@/components/ReviewForm";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
});

export default function ReviewFormPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Review Form Component</h1>
      <p className="text-lg text-slate-600 leading-7">
        A customizable review form component that can be embedded in your website to collect
        customer reviews.
      </p>

      {/* Live Demo */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Live Demo</h2>
        <ReviewForm onSubmit={console.log} className="max-w-xl" />
      </div>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Installation</h2>
        <div className="bg-slate-900 rounded-lg p-4">
          <code className={`${ibmPlexMono.className} text-slate-100 text-sm`}>
            npm install @reviewflow/react
          </code>
        </div>
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Usage</h2>
        <div className="bg-slate-900 rounded-lg p-4">
          <code className={`${ibmPlexMono.className} text-slate-100 text-sm block whitespace-pre`}>
            {`import { ReviewForm } from '@reviewflow/react';

function ProductPage() {
  const handleSubmit = (data) => {
    console.log('Review submitted:', data);
  };

  return (
    <ReviewForm
      onSubmit={handleSubmit}
      theme="light"
      requireEmail={false}
      showTitle={true}
    />
  );
}`}
          </code>
        </div>
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Props</h2>
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-slate-900">Prop</th>
                <th className="px-4 py-2 text-left font-medium text-slate-900">Type</th>
                <th className="px-4 py-2 text-left font-medium text-slate-900">Default</th>
                <th className="px-4 py-2 text-left font-medium text-slate-900">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-4 py-2 font-mono text-xs">onSubmit</td>
                <td className="px-4 py-2 text-slate-600">function</td>
                <td className="px-4 py-2 text-slate-600">required</td>
                <td className="px-4 py-2 text-slate-600">
                  Callback function when form is submitted
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">theme</td>
                <td className="px-4 py-2 text-slate-600">"light" | "dark"</td>
                <td className="px-4 py-2 text-slate-600">"light"</td>
                <td className="px-4 py-2 text-slate-600">Color theme of the form</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">requireEmail</td>
                <td className="px-4 py-2 text-slate-600">boolean</td>
                <td className="px-4 py-2 text-slate-600">false</td>
                <td className="px-4 py-2 text-slate-600">Make email field required</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">showTitle</td>
                <td className="px-4 py-2 text-slate-600">boolean</td>
                <td className="px-4 py-2 text-slate-600">true</td>
                <td className="px-4 py-2 text-slate-600">Show/hide title field</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">className</td>
                <td className="px-4 py-2 text-slate-600">string</td>
                <td className="px-4 py-2 text-slate-600">""</td>
                <td className="px-4 py-2 text-slate-600">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Customization */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Customization Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-slate-900 mb-4">Dark Theme</h3>
            <ReviewForm onSubmit={console.log} theme="dark" className="bg-slate-800" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-slate-900 mb-4">Minimal (No Title)</h3>
            <ReviewForm onSubmit={console.log} showTitle={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
