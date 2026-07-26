import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { cars } from "@/lib/data";
import { CarCard } from "@/components/car-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/cars")({
  head: () => ({
    meta: [
      { title: "Used Cars for Sale in India — VahanBazaar" },
      { name: "description", content: "Browse certified pre-owned cars across India. Filter by brand, fuel and transmission." },
      { property: "og:title", content: "Used Cars in India — VahanBazaar" },
      { property: "og:description", content: "Certified pre-owned inventory across every metro." },
    ],
  }),
  component: CarsPage,
});

function CarsPage() {
  const [q, setQ] = useState("");
  const [fuel, setFuel] = useState("all");
  const [trans, setTrans] = useState("all");
  const [sort, setSort] = useState("relevance");

  const filtered = useMemo(() => {
    let arr = cars.filter((c) => {
      const matchQ = !q || `${c.brand} ${c.name}`.toLowerCase().includes(q.toLowerCase());
      const matchF = fuel === "all" || c.fuel === fuel;
      const matchT = trans === "all" || c.transmission === trans;
      return matchQ && matchF && matchT;
    });
    if (sort === "low") arr = [...arr].sort((a, b) => a.price - b.price);
    if (sort === "high") arr = [...arr].sort((a, b) => b.price - a.price);
    if (sort === "new") arr = [...arr].sort((a, b) => b.year - a.year);
    return arr;
  }, [q, fuel, trans, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest text-saffron">Inventory</div>
        <h1 className="mt-1 font-display text-4xl">Used cars for sale</h1>
        <p className="mt-2 text-muted-foreground">{filtered.length} certified cars ready to drive home.</p>
      </div>

      <div className="mb-8 grid gap-3 rounded-xl border bg-card p-4 md:grid-cols-4">
        <Input placeholder="Search brand or model…" value={q} onChange={(e) => setQ(e.target.value)} />
        <Select value={fuel} onValueChange={setFuel}>
          <SelectTrigger><SelectValue placeholder="Fuel" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Fuels</SelectItem>
            <SelectItem value="Petrol">Petrol</SelectItem>
            <SelectItem value="Diesel">Diesel</SelectItem>
            <SelectItem value="CNG">CNG</SelectItem>
            <SelectItem value="Electric">Electric</SelectItem>
          </SelectContent>
        </Select>
        <Select value={trans} onValueChange={setTrans}>
          <SelectTrigger><SelectValue placeholder="Transmission" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Transmissions</SelectItem>
            <SelectItem value="Manual">Manual</SelectItem>
            <SelectItem value="Automatic">Automatic</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger><SelectValue placeholder="Sort" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="low">Price: Low to High</SelectItem>
            <SelectItem value="high">Price: High to Low</SelectItem>
            <SelectItem value="new">Newest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border bg-card py-24 text-center text-muted-foreground">No cars match your filters.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => <CarCard key={c.id} car={c} />)}
        </div>
      )}
    </div>
  );
}
