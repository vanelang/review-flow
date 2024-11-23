import Image from "next/image";
import { colorClasses } from "@/config/colors";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Navigation - updated items */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center">
            <a
              href="#hero"
              className="text-2xl font-semibold text-slate-900 hover:text-blue-700 transition"
            >
              ReviewFlow
            </a>
          </div>
          <div className="flex gap-8">
            <a
              href="#features"
              className="text-slate-700 hover:text-blue-700 font-medium transition"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-slate-700 hover:text-blue-700 font-medium transition"
            >
              Pricing
            </a>
            <a
              href="#integration"
              className="text-slate-700 hover:text-blue-700 font-medium transition"
            >
              Docs
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-[90vh] flex items-center pt-20 px-4 sm:px-6 lg:px-8 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-slate-900 mb-8">
              Embed Reviews, <span className="text-blue-700">Zero Overhead</span>
            </h1>
            <p className="text-xl text-slate-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              Drop in our review components, connect through our APIs, or embed beautiful
              testimonials. The easiest way to add reviews to your product without managing
              infrastructure.
            </p>
            <div className="flex gap-6 justify-center">
              <a
                href="#pricing"
                className="bg-blue-700 text-white px-10 py-4 rounded-lg hover:bg-blue-800 transition font-medium text-lg"
              >
                Get Started Today
              </a>
              <a
                href="/docs"
                className="border-2 border-slate-300 px-10 py-4 rounded-lg hover:bg-slate-100 transition text-slate-700 font-medium text-lg"
              >
                View Components
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="min-h-[90vh] flex items-center py-32 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">
              Three Ways to Add Reviews
            </h2>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto">
              Choose the integration method that works best for your workflow
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 rounded-xl border-2 border-slate-200 hover:shadow-lg transition group">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-700 group-hover:text-white transition">
                <svg
                  className="w-8 h-8 text-blue-700 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-slate-900">Embedded Forms</h3>
              <p className="text-slate-700 text-lg leading-relaxed">
                Drop in our pre-built review forms with a single line of code. Customizable and
                responsive.
              </p>
              <ul className="mt-6 space-y-3 text-slate-600">
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  No-code setup
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Custom styling
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Mobile responsive
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-xl border-2 border-slate-200 hover:shadow-lg transition group">
              <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-700 group-hover:text-white transition">
                <svg
                  className="w-8 h-8 text-emerald-700 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-slate-900">Review APIs</h3>
              <p className="text-slate-700 text-lg leading-relaxed">
                Full control with our RESTful APIs. Create custom review experiences with our
                powerful endpoints.
              </p>
              <ul className="mt-6 space-y-3 text-slate-600">
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-emerald-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  RESTful endpoints
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-emerald-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Webhooks
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-emerald-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  SDKs available
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-xl border-2 border-slate-200 hover:shadow-lg transition group">
              <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-700 group-hover:text-white transition">
                <svg
                  className="w-8 h-8 text-indigo-700 group-hover:text-white"
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
              <h3 className="text-2xl font-semibold mb-4 text-slate-900">Testimonial Widgets</h3>
              <p className="text-slate-700 text-lg leading-relaxed">
                Beautiful, ready-to-use testimonial components. Showcase your best reviews anywhere.
              </p>
              <ul className="mt-6 space-y-3 text-slate-600">
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-indigo-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Multiple layouts
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-indigo-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Auto-rotation
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-indigo-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Curated display
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Integration/CTA Section - updated button color to blue */}
      <section
        id="integration"
        className="min-h-[60vh] flex items-center py-32 px-4 sm:px-6 lg:px-8 scroll-mt-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-slate-900">
            Add Reviews to Your Product in Minutes
          </h2>
          <p className="text-xl text-slate-700 mb-12 leading-relaxed">
            No infrastructure to manage. No backend to maintain. Just simple, powerful review
            components ready to embed in your application.
          </p>
          <div className="flex justify-center">
            <a
              href="/docs"
              className="bg-blue-700 text-white px-10 py-4 rounded-lg hover:bg-blue-800 transition font-medium text-lg"
            >
              View Documentation
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="min-h-[80vh] flex items-center py-32 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-700">Choose the plan that scales with your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Basic Plan */}
            <div className="border-2 border-slate-200 rounded-xl p-8 hover:shadow-lg transition">
              <div className="flex flex-col h-full">
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-4">Basic</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-semibold text-slate-900">$19</span>
                    <span className="text-slate-600">/month</span>
                  </div>
                  <p className="text-slate-600">
                    Perfect for small businesses starting with reviews
                  </p>
                </div>
                <div className="flex-grow">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-slate-700">
                      <svg
                        className="w-5 h-5 text-blue-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      500 reviews/month
                    </li>
                    <li className="flex items-center gap-3 text-slate-700">
                      <svg
                        className="w-5 h-5 text-blue-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Basic review widget
                    </li>
                    <li className="flex items-center gap-3 text-slate-700">
                      <svg
                        className="w-5 h-5 text-blue-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Standard API access
                    </li>
                  </ul>
                </div>
                <button className="w-full bg-slate-100 text-slate-700 px-8 py-4 rounded-lg hover:bg-slate-200 transition font-medium">
                  Get Started
                </button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="border-2 border-blue-500 rounded-xl p-8 hover:shadow-xl transition relative bg-white -mt-4 shadow-lg">
              <div className="absolute -top-5 left-0 right-0 flex justify-center">
                <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <div className="flex flex-col h-full">
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-blue-700 mb-4">Pro</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-semibold text-slate-900">$29</span>
                    <span className="text-slate-600">/month</span>
                  </div>
                  <p className="text-slate-600">Best value for growing businesses</p>
                </div>
                <div className="flex-grow">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-slate-700">
                      <svg
                        className="w-5 h-5 text-blue-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="font-medium">Unlimited reviews</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-700">
                      <svg
                        className="w-5 h-5 text-blue-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="font-medium">All review widgets</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-700">
                      <svg
                        className="w-5 h-5 text-blue-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="font-medium">Advanced API features</span>
                    </li>
                  </ul>
                </div>
                <button className="w-full bg-blue-700 text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition font-medium">
                  Choose Pro
                </button>
              </div>
            </div>

            {/* Scale Plan */}
            <div className="border-2 border-slate-200 rounded-xl p-8 hover:shadow-lg transition bg-slate-50">
              <div className="flex flex-col h-full">
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-4">Scale</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-semibold text-slate-900">$99</span>
                    <span className="text-slate-600">/month</span>
                  </div>
                  <p className="text-slate-600">For high-volume review management</p>
                </div>
                <div className="flex-grow">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-slate-700">
                      <svg
                        className="w-5 h-5 text-blue-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Unlimited reviews
                    </li>
                    <li className="flex items-center gap-3 text-slate-700">
                      <svg
                        className="w-5 h-5 text-blue-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Enterprise API limits
                    </li>
                    <li className="flex items-center gap-3 text-slate-700">
                      <svg
                        className="w-5 h-5 text-blue-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      White-label options
                    </li>
                  </ul>
                </div>
                <button className="w-full border-2 border-slate-300 px-8 py-4 rounded-lg hover:bg-slate-200 transition text-slate-700 font-medium">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - update the ID since contact is now a separate section */}
      <footer className="bg-slate-900 text-slate-300 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Company Info - Left Side */}
            <div className="space-y-6">
              <div className="text-3xl font-semibold text-white">ReviewFlow</div>
              <p className="text-slate-400 text-lg max-w-md">
                The easiest way to add reviews to your product. Simple APIs, beautiful widgets, zero
                overhead.
              </p>
              <div className="flex gap-6">
                <a
                  href="https://twitter.com/reviewflow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="https://github.com/reviewflow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Product Links - Right Side */}
            <div className="flex justify-end">
              <div className="w-fit">
                <h3 className="text-lg font-semibold text-white mb-6">Product</h3>
                <ul className="space-y-4">
                  <li>
                    <a href="#features" className="text-slate-400 hover:text-white transition">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#pricing" className="text-slate-400 hover:text-white transition">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="/docs" className="text-slate-400 hover:text-white transition">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://status.reviewflow.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition"
                    >
                      System Status
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-slate-400">
              © {new Date().getFullYear()} ReviewFlow. All rights reserved.
            </div>
            <div className="flex gap-8">
              <a href="/terms" className="text-slate-400 hover:text-white transition">
                Terms & Conditions
              </a>
              <a href="/privacy" className="text-slate-400 hover:text-white transition">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
