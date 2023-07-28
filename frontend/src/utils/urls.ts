const urls = {
  home: () => '/',
  shop: () => '/shop/listing',
  prices: (planName: string) => `/prices/${planName.toLowerCase()}`
};

export { urls };
