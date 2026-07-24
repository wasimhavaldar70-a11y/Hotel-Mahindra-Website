import React from "react";
import { Metadata } from "next";
import { hotelConfig } from "../../config/hotel";

/**
 * ============================================================================
 * TERMS AND CONDITIONS PAGE
 * 
 * PURPOSE:
 * Details the legal check-in rules and occupancy standards for guest records.
 * ============================================================================
 */

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Read the hotel policies, check-in requirements, and booking rules of ${hotelConfig.name} Kolhapur.`
};

export default function TermsPage() {
  return (
    <div className="bg-bg-base font-sans py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="border-b border-border-custom pb-6">
          <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-wide text-text-main">
            Terms & Conditions
          </h1>
          <p className="text-text-muted text-xs mt-2 uppercase tracking-wider font-semibold">
            Last Updated: July 2026
          </p>
        </div>

        <div className="space-y-6 text-sm text-text-muted leading-relaxed">
          
          <p>
            Welcome to the terms of service of <strong>{hotelConfig.name}</strong>. By visiting this website and checking into our hotel, you agree to comply with and be bound by the following rules.
          </p>

          <h2 className="font-serif text-xl font-bold text-text-main pt-4">1. Check-In & Identity Verification</h2>
          <p>
            Guests must present a valid government-issued photo ID (Aadhaar Card, Passport, or Driving License) during registration. Pan cards are not accepted as valid residence indicators. Check-in commences at <strong>{hotelConfig.checkInTime}</strong> and check-out is strictly at <strong>{hotelConfig.checkOutTime}</strong>.
          </p>

          <h2 className="font-serif text-xl font-bold text-text-main pt-4">2. Guest Behavior & Cleanliness Rules</h2>
          <p>
            We operate a clean, safe, family-oriented premises. Guests are expected to maintain respect for neighboring rooms. Damage to hotel assets, bedding linens, or hardware will result in clean repair fines levied at checkout.
          </p>

          <h2 className="font-serif text-xl font-bold text-text-main pt-4">3. Booking Revisions</h2>
          <p>
            As bookings are coordinated directly via phone dialers and WhatsApp channels, changes or cancellations must be notified at least 24 hours prior to standard check-in timings.
          </p>

          <h2 className="font-serif text-xl font-bold text-text-main pt-4">4. Liability Limitations</h2>
          <p>
            {hotelConfig.name} does not assume liability for missing valuables left inside guest rooms. Guests are encouraged to utilize locks and safe boxes. If you have any inquiries, contact us at: <strong>{hotelConfig.phoneDisplay}</strong>.
          </p>

        </div>

      </div>
    </div>
  );
}
