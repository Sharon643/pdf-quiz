import { useEffect, useState } from "react";

import { getProgress } from "../services/progress";
import type { ProgressResponse } from "../types/progress";

export function useProgress(jobId: string | null) {
  const [progress, setProgress] =
    useState<ProgressResponse | null>(null);

  const [isPolling, setIsPolling] =
    useState(false);

  useEffect(() => {
    if (!jobId) {
      setProgress(null);
      setIsPolling(false);
      return;
    }

    const currentJobId = jobId;

    setIsPolling(true);

    let interval: number;

    async function poll() {
      try {
        const data = await getProgress(currentJobId);

        setProgress(data);

        if (data.completed) {
          setIsPolling(false);
          window.clearInterval(interval);
        }
      } catch (error) {
        console.error(error);

        setIsPolling(false);
        window.clearInterval(interval);
      }
    }

    poll();

    interval = window.setInterval(poll, 1000);

    return () => {
      window.clearInterval(interval);
      setIsPolling(false);
    };

  }, [jobId]);

  return {
    progress,
    isPolling,
  };
}