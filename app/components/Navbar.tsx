export default function Navbar() {
  return (
    <header className="border-b border-white/10 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        
        <h2 className="text-xl font-semibold tracking-tight text-black">
          Venu Trinity
        </h2>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-500">
          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">Work</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-black text-2xl">
          ☰
        </button>

      </nav>
    </header>
  );
}