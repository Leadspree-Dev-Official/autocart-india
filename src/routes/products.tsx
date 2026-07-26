import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Car Maintenance Products & Accessories — VahanBazaar" },
      { name: "description", content: "Shop engine oils, car care, cleaning kits, batteries and accessories from top Indian brands." },
      { property: "og:title", content: "Car Maintenance Products — VahanBazaar" },
      { property: "og:description", content: "Everything your car needs, delivered." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const filtered = useMemo(() => products.filter((p) => {
    const matchQ = !q || `${p.brand} ${p.name}`.toLowerCase().includes(q.toLowerCase());
    const matchC = cat === "all" || p.category === cat;
    return matchQ && matchC;
  }), [q, cat]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest text-saffron">Garage Essentials</div>
        <h1 className="mt-1 font-display text-4xl">Car care & maintenance</h1>
        <p className="mt-2 text-muted-foreground">Free delivery over ₹999 · Genuine products only.</p>
      </div>

      <div className="mb-8 grid gap-3 rounded-xl border bg-card p-4 md:grid-cols-[1fr_260px]">
        <Input placeholder="Search products…" value={q} onChange={(e) => setQ(e.target.value)} />
        <Select value={cat} onValueChange={setCat}>
          <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Oils & Fluids">Oils & Fluids</SelectItem>
            <SelectItem value="Cleaning">Cleaning</SelectItem>
            <SelectItem value="Accessories">Accessories</SelectItem>
            <SelectItem value="Electricals">Electricals</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
