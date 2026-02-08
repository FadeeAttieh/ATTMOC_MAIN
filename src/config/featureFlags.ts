const asBool = (value?: string, fallback = false) =>
  value === undefined ? fallback : value === "true";

export const featureFlags = {
  careers: asBool(process.env.NEXT_PUBLIC_FEATURE_CAREERS, false),
  quote: asBool(process.env.NEXT_PUBLIC_FEATURE_QUOTE, false),
  blog: asBool(process.env.NEXT_PUBLIC_FEATURE_BLOG, false),
};
