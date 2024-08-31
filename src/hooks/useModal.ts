import { ModalContext } from "@components/shared/Modal";
import { useContext } from "react";

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  const { openName, close, open } = context;
  return { openName, close, open };
}
