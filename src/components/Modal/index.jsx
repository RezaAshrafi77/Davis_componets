/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { createPortal } from "react-dom";
import { Button } from "../Button";
import styles from "./styles.module.css";
import classNames from "classnames";

export const Modal = ({ onClose, isOpen, children, containerClassName }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };

  return createPortal(
    <div
      className={
        styles.container +
        " " +
        "fixed inset-0 z-50 flex items-center justify-center h-screen w-screen"
      }
      onClick={handleClose}
    >
      <div
        className={classNames(
          containerClassName,
          styles.modal +
            " " +
            "bg-white shadow-lg px-2 lg:px-4 py-2 rounded-md max-w-[100vw] max-h-[100vh] overflow-y-auto"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          className={
            "p-2 bg-transparent border-none font-bold text-2xl text-black shadow-none"
          }
          title="&times;"
          onClick={handleClose}
        />
        {children}
      </div>
    </div>,
    modal
  );
};
