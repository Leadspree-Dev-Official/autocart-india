import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { cars, formatINR } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-store";
import { toast } from "sonner";
import { Fuel, Gauge, Settings2, MapPin, Calendar, Users, Palette, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/cars/$id")({
  loader: ({ params }) => {
    const car = cars.find((c) => c.id === params.id);
    if (!car) throw notFound();
    return { car };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Car not found" }, { name: "robots", content: "noindex" }] };
    const { car } = loaderData;
    const title = `${car.year} ${car.brand} ${car.name} — ${formatINR(car.price)}`;
    return {
      meta: [
        { title },
        { name: "description", content: `${car.year} ${car.brand} ${car.name}, ${car.kmDriven.toLocaleString("en-IN")} km, ${car.fuel}, ${car.transmission}. Located in ${car.location}.` },
        { property: "og:title", content: title },
        { property: "og:description", content: `Certified pre-owned ${car.brand} ${car.name}.` },
      ],
    };
  },
  component: CarDetail,
});

function CarDetail() {
  const { car } = Route.useLoaderData();
  const { add } = useCart();
  const nav = useNavigate();

  const specs = [
    { icon: Calendar, label: "Year", value: car.year },
    { icon: Gauge, label: "KM Driven", value: `${car.kmDriven.toLocaleString("en-IN")} km` },
    { icon: Fuel, label: "Fuel", value: car.fuel },
    { icon: Settings2, label: "Transmission", value: car.transmission },
    { icon: Users, label: "Owners", value: car.owners },
    { icon: Palette, label: "Color", value: car.color },
    { icon: MapPin, label: "Location", value: car.location },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 text-sm text-muted-foreground">
        <Link to="/cars" className="hover:underline">Cars</Link> / {car.brand} {car.name}
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="overflow-hidden rounded-2xl border bg-card">
            <img src={car.image} alt={`${car.brand} ${car.name}`} width={1200} height={800} className="h-full w-full object-cover" />
          </div>

          <div className="mt-8">
            <h2 className="font-display text-2xl">Specifications</h2>
            <div className="mt-4 grid gap-3 rounded-xl border bg-card p-4 sm:grid-cols-2">
              {specs.map((s) => (
                <div key={s.label} className="flex items-center gap-3 rounded-md px-2 py-2">
                  <s.icon className="h-4 w-4 text-saffron" />
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                  <div className="ml-auto text-sm font-medium">{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-2xl">Features & highlights</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {car.features.map((f: string) => (
                <div key={f} className="flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-saffron" /> {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{car.brand} · {car.year}</div>
            <h1 className="mt-1 font-display text-3xl">{car.name}</h1>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-3xl font-semibold">{formatINR(car.price)}</span>
              <span className="text-xs text-muted-foreground">On-road extra</span>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">EMI starts at {formatINR(Math.round(car.price / 60))}/mo</div>

            <div className="mt-6 space-y-3">
              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  add({ id: car.id, name: `${car.brand} ${car.name}`, price: car.price, image: car.image, kind: "car" });
                  toast.success("Car added to cart");
                  nav({ to: "/cart" });
                }}
              >
                Add to Cart
              </Button>
              <Button asChild variant="outline" className="w-full" size="lg">
                <Link to="/test-drive" search={{ car: car.id } as never}>Book Test Drive</Link>
              </Button>
              <Button asChild variant="secondary" className="w-full" size="lg">
                <Link to="/advance-booking" search={{ car: car.id } as never}>Reserve with {formatINR(11000)}</Link>
              </Button>
            </div>

            <div className="mt-6 rounded-md bg-secondary p-4 text-xs text-muted-foreground">
              ✓ 200-point inspection report ✓ 6-month warranty ✓ 5-day money-back guarantee
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
