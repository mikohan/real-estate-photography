const urls = {
  home: () => '/',
  shop: () => '/shop/listing',
  prices: (id: number) => `/prices/${id}`,
  success: () => `/success`,
  fail: () => `/fail`,
  checkout: () => '/checkout-custom'
};

export { urls };
