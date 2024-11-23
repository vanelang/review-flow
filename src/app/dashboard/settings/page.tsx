"use client";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Settings</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Profile</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Update your personal information
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                placeholder="john@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Company Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                placeholder="Company Inc."
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* API Keys Section */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">API Keys</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Manage your API keys for integration
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Production API Key
                </p>
                <p className="mt-1 font-mono text-sm text-slate-600 dark:text-slate-400">
                  rf_prod_*****************************
                </p>
              </div>
              <button className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                Show
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Test API Key
                </p>
                <p className="mt-1 font-mono text-sm text-slate-600 dark:text-slate-400">
                  rf_test_*****************************
                </p>
              </div>
              <button className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                Show
              </button>
            </div>
          </div>
          <div className="mt-4">
            <button className="text-sm text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
              + Generate New API Key
            </button>
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Preferences</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Customize your review management experience
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email Notifications
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Receive notifications for new reviews
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-700"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Auto-approve Reviews
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Automatically approve new reviews
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-700"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-red-200 dark:border-red-900">
        <div className="p-6 border-b border-red-200 dark:border-red-900">
          <h2 className="text-lg font-semibold text-red-600 dark:text-red-500">Danger Zone</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Irreversible and destructive actions
          </p>
        </div>
        <div className="p-6">
          <button className="text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 font-medium">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
