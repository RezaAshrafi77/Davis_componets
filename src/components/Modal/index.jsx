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
    <div className={styles.container} onClick={handleClose}>
      <div
        className={classNames(containerClassName, styles.modal)}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          className={styles.closeButton}
          title="&times;"
          onClick={handleClose}
        />
        {children}
      </div>
    </div>,
    modal
  );
};
