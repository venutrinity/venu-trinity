const products = [
  {
    number: "01",
    type: "PSD FILE",
    title: "Premium Social Media Pack",
    description: "Ready-to-edit PSD designs for creators and brands.",
    price: "₹299",
  },
  {
    number: "02",
    type: "TEMPLATE",
    title: "YouTube Thumbnail Pack",
    description: "High-converting thumbnail templates for creators.",
    price: "₹499",
  },
  {
    number: "03",
    type: "WEBSITE",
    title: "Creative Portfolio Template",
    description: "A modern portfolio template for freelancers and studios.",
    price: "₹999",
  },
];

export default function DigitalProducts() {
  return (
    <section
      id="products"
      className="bg-black px-6 py-24 text-white md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/40">
              Digital Products
            </p>

            <h2 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-6xl lg:text-7xl">
              Tools to help you
              <br />
              <span className="text-white/35">
                create better.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-white/40">
            Premium templates, resources, and digital products built for
            creators, designers, and modern businesses.
          </p>
        </div>

        {/* Products */}
        <div className="grid gap-5 md:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.number}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-500 hover:-translate-y-2 hover:border-white/20"
            >
              {/* Preview */}
              <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent">
                <div className="absolute inset-0 opacity-20">
                  <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>

                <div className="absolute left-6 top-6">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                    {product.type}
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] transition duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <span className="text-2xl font-semibold text-white/20">
                      VT
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition duration-300 group-hover:bg-white group-hover:text-black">
                  ↗
                </div>
              </div>

              {/* Details */}
              <div className="p-6">
                <p className="text-xs text-white/30">
                  {product.number}
                </p>

                <h3 className="mt-3 text-xl font-medium tracking-tight">
                  {product.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/40">
                  {product.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-lg font-medium">
                    {product.price}
                  </span>

                  <button className="text-sm text-white/50 transition hover:text-white">
                    View Product →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}