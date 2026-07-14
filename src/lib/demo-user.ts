export const DEMO_EMAILS = [
  "demo@karushala.com",
  "demo@example.com",
  "test@karushala.com",
];

export const isDemoUser = (email: string | undefined | null): boolean => {
  if (!email) return false;
  return DEMO_EMAILS.includes(email.toLowerCase());
};

export const getDemoStatus = (email: string | undefined | null) => {
  const isDemo = isDemoUser(email);
  return {
    isDemo,
    isRealUser: !isDemo,
    canPerformActions: !isDemo,
  };
};