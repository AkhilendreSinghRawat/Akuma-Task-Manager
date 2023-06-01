import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "lightblue",
    width: "20vw",
  },
};
Modal.setAppElement(document.getElementById("root"));
const CreateNewModal = ({
  isOpen,
  onClose,
  handleSubmit,
  name = "",
  type = "Create",
  deleteProjectName,
}) => {
  const nameRef = useRef();
  const discriptionRef = useRef();
  const [showError, setShowError] = useState(false);

  const showErrorFunc = () => {
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 2000);
  };

  const handleDeleteSubmit = (name) => {
    if (name !== deleteProjectName) return showErrorFunc();
    handleSubmit?.();
  };

  const handleSubmitFunc = () => {
    const name = nameRef?.current?.value.trim();
    const discription = discriptionRef?.current?.value.trim();

    if (type === "Delete") return handleDeleteSubmit(name);

    if (name === "" || discription === "") {
      return showErrorFunc();
    }
    handleSubmit?.(name, discription);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontWeight: "bold", userSelect: "none" }}>
            {`${type} ${name}`}
          </div>
          <div
            style={{
              fontWeight: "bold",
              userSelect: "none",
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            X
          </div>
        </div>
        <div className="grayLine" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "15px 0",
          }}
        >
          {type == "Delete" ? (
            <DeleteLabel name={deleteProjectName} />
          ) : (
            <label>{name} Heading:</label>
          )}

          <input
            autoFocus
            style={{ height: "3vh", border: "none" }}
            ref={nameRef}
          />
        </div>
        {type !== "Delete" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "15px 0",
            }}
          >
            <label>{name} Discription:</label>
            <input
              style={{ height: "3vh", border: "none" }}
              ref={discriptionRef}
            />
          </div>
        )}
        <div className="grayLine" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <button
              style={{
                backgroundColor: "darkcyan",
                cursor: "pointer",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                color: "white",
              }}
              onClick={handleSubmitFunc}
            >
              {type == "Delete"
                ? "I understand the consequences, delete this project"
                : `${type} ${name}`}
            </button>
          </div>
          {showError && (
            <div
              style={{
                color: "darkred",
              }}
            >
              {type === "Delete" ? (
                <>
                  Please type {name}{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {deleteProjectName}
                  </span>{" "}
                  correctly.
                </>
              ) : (
                <>Add {name} Heading and Description</>
              )}
            </div>
          )}
        </div>
        <a
          href="https://github.com/AkhilendreSinghRawat/Akuma-Task-Manager"
          style={{ color: "grey", textDecoration: "none" }}
          target={"_blank"}
        >
          @Akuma Github Link
        </a>
      </div>
    </Modal>
  );
};

const DeleteLabel = ({ name }) => {
  return (
    <>
      <label style={{ marginBottom: "15px" }}>
        This action be <span style={{ fontWeight: "bold" }}>cannot</span>{" "}
        undone. This will permanently delete the{" "}
        <span style={{ fontWeight: "bold" }}>{name}</span> project.
      </label>
      <label style={{ fontSize: "13px" }}>
        Please type the name of the project to confirm.
      </label>
    </>
  );
};

export default CreateNewModal;
