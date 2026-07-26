import { Link } from "@tanstack/react-router";
import { ShoppingCart, Menu, Car } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const nav = [
  { to: "/cars", label: "Buy Cars" },
  { to: "/products", label: "Car Care" },
  { to: "/test-drive", label: "Test Drive" },
  { to: "/advance-booking", label: "Advance Booking" },
  { to: "/about", label: "About" },
];

export function SiteHeader() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Car className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-semibold" data-brand-text="business-name">VahanBazaar</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Certified Pre-Owned</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-saffron px-1 text-[11px] font-semibold text-saffron-foreground">
                {count}
              </span>
            )}
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent md:hidden" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-8 flex flex-col gap-1">
                {nav.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2 text-base font-medium hover:bg-accent"
                  >
                    {n.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
