import React, { useEffect } from "react";
import { useModal } from "../context/ModalContext";
import { motion } from "framer-motion";

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
    <motion.div
      className="fixed inset-0 z-60 flex justify-center items-center bg-black/50 close-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleOverlayClick} // click outside closes
    >
      {children}
    </motion.div>
  );
}
