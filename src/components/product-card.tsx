import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Product } from "@/lib/data";
import { formatINR } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-store";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-elegant)]">
      <Link to="/products/$id" params={{ id: product.id }} className="block aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{product.brand}</div>
        <Link to="/products/$id" params={{ id: product.id }} className="mt-1 line-clamp-2 text-sm font-semibold hover:underline">
          {product.name}
        </Link>
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-saffron text-saffron" /> {product.rating}
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-lg font-semibold">{formatINR(product.price)}</span>
          <span className="text-xs text-muted-foreground line-through">{formatINR(product.mrp)}</span>
        </div>
        <Button
          className="mt-3"
          size="sm"
          onClick={() => {
            add({ id: product.id, name: product.name, price: product.price, image: product.image, kind: "product" });
            toast.success("Added to cart");
          }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
