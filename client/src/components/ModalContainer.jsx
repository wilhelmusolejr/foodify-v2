import React from "react";

export default function ModalContainer({ children, handleModal }) {
  const handleCloseModal = (e) => {
    if (e.target.classList.contains("close-modal")) {
      handleModal("");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 close-modal"
      onClick={handleCloseModal}
    >
      {children}
    </div>
  );
}
