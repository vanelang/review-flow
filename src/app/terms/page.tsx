export default function TermsPage() {
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
          <h1 className="text-4xl font-semibold text-slate-900 mb-4">Terms and Conditions</h1>
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
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-slate-600 mb-4">
              By accessing or using ReviewFlow's services, you agree to be bound by these Terms and
              Conditions. If you disagree with any part of the terms, you may not access the
              service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Use License</h2>
            <p className="text-slate-600 mb-4">
              ReviewFlow grants you a limited, non-exclusive, non-transferable license to use our
              services in accordance with these Terms. This license is solely for your use of
              ReviewFlow's services for managing and displaying customer reviews.
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>You may not modify or copy our software</li>
              <li>You may not use the service for any illegal purposes</li>
              <li>You may not transmit any malicious code</li>
              <li>You may not attempt to gain unauthorized access to our services</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Service Terms</h2>
            <p className="text-slate-600 mb-4">
              Our services are provided "as is." We make no warranties, expressed or implied, and
              hereby disclaim all warranties, including without limitation, implied warranties or
              conditions of merchantability.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Usage Limits</h2>
            <p className="text-slate-600 mb-4">
              Your use of ReviewFlow is subject to fair usage limits based on your subscription
              plan. We reserve the right to modify these limits or terminate accounts that exceed
              them.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Data Processing</h2>
            <p className="text-slate-600 mb-4">
              By using our service, you acknowledge that you have read and understand our Privacy
              Policy, and you consent to the collection and processing of your data as described
              therein.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Modifications</h2>
            <p className="text-slate-600 mb-4">
              We reserve the right to modify or replace these Terms at any time. We will provide
              notice of any changes by posting the new Terms on this page. Your continued use of the
              Service after any such changes constitutes your acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Contact Us</h2>
            <p className="text-slate-600 mb-4">
              If you have any questions about these Terms, please contact us at:
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
