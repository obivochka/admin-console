import React from "react";

const Modal = ({ image, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={image} alt="Full-size" className="modal-image" />
        <button onClick={onClose} className="close-button">Закрыть</button>
      </div>
    </div>
  );
};

export default Modal;