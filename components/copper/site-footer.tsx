import { Logo } from "@/components/copper/logo";

// Night Sky footer in both themes, so it always uses the on-dark logo. The top
// border separates it from the page in dark mode, where both are Night Sky.
export function SiteFooter() {
  return (
    <footer
      data-testid="site-footer"
      className="border-t border-[#efe3d0]/15 bg-[#1c2333] text-[#efe3d0]"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <Logo onDark className="w-40" />
        <p className="text-sm opacity-80">Fictional — for educational use.</p>
      </div>
    </footer>
  );
}
