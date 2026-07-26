import { Link } from "@tanstack/react-router";
import type { Car } from "@/lib/data";
import { formatINR } from "@/lib/data";
import { Fuel, Gauge, Settings2, MapPin } from "lucide-react";

export function CarCard({ car }: { car: Car }) {
  return (
    <Link
      to="/cars/$id"
      params={{ id: car.id }}
      className="group overflow-hidden rounded-xl border bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
    >
      <div className="aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={car.image}
          alt={`${car.brand} ${car.name}`}
          loading="lazy"
          width={1200}
          height={800}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{car.brand} · {car.year}</div>
            <h3 className="mt-0.5 text-lg font-semibold leading-tight">{car.name}</h3>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Price</div>
            <div className="font-display text-lg font-semibold">{formatINR(car.price)}</div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Gauge className="h-3.5 w-3.5" /> {car.kmDriven.toLocaleString("en-IN")} km</span>
          <span className="inline-flex items-center gap-1.5"><Fuel className="h-3.5 w-3.5" /> {car.fuel}</span>
          <span className="inline-flex items-center gap-1.5"><Settings2 className="h-3.5 w-3.5" /> {car.transmission}</span>
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {car.location}</span>
        </div>
      </div>
    </Link>
  );
}
