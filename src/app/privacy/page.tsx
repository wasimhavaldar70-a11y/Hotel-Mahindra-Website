import React from "react";
import { Metadata } from "next";
import { hotelConfig } from "../../config/hotel";

/**
 * ============================================================================
 * PRIVACY POLICY PAGE
 * 
 * PURPOSE:
 * Standard compliance privacy policy statements for guest references.
 * ============================================================================
 */

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Read the privacy policy rules and data safekeeping protocols of ${hotelConfig.name} Kolhapur.`
};

export default function PrivacyPage() {
  return (
    <div className="bg-bg-base font-sans py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="border-b border-border-custom pb-6">
          <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-wide text-text-main">
            Privacy Policy
          </h1>
          <p className="text-text-muted text-xs mt-2 uppercase tracking-wider font-semibold">
            Last Updated: July 2026
          </p>
        </div>

        <div className="space-y-6 text-sm text-text-muted leading-relaxed">
          
          <p>
            At <strong>{hotelConfig.name}</strong>, accessible from our marketing site, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by {hotelConfig.name} and how we use it.
          </p>

          <h2 className="font-serif text-xl font-bold text-text-main pt-4">1. General Information Collection</h2>
          <p>
            We collect guest identifiers exclusively when they dial our contact phone lines, contact us via WhatsApp API redirects, or write emails. This data is handled in strict compliance with safety rules and is never sold to third-party marketing firms.
          </p>

          <h2 className="font-serif text-xl font-bold text-text-main pt-4">2. Guest Identification Data & Registration</h2>
          <p>
            Upon physical check-in at the front desk desk, we collect official government photo identification (like Aadhaar cards, passports, or driving licenses) as mandatory compliance with municipal police rules in Kolhapur, Maharashtra.
          </p>

          <h2 className="font-serif text-xl font-bold text-text-main pt-4">3. Log Files & Analytics</h2>
          <p>
            {hotelConfig.name} follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
          </p>

          <h2 className="font-serif text-xl font-bold text-text-main pt-4">4. Consent</h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its terms. If you have any inquiries regarding this document, please reach out directly via our email: <strong>{hotelConfig.email}</strong>.
          </p>

        </div>

      </div>
    </div>
  );
}
