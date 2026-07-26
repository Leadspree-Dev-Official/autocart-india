import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { cars } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CalendarCheck, MapPin, Home } from "lucide-react";

const search = z.object({ car: z.string().optional() });

export const Route = createFileRoute("/test-drive")({
  validateSearch: (s) => search.parse(s),
  head: () => ({
    meta: [
      { title: "Book a Doorstep Test Drive — VahanBazaar" },
      { name: "description", content: "Schedule a free test drive at your home or at the nearest VahanBazaar hub across India." },
      { property: "og:title", content: "Book a Test Drive — VahanBazaar" },
      { property: "og:description", content: "Free doorstep test drive booking." },
    ],
  }),
  component: TestDrivePage,
});

function TestDrivePage() {
  const { car: carId } = Route.useSearch();
  const [carSel, setCarSel] = useState(carId ?? cars[0].id);
  const [mode, setMode] = useState<"home" | "hub">("home");
  const [form, setForm] = useState({ name: "", phone: "", email: "", date: "", time: "10:00", city: "Mumbai", address: "" });
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date) { toast.error("Please fill required fields"); return; }
    setDone(true);
    toast.success("Test drive booked — you'll get a confirmation SMS shortly");
  };

  if (done) {
    const car = cars.find((c) => c.id === carSel)!;
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <CalendarCheck className="mx-auto h-12 w-12 text-saffron" />
        <h1 className="mt-4 font-display text-3xl">You're booked!</h1>
        <p className="mt-3 text-muted-foreground">
          Your test drive for the <b>{car.brand} {car.name}</b> is confirmed for <b>{form.date}</b> at <b>{form.time}</b>.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">Our advisor will call {form.phone} to confirm.</p>
        <Button className="mt-6" onClick={() => setDone(false)}>Book another</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="text-xs uppercase tracking-widest text-saffron">Zero commitment</div>
      <h1 className="mt-1 font-display text-4xl">Book a test drive</h1>
      <p className="mt-2 text-muted-foreground">We'll bring the car to your doorstep or you can visit our hub.</p>

      <form onSubmit={submit} className="mt-8 grid gap-6 rounded-xl border bg-card p-6 md:p-8">
        <div>
          <Label>Choose car</Label>
          <Select value={carSel} onValueChange={setCarSel}>
            <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
            <SelectContent>
              {cars.map((c) => <SelectItem key={c.id} value={c.id}>{c.year} {c.brand} {c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Where would you like the test drive?</Label>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => setMode("home")}
              className={`flex items-start gap-3 rounded-md border p-4 text-left ${mode === "home" ? "border-saffron ring-2 ring-saffron/30" : ""}`}>
              <Home className="mt-0.5 h-5 w-5 text-saffron" />
              <div>
                <div className="font-semibold">At my home</div>
                <div className="text-xs text-muted-foreground">Free doorstep drive within city limits</div>
              </div>
            </button>
            <button type="button" onClick={() => setMode("hub")}
              className={`flex items-start gap-3 rounded-md border p-4 text-left ${mode === "hub" ? "border-saffron ring-2 ring-saffron/30" : ""}`}>
              <MapPin className="mt-0.5 h-5 w-5 text-saffron" />
              <div>
                <div className="font-semibold">At VahanBazaar hub</div>
                <div className="text-xs text-muted-foreground">Visit nearest hub in your city</div>
              </div>
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div><Label>Full name *</Label><Input className="mt-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div><Label>Phone *</Label><Input className="mt-2" type="tel" placeholder="+91 …" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          <div><Label>Email</Label><Input className="mt-2" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <div>
            <Label>City</Label>
            <Select value={form.city} onValueChange={(v) => setForm({ ...form, city: v })}>
              <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Pune", "Chennai", "Kolkata", "Ahmedabad", "Jaipur"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div><Label>Preferred date *</Label><Input className="mt-2" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} min={new Date().toISOString().slice(0, 10)} /></div>
          <div>
            <Label>Time slot</Label>
            <Select value={form.time} onValueChange={(v) => setForm({ ...form, time: v })}>
              <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
              <SelectContent>
                {["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {mode === "home" && (
          <div><Label>Address for doorstep drive</Label><Input className="mt-2" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="House no, area, landmark, pincode" /></div>
        )}

        <Button type="submit" size="lg">Confirm Test Drive</Button>
      </form>
    </div>
  );
}
