import { useState } from "react";
import Authentication from "./Authentication";
import Modal from "./Modal";

export default function Layout(props) {
  const { children } = props;

  const [showModal, setShowModal] = useState(false);

  const header = (
    <header>
      <div>
        <h1 className="text-gradient">BuzzLog</h1>
        <p>For Coffee Insatiates</p>
      </div>
      <button
        onClick={() => {
          setShowModal(true);
        }}
      >
        <p>Sign up free</p>
        <i className="fa-solid fa-mug-hot"></i>
      </button>
    </header>
  );

  const footer = (
    <footer>
      <p>
        <span className="text-gradient">BuzzLog</span> was made by{" "}
        <a href="https://jordanwood.netlify.app/" target="_blank">
          Jordan Wood
        </a>{" "}
        <br />
        using the{" "}
        <a href="https://www.fantacss.smoljames.com" target="_blank">
          FantaCSS
        </a>{" "}
        design library.
        <br />
        Check out the project on{" "}
        <a
          href="https://github.com/okjordanwood/Coffee-Tracker"
          target="_blank"
        >
          GitHub
        </a>
        !
      </p>
    </footer>
  );

  return (
    <>
      {showModal && (
        <Modal
          handleCloseModal={() => {
            setShowModal(false);
          }}
        >
          <Authentication />
        </Modal>
      )}
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}
