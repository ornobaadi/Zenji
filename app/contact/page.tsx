import React from "react";
import { Mail, MessageSquare, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="space-y-2 text-center sm:text-left">
        <div className="text-[11px] font-system text-accent-flame font-bold tracking-widest uppercase">
          COMMUNICATIONS // ATELIER DISPATCH
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-text-primary">
          TRANSMIT A MESSAGE
        </h1>
        <p className="text-xs text-text-secondary max-w-lg">
          For sizing inquiries, collaborations, and order status, reach out to our studio team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="p-6 bg-bg-elevated border border-border-subtle rounded space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="contact-name" className="text-xs font-system text-text-secondary">
              NAME
            </Label>
            <Input
              id="contact-name"
              placeholder="Your identifier"
              className="bg-bg-elevated-2 border-border-strong text-text-primary text-xs font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contact-email" className="text-xs font-system text-text-secondary">
              EMAIL
            </Label>
            <Input
              id="contact-email"
              type="email"
              placeholder="ronin@neo-tokyo.io"
              className="bg-bg-elevated-2 border-border-strong text-text-primary text-xs font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contact-message" className="text-xs font-system text-text-secondary">
              TRANSMISSION
            </Label>
            <textarea
              id="contact-message"
              rows={4}
              placeholder="Message details..."
              className="w-full bg-bg-elevated-2 border border-border-strong rounded p-3 text-text-primary text-xs font-mono focus:outline-none focus:border-accent-flame"
            />
          </div>

          <Button className="w-full bg-text-primary text-bg-primary hover:bg-neutral-200 font-bold uppercase tracking-wider text-xs font-system h-11">
            SEND TRANSMISSION &rarr;
          </Button>
        </div>

        {/* Studio Info */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="p-4 bg-bg-elevated border border-border-subtle rounded flex items-start gap-3">
              <Mail className="w-5 h-5 text-accent-flame shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-system font-bold uppercase text-text-primary">DIRECT EMAIL</h4>
                <p className="text-xs text-text-secondary font-mono mt-0.5">contact@zenji.shop</p>
              </div>
            </div>

            <div className="p-4 bg-bg-elevated border border-border-subtle rounded flex items-start gap-3">
              <MapPin className="w-5 h-5 text-accent-flame shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-system font-bold uppercase text-text-primary">ATELIER LOCATION</h4>
                <p className="text-xs text-text-secondary mt-0.5">Melbourne, Victoria, Australia</p>
              </div>
            </div>

            <div className="p-4 bg-bg-elevated border border-border-subtle rounded flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-accent-flame shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-system font-bold uppercase text-text-primary">RESPONSE WINDOW</h4>
                <p className="text-xs text-text-secondary mt-0.5">Monday &ndash; Friday &bull; 24-48 Hours</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-bg-elevated-2 border border-border-strong rounded text-[11px] font-system text-text-tertiary">
            SYSTEM // COMMUNICATIONS PROTOCOL 4.2
          </div>
        </div>
      </div>
    </main>
  );
}
