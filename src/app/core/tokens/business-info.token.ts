import { InjectionToken } from '@angular/core';

/** Weekday names as schema.org expects them. */
export type SchemaDay =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface BusinessHours {
  /** Shown to visitors. */
  readonly days: string;
  /** Shown to visitors. */
  readonly hours: string;
  /** The same slot, machine readable, for structured data. */
  readonly schemaDays: readonly SchemaDay[];
  readonly opens: string;
  readonly closes: string;
}

export interface BusinessAddress {
  readonly street: string;
  readonly city: string;
  readonly postalCode: string;
  readonly country: string;
}

export interface GeoPoint {
  readonly latitude: number;
  readonly longitude: number;
}

/**
 * Registry data for the legal pages. Verified against the ANAF public
 * register (CUI 6313554) rather than copied by hand.
 */
export interface CompanyDetails {
  readonly legalName: string;
  readonly tradeRegister: string;
  readonly fiscalCode: string;
  readonly vatNumber: string;
  readonly registeredOffice: string;
  readonly activity: string;
  readonly registeredSince: string;
}

export interface BusinessInfo {
  readonly name: string;
  readonly tagline: string;
  /** Origin of the live site, without a trailing slash. Used for absolute URLs. */
  readonly siteUrl: string;
  readonly description: string;
  readonly phone: string;
  readonly phoneDisplay: string;
  /** Opens a WhatsApp chat with the shop, with a greeting already typed. */
  readonly whatsappUrl: string;
  readonly address: BusinessAddress;
  readonly geo: GeoPoint;
  readonly mapsUrl: string;
  readonly mapsEmbedUrl: string;
  readonly hours: readonly BusinessHours[];
  readonly foundedYear: number;
  readonly orderLeadTimeDays: number;
  readonly company: CompanyDetails;
}

/**
 * Single source of truth for contact details. Injected wherever the
 * phone number, address or schedule is shown so it never drifts, and used
 * to build the structured data for search engines.
 */
export const BUSINESS_INFO = new InjectionToken<BusinessInfo>('BUSINESS_INFO', {
  providedIn: 'root',
  factory: (): BusinessInfo => ({
    name: 'Pati Bona',
    tagline: 'Patiseria bunicii',
    // Set this to the real domain before going live: it is what search engines
    // and social networks use for absolute links and preview images.
    siteUrl: 'https://patibona.ro',
    description:
      'Cozonaci, torturi personalizate, candy bar și prăjituri de casă, făcute cu răbdare după rețete de familie, în Craiova.',
    phone: '+40724228751',
    phoneDisplay: '0724 228 751',
    whatsappUrl: `https://wa.me/40724228751?text=${encodeURIComponent('Bună ziua! Aș dori să fac o comandă.')}`,
    address: {
      street: 'Aleea 1 Castanilor 4',
      city: 'Craiova',
      postalCode: '200352',
      country: 'RO',
    },
    geo: { latitude: 44.3380495, longitude: 23.7833824 },
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pati+Bona+Craiova',
    mapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2853.6328337293044!2d23.7833824!3d44.3380495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4752d9df2851bf1b%3A0x61c14c3a60ae2544!2sPati%20Bona!5e0!3m2!1sro!2sro!4v1778177939304!5m2!1sro!2sro',
    hours: [
      {
        days: 'Luni – Vineri',
        hours: '07:00 – 22:00',
        schemaDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '22:00',
      },
      {
        days: 'Sâmbătă',
        hours: '08:00 – 18:00',
        schemaDays: ['Saturday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        days: 'Duminică',
        hours: '08:00 – 18:00',
        schemaDays: ['Sunday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    foundedYear: 1993,
    orderLeadTimeDays: 3,
    company: {
      legalName: 'PATI BONA PROD S.R.L.',
      tradeRegister: 'J16/2731/1994',
      fiscalCode: '6313554',
      vatNumber: 'RO6313554',
      registeredOffice: 'Cartier Corniţoiu, bl. 2, sc. 1, et. 2, ap. 9, 200409 Craiova, județul Dolj',
      activity: 'CAEN 1071 · Fabricarea pâinii, a prăjiturilor și a produselor proaspete de patiserie',
      registeredSince: '25 octombrie 1994',
    },
  }),
});
