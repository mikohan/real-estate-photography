JSON.stringify({
  '@context': 'http://www.schema.org',
  '@type': 'ProfessionalService',
  name: 'image',
  url: 'http://localhost:3000',
  logo: 'http://localhost:3000/img/logo.png',
  priceRange: '$$$$',
  image: 'http://localhost:3000/img/company.jpg',
  description:
    'Schedule the shoot, and we will handle the rest. High resolution photography, aerial photograpy, virtual tours and more, made easy.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '13163 Fountain Park Dr. APT B112',
    addressLocality: 'Playa Vista',
    addressRegion: 'CA',
    postalCode: '90094',
    addressCountry: 'United States'
  },
  openingHours: 'Mo 07:00-20:00 Tu 07:00-20:00 We 07:00-20:00 Th 07:00-20:00 Fr 07:00-20:00 Sa 07:00-20:00',
  telephone: '9512244109'
});
