import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { cars, formatINR } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ShieldCheck, Clock, Wallet, CheckCircle2 } from "lucide-react";

const search = z.object({ car: z.string().optional() });
const DEPOSIT = 11000;

export const Route = createFileRoute("/advance-booking")({
  validateSearch: (s) => search.parse(s),
  head: () => ({
    meta: [
      { title: "Advance Booking — Reserve your Pre-Owned Car | VahanBazaar" },
      { name: "description", content: "Reserve any certified used car with a refundable ₹11,000 deposit. Lock the price for 15 days." },
      { property: "og:title", content: "Advance Booking — VahanBazaar" },
      { property: "og:description", content: "Refundable ₹11,000 deposit, 15-day price lock." },
    ],
  }),
  component: AdvanceBooking,
});

function AdvanceBooking() {
  const { car: carId } = Route.useSearch();
  const [carSel, setCarSel] = useState(carId ?? cars[0].id);
  const [form, setForm] = useState({ name: "", phone: "", email: "", pan: "", deliveryCity: "Mumbai", deliveryDate: "" });
  const [pay, setPay] = useState<"upi" | "card" | "netbank">("upi");
  const [done, setDone] = useState(false);

  const car = cars.find((c) => c.id === carSel)!;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) { toast.error("Please fill required fields"); return; }
    setDone(true);
    toast.success(`Booking confirmed — ${formatINR(DEPOSIT)} received`);
  };

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-saffron" />
        <h1 className="mt-4 font-display text-3xl">Reservation confirmed</h1>
        <p className="mt-3 text-muted-foreground">
          Your <b>{car.brand} {car.name}</b> is reserved for 15 days. Booking ID: <b>VB{Math.floor(Math.random() * 900000 + 100000)}</b>
        </p>
        <p className="mt-2 text-sm text-muted-foreground">A relationship manager will call you within 4 working hours to complete formalities.</p>
        <Button className="mt-6" onClick={() => setDone(false)}>New booking</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-xs uppercase tracking-widest text-saffron">Advance Booking</div>
      <h1 className="mt-1 font-display text-4xl">Reserve your car with {formatINR(DEPOSIT)}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Fully refundable deposit. Lock in today's price for 15 days while we prepare paperwork, RC transfer and delivery.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          { icon: Wallet, title: "Refundable", body: "100% refund if you change your mind." },
          { icon: Clock, title: "15-day lock", body: "Price and car held only for you." },
          { icon: ShieldCheck, title: "Secure", body: "PCI-compliant payments and paperwork." },
        ].map((f) => (
          <div key={f.title} className="rounded-xl border bg-card p-5">
            <f.icon className="h-5 w-5 text-saffron" />
            <div className="mt-2 font-semibold">{f.title}</div>
            <p className="text-xs text-muted-foreground">{f.body}</p>
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6 rounded-xl border bg-card p-6 md:p-8">
          <div>
            <Label>Select car</Label>
            <Select value={carSel} onValueChange={setCarSel}>
              <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
              <SelectContent>
                {cars.map((c) => <SelectItem key={c.id} value={c.id}>{c.year} {c.brand} {c.name} — {formatINR(c.price)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div><Label>Full name *</Label><Input className="mt-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Phone *</Label><Input className="mt-2" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
            <div><Label>Email</Label><Input className="mt-2" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div><Label>PAN (optional)</Label><Input className="mt-2" value={form.pan} onChange={(e) => setForm({ ...form, pan: e.target.value.toUpperCase() })} placeholder="ABCDE1234F" /></div>
            <div>
              <Label>Delivery city</Label>
              <Select value={form.deliveryCity} onValueChange={(v) => setForm({ ...form, deliveryCity: v })}>
                <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Pune", "Chennai", "Kolkata", "Ahmedabad", "Jaipur"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div><Label>Preferred delivery date</Label><Input className="mt-2" type="date" value={form.deliveryDate} onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })} min={new Date().toISOString().slice(0, 10)} /></div>
          </div>

          <div>
            <Label>Payment method</Label>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {[{ v: "upi", l: "UPI" }, { v: "card", l: "Card" }, { v: "netbank", l: "Net Banking" }].map((p) => (
                <button
                  key={p.v}
                  type="button"
                  onClick={() => setPay(p.v as never)}
                  className={`rounded-md border p-3 text-sm ${pay === p.v ? "border-saffron ring-2 ring-saffron/30" : ""}`}
                >
                  {p.l}
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-xl border bg-card p-6 shadow-[var(--shadow-card)]">
          <h2 className="font-display text-xl">Booking summary</h2>
          <div className="mt-4 flex gap-3">
            <img src={car.image} alt={car.name} className="h-20 w-28 rounded-md object-cover" />
            <div className="text-sm">
              <div className="font-semibold">{car.brand} {car.name}</div>
              <div className="text-muted-foreground">{car.year} · {car.fuel}</div>
              <div className="mt-1 font-semibold">{formatINR(car.price)}</div>
            </div>
          </div>
          <div className="mt-6 space-y-2 border-t pt-4 text-sm">
            <div className="flex justify-between"><span>Car price (locked)</span><span>{formatINR(car.price)}</span></div>
            <div className="flex justify-between"><span>Booking deposit</span><span>{formatINR(DEPOSIT)}</span></div>
            <div className="flex justify-between text-muted-foreground"><span>Balance on delivery</span><span>{formatINR(car.price - DEPOSIT)}</span></div>
          </div>
          <div className="mt-4 flex justify-between border-t pt-4 font-display text-lg">
            <span>Pay now</span><span>{formatINR(DEPOSIT)}</span>
          </div>
          <Button type="submit" className="mt-6 w-full" size="lg">Pay {formatINR(DEPOSIT)} & Reserve</Button>
          <p className="mt-3 text-[11px] text-muted-foreground">By continuing you agree to our refund policy. Deposit refunded within 5 working days.</p>
        </aside>
      </form>
    </div>
  );
}
