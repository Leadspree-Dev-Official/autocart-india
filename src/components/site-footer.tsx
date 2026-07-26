import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl font-semibold" data-brand-text="business-name">VahanBazaar</div>
          <p className="mt-3 text-sm opacity-80">
            India's trusted certified pre-owned car marketplace. 200+ point inspection, transparent pricing, easy finance.
          </p>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold uppercase tracking-wider opacity-90">Shop</div>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/cars">Used Cars</Link></li>
            <li><Link to="/products">Car Care Products</Link></li>
            <li><Link to="/test-drive">Book Test Drive</Link></li>
            <li><Link to="/advance-booking">Advance Booking</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold uppercase tracking-wider opacity-90">Company</div>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold uppercase tracking-wider opacity-90">Reach Us</div>
          <ul className="space-y-2 text-sm opacity-80">
            <li data-brand-text="address">Andheri East, Mumbai 400069</li>
            <li data-brand-text="phone">+91 98200 12345</li>
            <li>hello@vahanbazaar.in</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between text-xs opacity-70">
          <div>© {new Date().getFullYear()} VahanBazaar Motors Pvt. Ltd. All rights reserved.</div>
          <a href="/admin" className="hover:underline">🔑 Admin Console</a>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-4 text-center text-xs opacity-60">
          Developer: Aniruddha Das | Developed by LeadSpree Business Solutions
        </div>
      </div>
    </footer>
  );
}
