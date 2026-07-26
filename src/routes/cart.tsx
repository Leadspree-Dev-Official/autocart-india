import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart-store";
import { formatINR } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — VahanBazaar" },
      { name: "description", content: "Review cars and products in your cart before checkout." },
      { property: "og:title", content: "Your Cart — VahanBazaar" },
      { property: "og:description", content: "Review and checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, remove, setQty, total, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 font-display text-3xl">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Add a certified car or maintenance product to get started.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild><Link to="/cars">Browse Cars</Link></Button>
          <Button asChild variant="outline"><Link to="/products">Shop Products</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-display text-4xl">Your cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-4">
          {items.map((i) => (
            <div key={i.id} className="flex gap-4 rounded-xl border bg-card p-4">
              <img src={i.image} alt={i.name} className="h-24 w-32 rounded-md object-cover" />
              <div className="flex-1">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{i.kind === "car" ? "Vehicle" : "Product"}</div>
                <div className="mt-0.5 font-semibold">{i.name}</div>
                <div className="mt-1 font-display text-lg">{formatINR(i.price)}</div>
                <div className="mt-2 flex items-center gap-3">
                  {i.kind === "product" ? (
                    <div className="inline-flex items-center rounded-md border">
                      <button className="h-8 w-8" onClick={() => setQty(i.id, i.qty - 1)}>−</button>
                      <span className="w-8 text-center text-sm">{i.qty}</span>
                      <button className="h-8 w-8" onClick={() => setQty(i.id, i.qty + 1)}>+</button>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">Qty 1 (vehicle)</span>
                  )}
                  <button className="ml-auto inline-flex items-center gap-1 text-sm text-destructive hover:underline" onClick={() => remove(i.id)}>
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-xl border bg-card p-6 shadow-[var(--shadow-card)]">
          <h2 className="font-display text-2xl">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(total)}</span></div>
            <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span>FREE</span></div>
            <div className="flex justify-between text-muted-foreground"><span>Estimated GST</span><span>Included</span></div>
          </div>
          <div className="mt-4 flex justify-between border-t pt-4 font-display text-xl">
            <span>Total</span><span>{formatINR(total)}</span>
          </div>
          <Button className="mt-6 w-full" size="lg" onClick={() => { toast.success("Order placed — our team will contact you"); clear(); }}>
            Proceed to Checkout
          </Button>
          <button className="mt-3 w-full text-xs text-muted-foreground hover:underline" onClick={clear}>Clear cart</button>
        </aside>
      </div>
    </div>
  );
}
