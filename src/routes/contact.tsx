import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact VahanBazaar — Talk to our team" },
      { name: "description", content: "Reach out to VahanBazaar for buying, selling or servicing your car in India." },
      { property: "og:title", content: "Contact VahanBazaar" },
      { property: "og:description", content: "Talk to our team across 45 Indian cities." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-xs uppercase tracking-widest text-saffron">Get in touch</div>
      <h1 className="mt-1 font-display text-4xl">We're here to help</h1>
      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {[
            { icon: Phone, title: "Call", body: "+91 98200 12345", sub: "Mon–Sat, 9am–8pm" },
            { icon: Mail, title: "Email", body: "hello@vahanbazaar.in", sub: "Reply within 4 hours" },
            { icon: MapPin, title: "Head office", body: "Andheri East, Mumbai 400069", sub: "Visit us any day" },
          ].map((c) => (
            <div key={c.title} className="rounded-xl border bg-card p-5">
              <c.icon className="h-5 w-5 text-saffron" />
              <div className="mt-2 font-semibold">{c.title}</div>
              <div className="text-sm">{c.body}</div>
              <div className="text-xs text-muted-foreground">{c.sub}</div>
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); toast.success("Message sent — we'll be in touch"); setForm({ name: "", email: "", message: "" }); }}
          className="space-y-4 rounded-xl border bg-card p-6"
        >
          <div><Label>Name</Label><Input className="mt-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
          <div><Label>Email</Label><Input className="mt-2" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
          <div><Label>Message</Label><Textarea className="mt-2" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required /></div>
          <Button type="submit" size="lg">Send message</Button>
        </form>
      </div>
    </div>
  );
}
