import React from 'react';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
  return (
    <div className="container-fluid">
      <header className="bg-primary text-white py-3 mb-4">
        <h1 className="text-center">Dashboard</h1>
      </header>
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
                    <App />
                  <button className="btn btn-danger">
                    <FontAwesomeIcon icon={faTrash} /> 
                  </button>
                </div>
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <input type="checkbox" className="me-2" />
                      File1.txt
                    </div>
                    <div>
                      <button className="btn btn-primary btn-sm">
                        <FontAwesomeIcon icon={faPenToSquare} /> 
                      </button>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <input type="checkbox" className="me-2" />
                      File2.txt
                    </div>
                    <div>
                      <button className="btn btn-primary btn-sm">
                        <FontAwesomeIcon icon={faPenToSquare} /> 
                      </button>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <input type="checkbox" className="me-2" />
                      File3.txt
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
