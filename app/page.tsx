export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <section className="text-center px-6">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">
          Creative Design & Digital Solutions
        </p>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Venu Trinity
        </h1>

        <p className="mt-6 max-w-xl mx-auto text-gray-400 text-lg">
          We create powerful visual experiences, digital products, and creative
          solutions for modern brands.
        </p>

        <button className="mt-8 rounded-full bg-white px-6 py-3 text-black font-medium hover:bg-gray-200 transition">
          Explore Our Work
        </button>
      </section>
    </main>
  );
}