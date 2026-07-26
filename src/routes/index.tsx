import { createFileRoute, Link } from "@tanstack/react-router";
import { cars, products, formatINR } from "@/lib/data";
import { CarCard } from "@/components/car-card";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero-showroom.jpg";
import { ShieldCheck, BadgeCheck, Wrench, KeyRound, ArrowRight, Search } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VahanBazaar — India's Certified Pre-Owned Car Marketplace" },
      { name: "description", content: "Explore hand-picked used cars, book test drives at home, reserve in advance and shop trusted car care products." },
      { property: "og:title", content: "VahanBazaar — Certified Pre-Owned Cars" },
      { property: "og:description", content: "Buy used cars and car care essentials across India." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = cars.slice(0, 3);
  const topProducts = products.slice(0, 4);
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero} alt="Showroom" width={1920} height={1080} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/20" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-primary-foreground md:py-32">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
              <BadgeCheck className="h-3.5 w-3.5 text-saffron" /> 200-point certified · 6-month warranty
            </span>
            <h1 className="mt-5 font-display text-4xl leading-tight md:text-6xl">
              Your next car, <span className="text-saffron">bharosemand</span> and ready to drive.
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/85 md:text-lg">
              Hand-picked used cars from every metro in India. Transparent pricing, easy finance, doorstep test drives.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-saffron text-saffron-foreground hover:bg-saffron/90">
                <Link to="/cars"><Search className="mr-2 h-4 w-4" /> Browse Cars</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
                <Link to="/test-drive">Book a Test Drive</Link>
              </Button>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-6 text-white/85">
              <div><div className="font-display text-2xl font-semibold">4,200+</div><div className="text-xs">Cars sold</div></div>
              <div><div className="font-display text-2xl font-semibold">45</div><div className="text-xs">Cities</div></div>
              <div><div className="font-display text-2xl font-semibold">4.8★</div><div className="text-xs">Google rating</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { icon: ShieldCheck, title: "200-Point Check", body: "Every car inspected by ASE-certified mechanics before listing." },
            { icon: BadgeCheck, title: "6-Month Warranty", body: "Comprehensive engine & transmission cover on every purchase." },
            { icon: KeyRound, title: "5-Day Return", body: "Not the right fit? Return in 5 days, no questions asked." },
            { icon: Wrench, title: "Free 1st Service", body: "Complimentary service and detailing within 30 days." },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border bg-card p-6 shadow-[var(--shadow-card)]">
              <f.icon className="h-6 w-6 text-saffron" />
              <div className="mt-3 font-semibold">{f.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured cars */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-saffron">Featured Inventory</div>
            <h2 className="mt-1 font-display text-3xl md:text-4xl">Fresh arrivals this week</h2>
          </div>
          <Link to="/cars" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline md:inline-flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => <CarCard key={c.id} car={c} />)}
        </div>
      </section>

      {/* Advance booking banner */}
      <section className="mx-auto mt-16 max-w-7xl px-4">
        <div className="overflow-hidden rounded-2xl border px-8 py-12 text-primary-foreground md:px-14 md:py-16" style={{ background: "var(--gradient-hero)" }}>
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <div className="text-xs uppercase tracking-widest text-saffron">Advance Booking</div>
              <h2 className="mt-1 font-display text-3xl md:text-4xl">Reserve your dream car with just {formatINR(11000)}.</h2>
              <p className="mt-3 text-white/85">Lock the price for 15 days. Fully refundable. Priority delivery slot.</p>
            </div>
            <div className="flex md:justify-end">
              <Button asChild size="lg" className="bg-saffron text-saffron-foreground hover:bg-saffron/90">
                <Link to="/advance-booking">Book in Advance</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-saffron">Garage Essentials</div>
            <h2 className="mt-1 font-display text-3xl md:text-4xl">Car maintenance, delivered.</h2>
          </div>
          <Link to="/products" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline md:inline-flex">
            Shop all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {topProducts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
