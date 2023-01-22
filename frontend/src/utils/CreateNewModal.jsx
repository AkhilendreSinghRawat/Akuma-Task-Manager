import React from 'react'
import Modal from 'react-modal'
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'lightblue',
    width: '20vw',
  },
}
Modal.setAppElement(document.getElementById('root'))
const CreateNewModal = ({
  isOpen,
  onClose,
  nameRef,
  discriptionRef,
  handleSubmit,
  showError,
  name,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 'bold', userSelect: 'none' }}>
            New {name}
          </div>
          <div
            style={{
              fontWeight: 'bold',
              userSelect: 'none',
              cursor: 'pointer',
            }}
            onClick={onClose}
          >
            X
          </div>
        </div>
        <div className="grayLine" />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '15px 0',
          }}
        >
          <label>{name} Name:</label>
          <input style={{ height: '3vh', border: 'none' }} ref={nameRef} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '15px 0',
          }}
        >
          <label>{name} Discription:</label>
          <input
            style={{ height: '3vh', border: 'none' }}
            ref={discriptionRef}
          />
        </div>
        <div className="grayLine" />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div>
            <button
              style={{
                backgroundColor: 'darkcyan',
                cursor: 'pointer',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                color: 'white',
              }}
              onClick={handleSubmit}
            >
              Create {name}
            </button>
          </div>
          {showError && (
            <div
              style={{
                color: 'darkred',
              }}
            >
              Add {name} Name and Description
            </div>
          )}
        </div>
        <a
          href="https://github.com/AkhilendreSinghRawat/Akuma-Task-Manager"
          style={{ color: 'grey', textDecoration: 'none' }}
          target={'_blank'}
        >
          @Akuma Github Link
        </a>
      </div>
    </Modal>
  )
}

export default CreateNewModal
