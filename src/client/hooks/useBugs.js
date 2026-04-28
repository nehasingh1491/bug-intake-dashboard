import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { bugService } from "../services";

export function useBugs(filters = {}, options = {}) {
  const { autoFetch = true } = options;
  const { priority = "", status = "" } = filters;
  const [bugs, setBugs] = useState([]);
  const [isLoading, setIsLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  const fetchBugs = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await bugService.getAll({
        ...(priority && { priority }),
        ...(status && { status }),
      });
      setBugs(response.data || []);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [priority, status]);

  const createBug = async (data) => {
    const response = await bugService.create(data);
    toast.success("Bug created successfully");

    if (autoFetch) {
      await fetchBugs();
    }

    return response.data;
  };

  useEffect(() => {
    if (autoFetch) {
      fetchBugs();
    }
  }, [autoFetch, fetchBugs]);

  return {
    bugs,
    isLoading,
    error,
    refresh: fetchBugs,
    createBug,
  };
}

export function useBug(id) {
  const [bug, setBug] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBug = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await bugService.getById(id);
      setBug(response.data || null);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const updateStatus = async (status) => {
    const response = await bugService.updateStatus(id, status);
    setBug(response.data);
    toast.success("Status updated");
    return response.data;
  };

  useEffect(() => {
    fetchBug();
  }, [fetchBug]);

  return {
    bug,
    isLoading,
    error,
    refresh: fetchBug,
    updateStatus,
  };
}

export default useBugs;
