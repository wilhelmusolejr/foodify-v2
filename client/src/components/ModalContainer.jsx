import React, { useEffect } from "react";

export default function ModalContainer({ children, onClose }) {
  // remove scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
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
