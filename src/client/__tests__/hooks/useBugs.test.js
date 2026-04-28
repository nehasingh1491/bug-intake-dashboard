import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useBugs } from "../../hooks/useBugs";

vi.mock("../../services", () => ({
  bugService: {
    getAll: vi.fn(),
    create: vi.fn(),
  },
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

import { bugService } from "../../services";

describe("useBugs", () => {
  const mockBugs = [
    {
      id: 1,
      title: "Login button does not respond",
      status: "open",
      priority: "high",
    },
    {
      id: 2,
      title: "Search filters lag",
      status: "blocked",
      priority: "medium",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    bugService.getAll.mockResolvedValue({ data: mockBugs });
  });

  it("fetches bugs on mount", async () => {
    const { result } = renderHook(() => useBugs());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.bugs).toEqual(mockBugs);
    expect(bugService.getAll).toHaveBeenCalledWith({});
  });

  it("passes filters to the API service", async () => {
    renderHook(() => useBugs({ status: "blocked", priority: "medium" }));

    await waitFor(() => {
      expect(bugService.getAll).toHaveBeenCalledWith({
        status: "blocked",
        priority: "medium",
      });
    });
  });

  it("creates a bug without fetching when autoFetch is false", async () => {
    const createdBug = { id: 3, title: "New bug" };
    bugService.create.mockResolvedValue({ data: createdBug });

    const { result } = renderHook(() => useBugs({}, { autoFetch: false }));

    await act(async () => {
      await expect(result.current.createBug(createdBug)).resolves.toEqual(
        createdBug
      );
    });

    expect(bugService.getAll).not.toHaveBeenCalled();
    expect(bugService.create).toHaveBeenCalledWith(createdBug);
  });
});
