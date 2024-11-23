export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {/* Header */}
        <div className="mb-12">
          <a
            href="/"
            className="text-blue-700 hover:text-blue-800 transition flex items-center gap-2 mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </a>
          <h1 className="text-4xl font-semibold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-slate-600">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-slate-600 mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Account information (name, email, company details)</li>
              <li>Review data submitted through our platform</li>
              <li>Usage information and analytics</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-slate-600 mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Providing and maintaining our services</li>
              <li>Processing and displaying reviews</li>
              <li>Improving our services and user experience</li>
              <li>Sending important updates and communications</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              3. Data Storage and Security
            </h2>
            <p className="text-slate-600 mb-4">
              We implement appropriate security measures to protect your information. Your data is
              stored securely and processed in accordance with industry standards. We retain your
              information only for as long as necessary to provide our services and fulfill legal
              obligations.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Data Sharing</h2>
            <p className="text-slate-600 mb-4">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Service providers who assist in our operations</li>
              <li>When required by law or to protect our rights</li>
              <li>With your consent or at your direction</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Your Rights</h2>
            <p className="text-slate-600 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Cookies and Tracking</h2>
            <p className="text-slate-600 mb-4">
              We use cookies and similar tracking technologies to improve your experience on our
              platform. You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              7. Changes to This Policy
            </h2>
            <p className="text-slate-600 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Contact Us</h2>
            <p className="text-slate-600 mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <a
              href="mailto:gurvirsingh.academic@gmail.com"
              className="text-blue-700 hover:text-blue-800 transition"
            >
              gurvirsingh.academic@gmail.com
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
