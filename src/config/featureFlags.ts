const asBool = (value?: string, fallback = true) =>
  value === undefined ? fallback : value === "true";

export const featureFlags = {
  careers: asBool(process.env.NEXT_PUBLIC_FEATURE_CAREERS, true),
  quote: asBool(process.env.NEXT_PUBLIC_FEATURE_QUOTE, true),
  blog: asBool(process.env.NEXT_PUBLIC_FEATURE_BLOG, true),
};
