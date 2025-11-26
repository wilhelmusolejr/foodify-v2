import React from "react";

// Component
import ModalContainer from "../ModalContainer";
import { useModal } from "../../context/ModalContext";

export default function NeedLogin() {
  const { openModal } = useModal();

  return (
    <ModalContainer>
      <div className="bg-white p-6 rounded max-w-md w-full">
        <h2 id="login-title" className="text-lg font-semibold">
          Sign in to comment
        </h2>
        <p className="mt-2">You must be signed in to post a comment.</p>

        <div className="mt-4 flex gap-2 justify-end">
          <button className="px-3 py-2" onClick={closeModal}>
            Cancel
          </button>
          <button
            className="px-3 py-2 bg-black text-white rounded"
            onClick={() => openModal("login")}
          >
            Sign in
          </button>
        </div>
      </div>
    </ModalContainer>
  );
}
