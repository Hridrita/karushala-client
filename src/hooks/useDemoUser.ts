"use client";

import { useAuth } from "./useAuth";
import { isDemoUser, getDemoStatus } from "@/lib/demo-user";

export const useDemoUser = () => {
  const { user, isAuthenticated } = useAuth();
  
  const isDemo = isDemoUser(user?.email);
  const status = getDemoStatus(user?.email);

  return {
    isDemo,
    isRealUser: !isDemo,
    isAuthenticated,
    user,
    status,
    canPerformActions: !isDemo && isAuthenticated,
  };
};