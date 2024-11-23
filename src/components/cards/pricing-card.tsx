type PricingCardProps = {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  buttonVariant?: "primary" | "secondary";
};

export function PricingCard({
  name,
  price,
  description,
  features,
  buttonText,
  isPopular,
  buttonVariant = "primary",
}: PricingCardProps) {
  return (
    <div
      className={`border-2 ${
        isPopular ? "border-blue-500" : "border-slate-200 dark:border-slate-700"
      } rounded-xl p-8 hover:shadow-lg transition relative bg-white dark:bg-slate-800 ${
        isPopular ? "-mt-4 shadow-lg" : ""
      }`}
    >
      {isPopular && (
        <div className="absolute -top-5 left-0 right-0 flex justify-center">
          <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      <div className="flex flex-col h-full">
        <div className="mb-8">
          <h3
            className={`text-2xl font-semibold mb-4 ${
              isPopular ? "text-blue-700" : "text-slate-900 dark:text-white"
            }`}
          >
            {name}
          </h3>
          <div className="mb-6">
            <span className="text-4xl font-semibold text-slate-900 dark:text-white">{price}</span>
            <span className="text-slate-600 dark:text-slate-400">/month</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400">{description}</p>
        </div>
        <div className="flex-grow">
          <ul className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-3 text-slate-700 dark:text-slate-300"
              >
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
                <span className={isPopular ? "font-medium" : ""}>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          className={`w-full px-8 py-4 rounded-lg font-medium transition ${
            buttonVariant === "primary"
              ? "bg-blue-700 text-white hover:bg-blue-800"
              : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
          }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
