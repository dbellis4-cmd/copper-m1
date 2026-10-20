import Link from "next/link";
import { Logo } from "@/components/copper/logo";
import { ModeToggle } from "@/components/copper/mode-toggle";

const NAV_LINKS = [
  { href: "#products", label: "Products" },
  { href: "#plus", label: "Copper Plus" },
  { href: "#privacy", label: "Privacy" },
];

// Sticky header. On phones the links get their own row under the logo and
// theme toggle; from tablet width up everything sits on one row.
export function SiteHeader() {
  return (
    <header
      data-testid="site-header"
      className="bg-background sticky top-0 z-50 border-b"
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" aria-label="Copper State Labs home">
          <Logo className="w-44" />
        </Link>
        <nav
          aria-label="Main"
          className="order-last flex w-full justify-center gap-6 text-sm font-medium md:order-none md:ml-auto md:w-auto"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto md:ml-0">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
