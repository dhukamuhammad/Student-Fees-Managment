import React, { useState } from 'react';
import '../../assets/css/Delete.css';

const Delete = ({ onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaErrorVisible, setCaptchaErrorVisible] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
    setCaptchaValue('');
    setCaptchaErrorVisible(false);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    if (captchaValue === '1234') {
      onDelete();
      handleHideModal();
    } else {
      setCaptchaErrorVisible(true);
    }
  };

  const handleChange = (e) => {
    setCaptchaValue(e.target.value);
    setCaptchaErrorVisible(false);
  };

  return (
    <>
      <button
        className="delete-button"
        onClick={handleShowModal}
        style={{ backgroundColor: "#DC3545" }}
      >
        <i className="fa-regular fa-trash-can"></i>
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) handleHideModal(); }}>
          <div className="modal">
            <h2>Enter Captcha</h2>
            <p className='show-massgae'>To delete, please enter "123" in the field below :</p>
            <div className="input-group">
              <input
                type="text"
                id="captchaInput"
                placeholder=" "
                value={captchaValue}
                onChange={handleChange}
              />
              <label htmlFor="captchaInput">Enter 1234</label>
            </div>
            <p className={`error-message ${captchaErrorVisible ? 'visible' : ''}`} style={{ fontSize: "16px" }}>
              Please enter "123" to confirm deletion.
            </p>
            <div className="button-group">

              <button
                className="btn btn-cancel"
                onClick={handleHideModal}

              >
                Cancel
              </button>

              <button
                className="btn btn-delete"
                onClick={handleDelete}
                style={{ backgroundColor: "#3C91E6" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Delete;
