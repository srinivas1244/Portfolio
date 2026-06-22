"use client";

import { Toaster } from "sonner";

export function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      theme="dark"
      richColors
      closeButton
      visibleToasts={3}
      toastOptions={{
        className: "sonner-toast",
        style: {
          fontSize: "0.875rem",
          padding: "12px 16px",
        },
      }}
    />
  );
}
