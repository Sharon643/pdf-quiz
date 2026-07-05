import { useState } from "react";

import { uploadPdf } from "../services/extraction";

export function useUpload() {
  const [loading, setLoading] = useState(false);

  async function extract(file: File) {
    setLoading(true);

    try {
      return await uploadPdf(file);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    extract,
  };
}