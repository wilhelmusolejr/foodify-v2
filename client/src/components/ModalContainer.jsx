import React, { useEffect } from "react";
import { useModal } from "../context/ModalContext";

export default function ModalContainer({ children }) {
  const { closeModal } = useModal();

  // remove scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 close-modal"
      onClick={handleOverlayClick}
    >
      {children}
    </div>
  );
}
