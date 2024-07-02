export const formatCurrencyNGN = (value: any) => {
  const nigerianNaira = new Intl.NumberFormat("en-ng", {
    style: "currency",
    currency: "NGN",
  });

  return nigerianNaira.format(value);
};
