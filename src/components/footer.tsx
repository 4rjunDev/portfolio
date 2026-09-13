export function Footer() {
  return (
    <footer className="mt-auto border-t border-border px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-muted sm:flex-row">
        <span>&copy; {new Date().getFullYear()} Hershil</span>
        <span>Built with Next.js &amp; Framer Motion</span>
      </div>
    </footer>
  );
}
