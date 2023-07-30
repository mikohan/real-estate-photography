const urls = {
  home: () => '/',
  shop: () => '/shop/listing',
  prices: (id: number) => `/prices/${id}`
};

export { urls };
