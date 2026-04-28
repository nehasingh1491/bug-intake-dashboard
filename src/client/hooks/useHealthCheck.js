/**
 * useHealthCheck Hook
 * =====================
 *
 * Custom hook for checking database and server connectivity.
 * Used by development checks to verify server and database connectivity.
 *
 * Features:
 * - Initial connection check on mount
 * - Manual retry functionality
 * - Fetches basic stats when connected
 *
 * Usage:
 *   const { status, stats, retry } = useHealthCheck();
 *
 *   // status can be: 'checking', 'connected', 'error'
 *   if (status === 'error') {
 *     return <DatabaseSetupGuide onRetry={retry} />;
 *   }
 */

import { useState, useEffect, useCallback } from "react";
import { bugService, healthService } from "../services";

/**
 * Connection status enum
 * @readonly
 * @enum {string}
 */
export const ConnectionStatus = {
  CHECKING: "checking",
  CONNECTED: "connected",
  ERROR: "error",
};

/**
 * Hook for checking database connectivity and fetching stats
 * @returns {Object} Health check state and operations
 */
export function useHealthCheck() {
  const [status, setStatus] = useState(ConnectionStatus.CHECKING);
  const [stats, setStats] = useState(null);

  /**
   * Check database connection and fetch basic stats
   * Makes multiple API calls to verify full connectivity
   */
  const checkConnection = useCallback(async () => {
    try {
      setStatus(ConnectionStatus.CHECKING);

      // First check if server is responding
      const healthResponse = await healthService.check().catch(() => null);
      if (!healthResponse) {
        throw new Error("Server not responding");
      }

      // Try to fetch data to verify database connection
      const bugsResponse = await bugService.getAll();

      // Set stats for display
      setStats({
        bugs: bugsResponse.data?.length || 0,
      });

      setStatus(ConnectionStatus.CONNECTED);
    } catch (error) {
      console.error("Database connection error:", error);
      setStatus(ConnectionStatus.ERROR);
      setStats(null);
    }
  }, []);

  // Check connection on mount
  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  return {
    // State
    status,
    stats,
    isChecking: status === ConnectionStatus.CHECKING,
    isConnected: status === ConnectionStatus.CONNECTED,
    isError: status === ConnectionStatus.ERROR,

    // Operations
    retry: checkConnection,

    // Utilities
    ConnectionStatus,
  };
}

export default useHealthCheck;
