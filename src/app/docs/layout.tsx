import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { colorClasses } from "@/config/colors";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`min-h-screen flex flex-col ${colorClasses.background.primary} dark:bg-slate-900`}
    >
      {/* Navigation Bar */}
      <nav
        className={`sticky top-0 z-50 ${colorClasses.background.primary} dark:bg-slate-800 ${colorClasses.border.light} dark:border-slate-700 border-b`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div
                className={`w-8 h-8 ${colorClasses.button.primary.background} dark:bg-blue-500 rounded-lg flex items-center justify-center shadow-lg`}
              >
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
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                ReviewFlow
              </span>
            </Link>

            {/* Right Side Nav */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link
                href="/dashboard"
                className={`hidden sm:inline-flex items-center gap-2 ${colorClasses.button.primary.background} ${colorClasses.button.primary.text} px-4 py-2 rounded-lg ${colorClasses.button.primary.hover} transition font-medium text-sm`}
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer
        className={`${colorClasses.background.primary} dark:bg-slate-800 ${colorClasses.border.light} dark:border-slate-700 border-t`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <p className={`text-sm ${colorClasses.text.tertiary} dark:text-slate-400`}>
              © {new Date().getFullYear()} ReviewFlow. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className={`text-sm ${colorClasses.text.tertiary} hover:${colorClasses.text.primary} dark:text-slate-400 dark:hover:text-white`}
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className={`text-sm ${colorClasses.text.tertiary} hover:${colorClasses.text.primary} dark:text-slate-400 dark:hover:text-white`}
              >
                Terms
              </Link>
              <a
                href="https://github.com/your-repo"
                target="_blank"
                rel="noopener noreferrer"
                className={`${colorClasses.text.tertiary} hover:${colorClasses.text.primary} dark:text-slate-400 dark:hover:text-slate-300`}
              >
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
