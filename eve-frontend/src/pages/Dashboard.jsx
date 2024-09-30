import React from 'react';
import App from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faSortAlphaAsc, faSortNumericAsc } from '@fortawesome/free-solid-svg-icons';
import UploadExcelPopup from '../components/UploadExcelPopup';

function Dashboard() {
  return (
    <div>
      <main className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-3">
              <div className="card-body">
                <div className="mb-4 d-flex align-items-center">
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Search for file..."
                  />
                  <div className='d-flex align-items-center'>
                    <UploadExcelPopup />
                    <button className="btn btn-danger">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
                <div className='d-flex flex-direction-row mb-2'>
                  <div className='d-flex flex-grow-1 align-items-center'>
                    <p className='mb-0 me-1'>File Name</p>
                    <FontAwesomeIcon icon={faSortAlphaAsc} />
                  </div>
                  <div className='d-flex flex-direction-column align-items-center'>
                    <p className='mb-0'>Updated At</p>
                  <FontAwesomeIcon icon={faSortNumericAsc} className='ms-2' />
                  </div>
                </div>
                <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-grow-1 align-items-center">
                      <input type="checkbox" className="me-2" />
                      <p className='mb-0'>File1.txt</p>
                    </div>
                    <div className='d-flex flex-column align-items-end'>
                      <p className='mb-0 me-3'>30-9-2024</p>
                    </div>
                    <div>
                      <button className="btn btn-primary btn-sm">
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
