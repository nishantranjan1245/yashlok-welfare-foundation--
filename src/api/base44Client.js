import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const yashlokWelfareFoundation = createClient({
  appId: "691466a63d4977ae37992c93", 
  requiresAuth: true // Ensure authentication is required for all operations
});
