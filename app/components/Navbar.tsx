export default function Navbar() {
  return (
    <header className="border-b border-white/10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <h2 className="text-xl font-semibold tracking-tight">
          Venu Trinity
        </h2>

        <div className="flex items-center gap-8 text-sm text-gray-300">
          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">Work</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </nav>
    </header>
  );
}