import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faSortAlphaAsc, faSortNumericAsc } from '@fortawesome/free-solid-svg-icons';
import UploadExcelPopup from '../components/UploadExcelPopup';

function Dashboard() {
  return (
    <main className="container">
      <div className="card mb-3">
        <div className="card-body">
          <div className="mb-4 d-flex flex-column">
            <div className='d-flex flex-row mb-4'>
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
            <table className="table table-auto table-hover align-middle">
              <thead>
                <tr>
                  <th scope="col"> <input type="checkbox" className="me-2" /></th>
                  <th scope="col">File Name <FontAwesomeIcon icon={faSortAlphaAsc}/></th>
                  <th scope="col">Last Updated <FontAwesomeIcon icon={faSortNumericAsc}/></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody className='table-group-divider'>
                <tr>
                  <td><input type="checkbox" className="me-2" /> </td>
                  <td>File 1</td>
                  <td >30-9-2024</td>
                  <td className='d-flex justify-content-end'>
                    <button className="btn btn-primary btn-sm">
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td><input type="checkbox" className="me-2" /> </td>
                  <td>File 2</td>
                  <td >30-9-2024</td>
                  <td className='d-flex justify-content-end'>
                    <button className="btn btn-primary btn-sm">
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
