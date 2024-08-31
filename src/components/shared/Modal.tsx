import {
  cloneElement,
  createContext,
  useContext,
  useState,
  ReactNode,
  MouseEvent,
  ReactElement,
} from "react";

import styles from "@styles/Modal.module.css";
import { useOutsideClick } from "@hooks/useOutsideClick";

interface ModalContextType {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

interface ModalProps {
  children: ReactNode;
}

// Modal Main
export default function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState<string>("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider
      value={{
        openName,
        close,
        open,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

// Modal Open Functionality
interface OpenProps {
  children: ReactElement;
  opens: string;
}

function Open({ children, opens: opensWindowName }: OpenProps) {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("Open must be used within a Modal");
  }

  const { open } = context;

  const handleClick = (event: MouseEvent) => {
    if (children.props.onClick) {
      children.props.onClick(event);
    }
    open(opensWindowName);
  };

  return cloneElement(children, {
    onClick: handleClick,
  });
}

// Modal Window Functionality
interface WindowProps {
  children: ReactElement;
  name: string;
}

function Window({ children, name }: WindowProps) {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("Window must be used within a Modal");
  }
  const { openName, close } = context;
  const ref = useOutsideClick<HTMLDivElement>(close);
  if (name !== openName) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={ref}>
        <div>{children}</div>
      </div>
    </div>
  );
}

Modal.Open = Open;
Modal.Window = Window;
