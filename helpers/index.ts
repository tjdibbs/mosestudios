export const formatCurrencyNGN = (value: any) => {
  const nigerianNaira = new Intl.NumberFormat("en-ng", {
    style: "currency",
    currency: "NGN",
  });

  return nigerianNaira.format(value);
};
export const formatCurrencyUK = (value: any) => {
  const ukPOUNDS = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  return ukPOUNDS.format(value);
};
