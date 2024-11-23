export const colors = {
  primary: {
    50: "#eff6ff", // blue-50
    100: "#dbeafe", // blue-100
    600: "#2563eb", // blue-600
    700: "#1d4ed8", // blue-700
    800: "#1e40af", // blue-800
  },
  accent: {
    emerald: {
      100: "#d1fae5", // emerald-100
      700: "#047857", // emerald-700
    },
    indigo: {
      100: "#e0e7ff", // indigo-100
      700: "#4338ca", // indigo-700
    },
  },
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
  white: "#ffffff",
} as const;

export const colorTokens = {
  background: {
    primary: colors.white,
    gradient: {
      from: colors.slate[50],
      to: colors.slate[100],
    },
    card: colors.white,
    footer: colors.slate[900],
  },
  text: {
    primary: colors.slate[900],
    secondary: colors.slate[700],
    tertiary: colors.slate[600],
    footer: colors.slate[300],
    footerDim: colors.slate[400],
  },
  border: {
    light: colors.slate[200],
    footer: colors.slate[800],
  },
  button: {
    primary: {
      background: colors.primary[700],
      hover: colors.primary[800],
      text: colors.white,
    },
    secondary: {
      border: colors.slate[300],
      hover: colors.slate[100],
      text: colors.slate[700],
    },
  },
  feature: {
    blue: {
      background: colors.primary[100],
      icon: colors.primary[700],
    },
    emerald: {
      background: colors.accent.emerald[100],
      icon: colors.accent.emerald[700],
    },
    indigo: {
      background: colors.accent.indigo[100],
      icon: colors.accent.indigo[700],
    },
  },
} as const;

// Define Tailwind class mappings instead of hex values
export const colorClasses = {
  background: {
    primary: "bg-white",
    gradient: {
      from: "from-slate-50",
      to: "to-slate-100",
    },
    card: "bg-white",
    footer: "bg-slate-900",
  },
  text: {
    primary: "text-slate-900",
    secondary: "text-slate-700",
    tertiary: "text-slate-600",
    footer: "text-slate-300",
    footerDim: "text-slate-400",
  },
  border: {
    light: "border-slate-200",
    footer: "border-slate-800",
  },
  button: {
    primary: {
      background: "bg-blue-700",
      hover: "hover:bg-blue-800",
      text: "text-white",
    },
    secondary: {
      border: "border-slate-300",
      hover: "hover:bg-slate-100",
      text: "text-slate-700",
    },
  },
  feature: {
    blue: {
      background: "bg-blue-100",
      icon: "text-blue-700",
    },
    emerald: {
      background: "bg-emerald-100",
      icon: "text-emerald-700",
    },
    indigo: {
      background: "bg-indigo-100",
      icon: "text-indigo-700",
    },
  },
} as const;
