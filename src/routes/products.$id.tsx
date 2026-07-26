import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { products, formatINR } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-store";
import { toast } from "sonner";
import { Star, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Product not found" }, { name: "robots", content: "noindex" }] };
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — ${product.brand}` },
        { name: "description", content: product.description },
        { property: "og:title", content: product.name },
        { property: "og:description", content: product.description },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 text-sm text-muted-foreground">
        <Link to="/products" className="hover:underline">Products</Link> / {product.name}
      </div>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border bg-card">
          <img src={product.image} alt={product.name} width={800} height={800} className="h-full w-full object-cover" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">{product.brand}</div>
          <h1 className="mt-1 font-display text-3xl md:text-4xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 fill-saffron text-saffron" /> {product.rating} · 2.3k reviews
          </div>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl font-semibold">{formatINR(product.price)}</span>
            <span className="text-sm text-muted-foreground line-through">{formatINR(product.mrp)}</span>
            <span className="rounded-md bg-saffron/15 px-2 py-0.5 text-xs font-semibold text-saffron">{off}% off</span>
          </div>
          <p className="mt-5 text-muted-foreground">{product.description}</p>

          <div className="mt-6 flex items-center gap-3">
            <div className="inline-flex items-center rounded-md border">
              <button className="h-10 w-10 text-lg" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span className="w-10 text-center">{qty}</span>
              <button className="h-10 w-10 text-lg" onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <Button
              size="lg"
              className="flex-1"
              onClick={() => {
                add({ id: product.id, name: product.name, price: product.price, image: product.image, kind: "product" }, qty);
                toast.success("Added to cart");
              }}
            >
              Add {qty} to Cart
            </Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Truck, label: "Free delivery over ₹999" },
              { icon: ShieldCheck, label: "Genuine product" },
              { icon: RotateCcw, label: "7-day easy returns" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-2 rounded-md border bg-card p-3 text-xs">
                <f.icon className="h-4 w-4 text-saffron" /> {f.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
