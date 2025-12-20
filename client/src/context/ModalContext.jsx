import { createContext, useState, useContext, useEffect } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalType, setModalType] = useState("");

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <ModalContext.Provider value={{ modalType, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
