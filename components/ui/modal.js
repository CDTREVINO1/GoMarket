import { Fragment } from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return (
    <div
      className="fixed w-full bg-black bg-opacity-50"
      onClick={props.onClose}
    />
  );
};

const ModalOverlay = (props) => {
  return (
    <div className="fixed bg-white shadow-sm">
      <div>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("overlays")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("overlays")
      )}
    </Fragment>
  );
};

export default Modal;
