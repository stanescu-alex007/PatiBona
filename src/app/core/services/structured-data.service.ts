import { inject, Injectable } from '@angular/core';
import { BUSINESS_INFO, BusinessInfo } from '../tokens/business-info.token';
import { PlatformService } from './platform.service';

const SCRIPT_ID = 'patibona-structured-data';

/**
 * Publishes the bakery as schema.org data so search engines can show the
 * address, phone and opening hours directly in results. Built from
 * BUSINESS_INFO, so the markup can never drift from what the page says.
 *
 * Runs during prerender too, which is what matters: the served HTML already
 * contains the script, no crawler has to execute JavaScript to find it.
 */
@Injectable({ providedIn: 'root' })
export class StructuredDataService {
  private readonly business = inject(BUSINESS_INFO);
  private readonly platform = inject(PlatformService);

  publish(): void {
    const doc = this.platform.document;
    if (doc.getElementById(SCRIPT_ID)) {
      return;
    }
    const script = doc.createElement('script');
    script.id = SCRIPT_ID;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(this.build(this.business));
    doc.head.appendChild(script);
  }

  private build(business: BusinessInfo): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'Bakery',
      name: business.name,
      legalName: business.company.legalName,
      description: business.description,
      url: business.siteUrl,
      image: `${business.siteUrl}/og-image.jpg`,
      telephone: business.phone,
      vatID: business.company.vatNumber,
      taxID: business.company.fiscalCode,
      foundingDate: String(business.foundedYear),
      address: {
        '@type': 'PostalAddress',
        streetAddress: business.address.street,
        addressLocality: business.address.city,
        postalCode: business.address.postalCode,
        addressCountry: business.address.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: business.geo.latitude,
        longitude: business.geo.longitude,
      },
      hasMap: business.mapsUrl,
      openingHoursSpecification: business.hours.map((slot) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: slot.schemaDays,
        opens: slot.opens,
        closes: slot.closes,
      })),
    };
  }
}
