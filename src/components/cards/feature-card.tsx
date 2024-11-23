type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  iconColor: "blue" | "emerald" | "indigo";
};

const colorMap = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    hover: "group-hover:bg-blue-600 dark:group-hover:bg-blue-500",
    hoverText: "group-hover:text-white",
    border: "group-hover:border-blue-600 dark:group-hover:border-blue-500",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    hover: "group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500",
    hoverText: "group-hover:text-white",
    border: "group-hover:border-emerald-600 dark:group-hover:border-emerald-500",
  },
  indigo: {
    bg: "bg-indigo-50 dark:bg-indigo-500/10",
    text: "text-indigo-600 dark:text-indigo-400",
    hover: "group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500",
    hoverText: "group-hover:text-white",
    border: "group-hover:border-indigo-600 dark:group-hover:border-indigo-500",
  },
};

export function FeatureCard({ icon, title, description, features, iconColor }: FeatureCardProps) {
  const colors = colorMap[iconColor];

  return (
    <div
      className={`relative p-8 rounded-2xl border-2 border-slate-200 dark:border-slate-700 
        bg-white dark:bg-slate-800 transition-all duration-300 group 
        hover:shadow-lg ${colors.border}`}
    >
      {/* Icon Container */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300
          ${colors.bg} ${colors.hover}`}
      >
        <div className={`${colors.text} ${colors.hoverText} transition-colors duration-300`}>
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="text-slate-600 dark:text-slate-300">{description}</p>

        {/* Features List */}
        <ul className="space-y-3 pt-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <svg
                className={`w-5 h-5 ${colors.text} shrink-0`}
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
              <span className="text-slate-600 dark:text-slate-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hover Effect Overlay */}
      <div
        className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-[0.03] 
          transition-opacity duration-300 pointer-events-none
          ${colors.hover}`}
      />
    </div>
  );
}
