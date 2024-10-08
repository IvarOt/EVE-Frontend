import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

function UploadExcelPopup() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const fileInputRef = useRef(null);

  const modalRef = useRef(null);

  useEffect(() => {
    const modalElement = document.getElementById("excelImportPopUp");
    modalRef.current = new window.bootstrap.Modal(modalElement);

    return () => {
      modalRef.current = null;
    };
  }, []);

  const handleShow = () => {
    setSelectedFile(null);
    setSelectedFileName("");
    modalRef.current.show();
  };

  const handleClose = () => {
    modalRef.current.hide();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedFileName(file.name);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const uploadFile = () => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
      handleClose();
      setTimeout(() => {
        alert("File successfully uploaded");
      }, 300);
    } else {
      alert("No file selected for upload");
    }
  };

  return (
    <div className="App">
      <button type="button" className="btn btn-primary me-1" onClick={handleShow}>
        <FontAwesomeIcon icon={faUpload} />
      </button>

      <div
        className="modal fade"
        id="excelImportPopUp"
        tabIndex="-1"
        aria-labelledby="excelImportPopUpLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-4" id="excelImportPopUpLabel">
                Import Excel Form
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body p-4">
              <h2 className="mb-3" style={{ fontWeight: "bold" }}>
                Import excel form
              </h2>
              <p>Click the button below to upload an Excel file</p>
              <div className="upload-section d-flex justify-content-center align-items-center p-4 rounded">
                <div className="text-center">
                  <button type="button" className="btn" onClick={triggerFileInput}>
                    <i className="fa-solid fa-upload"></i>
                    <p className="icon-text m-t-5 fs-6">{selectedFileName || "Select Excel File"}</p>
                  </button>

                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept=".xlsx"
                    onChange={handleFileSelect}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer justify-content-between">
              <button
                type="button"
                className="btn btn-secondary flex-grow-1"
                onClick={handleClose}
              >
                Close
              </button>

              <button type="button" className="btn btn-primary flex-grow-1" onClick={uploadFile}>
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadExcelPopup;