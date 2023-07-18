const urls = {
  home: () => '/',
  prices: (planName: string) => `/prices/${planName.toLowerCase()}`
};

export { urls };
