"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DocsSidebar() {
  const pathname = usePathname();

  const isCurrentPage = (path: string) => {
    return pathname === path;
  };

  const getLinkClassName = (path: string) => {
    const baseClasses = "text-sm hover:text-slate-900";
    return isCurrentPage(path)
      ? `${baseClasses} text-blue-600 font-medium`
      : `${baseClasses} text-slate-700`;
  };

  return (
    <nav className="sticky top-24 space-y-10">
      {/* Getting Started Section */}
      <div className="space-y-3">
        <h2 className="text-[11px] font-semibold text-slate-900 uppercase tracking-wide">
          Getting Started
        </h2>
        <div className="flex flex-col space-y-2">
          <Link href="/docs/introduction" className={getLinkClassName("/docs/introduction")}>
            Introduction
          </Link>
          <Link href="/docs/quickstart" className={getLinkClassName("/docs/quickstart")}>
            Quick Start Guide
          </Link>
          <Link href="/docs/components" className={getLinkClassName("/docs/components")}>
            Components
          </Link>
        </div>
      </div>

      {/* Components Section */}
      <div className="space-y-3">
        <h2 className="text-[11px] font-semibold text-slate-900 uppercase tracking-wide">
          Components
        </h2>
        <div className="flex flex-col space-y-2">
          <Link
            href="/docs/basic-components"
            className={`${getLinkClassName(
              "/docs/basic-components"
            )} pl-2 border-l border-slate-200`}
          >
            Basic Components
          </Link>
          <Link
            href="/docs/advanced-components"
            className={`${getLinkClassName(
              "/docs/advanced-components"
            )} pl-2 border-l border-slate-200`}
          >
            Advanced Components
          </Link>
          <Link
            href="/docs/customizing"
            className={`${getLinkClassName("/docs/customizing")} pl-2 border-l border-slate-200`}
          >
            Customizing Components
          </Link>
          <Link
            href="/docs/third-party"
            className={`${getLinkClassName("/docs/third-party")} pl-2 border-l border-slate-200`}
          >
            Third-Party Components
          </Link>
        </div>
      </div>

      {/* Security Section */}
      <div className="space-y-3">
        <h2 className="text-[11px] font-semibold text-slate-900 uppercase tracking-wide">
          Security
        </h2>
        <div className="flex flex-col space-y-2">
          <Link href="/docs/security" className={getLinkClassName("/docs/security")}>
            Overview of security
          </Link>
          <Link
            href="/docs/security/prevention"
            className={getLinkClassName("/docs/security/prevention")}
          >
            Prevention of attacks
          </Link>
          <Link
            href="/docs/security/testing"
            className={getLinkClassName("/docs/security/testing")}
          >
            Security testing
          </Link>
        </div>
      </div>
    </nav>
  );
}
