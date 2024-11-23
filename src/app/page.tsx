import Image from "next/image";
import { colorClasses } from "@/config/colors";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { FeatureCard } from "@/components/cards/feature-card";
import { PricingCard } from "@/components/cards/pricing-card";
import { FormIcon, ApiIcon, TestimonialIcon } from "@/components/icons";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center shadow-lg">
              <svg
                className="w-5 h-5 text-white"
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
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
              ReviewFlow
            </span>
          </Link>
          <div className="flex items-center gap-8">
            <a
              href="#features"
              className="text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 font-medium transition"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 font-medium transition"
            >
              Pricing
            </a>
            <a
              href="#integration"
              className="text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 font-medium transition"
            >
              Docs
            </a>
            <ThemeToggle />
            <Link
              href="/auth/signin"
              className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition font-medium"
            >
              Sign In
            </Link>
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-slate-900 dark:text-white mb-8">
              Embed Reviews, <span className="text-blue-700 dark:text-blue-400">Zero Overhead</span>
            </h1>
            <p className="text-xl text-slate-700 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
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
                className="border-2 border-slate-300 dark:border-slate-600 px-10 py-4 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-700 dark:text-slate-300 font-medium text-lg"
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
        className="min-h-[90vh] flex items-center py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mb-6">
              Three Ways to Add Reviews
            </h2>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
              Choose the integration method that works best for your workflow
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<FormIcon />}
              title="Embedded Forms"
              description="Drop in our pre-built review forms with a single line of code. Customizable and responsive."
              features={["No-code setup", "Custom styling", "Mobile responsive"]}
              iconColor="blue"
            />
            <FeatureCard
              icon={<ApiIcon />}
              title="Review APIs"
              description="Full control with our RESTful APIs. Create custom review experiences with our powerful endpoints."
              features={["RESTful endpoints", "Webhooks", "SDKs available"]}
              iconColor="emerald"
            />
            <FeatureCard
              icon={<TestimonialIcon />}
              title="Testimonial Widgets"
              description="Beautiful, ready-to-use testimonial components. Showcase your best reviews anywhere."
              features={["Multiple layouts", "Auto-rotation", "Curated display"]}
              iconColor="indigo"
            />
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section
        id="integration"
        className="min-h-[60vh] flex items-center py-32 px-4 sm:px-6 lg:px-8 scroll-mt-20 bg-slate-50 dark:bg-slate-800"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-slate-900 dark:text-white">
            Add Reviews to Your Product in Minutes
          </h2>
          <p className="text-xl text-slate-700 dark:text-slate-300 mb-12 leading-relaxed">
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
        className="min-h-[80vh] flex items-center py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-700 dark:text-slate-300">
              Choose the plan that scales with your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <PricingCard
              name="Basic"
              price="$19"
              description="Perfect for small businesses starting with reviews"
              features={["500 reviews/month", "Basic review widget", "Standard API access"]}
              buttonText="Get Started"
              buttonVariant="secondary"
            />
            <PricingCard
              name="Pro"
              price="$29"
              description="Best value for growing businesses"
              features={["Unlimited reviews", "All review widgets", "Advanced API features"]}
              buttonText="Choose Pro"
              isPopular
              buttonVariant="primary"
            />
            <PricingCard
              name="Scale"
              price="$99"
              description="For high-volume review management"
              features={["Unlimited reviews", "Enterprise API limits", "White-label options"]}
              buttonText="Contact Sales"
              buttonVariant="secondary"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 py-20">
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
