import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About VahanBazaar — India's Trusted Used Car Marketplace" },
      { name: "description", content: "Founded in Mumbai in 2018, VahanBazaar makes buying pre-owned cars in India simple, transparent and joyful." },
      { property: "og:title", content: "About VahanBazaar" },
      { property: "og:description", content: "India's trusted used car marketplace." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="text-xs uppercase tracking-widest text-saffron">Our Story</div>
      <h1 className="mt-1 font-display text-4xl md:text-5xl">Buying a used car should feel as good as a new one.</h1>
      <p className="mt-6 text-lg text-muted-foreground">
        VahanBazaar was born in a small Andheri workshop in 2018, with a simple idea: bring transparency, warranty and dignity to India's second-hand car market.
        Today we operate hubs in 45 Indian cities and have delivered more than 4,200 certified cars to happy families.
      </p>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {[
          { n: "200", l: "Point inspection" },
          { n: "45", l: "Cities served" },
          { n: "4.8★", l: "Google rating" },
        ].map((s) => (
          <div key={s.l} className="rounded-xl border bg-card p-6">
            <div className="font-display text-4xl text-primary">{s.n}</div>
            <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="mt-12 space-y-4 text-muted-foreground">
        <p><b className="text-foreground">Certified.</b> Every car passes a 200-point mechanical and cosmetic inspection at an in-house workshop.</p>
        <p><b className="text-foreground">Transparent.</b> One fair price, full history report, no hidden charges.</p>
        <p><b className="text-foreground">Assured.</b> 6-month engine and gearbox warranty, plus 5-day return with every purchase.</p>
      </div>
    </div>
  );
}
