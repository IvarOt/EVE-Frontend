import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSortAlphaAsc, faSortNumericAsc, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import UploadExcelPopup from '../components/UploadExcelPopup';

function Dashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleRename = (fileName) => {
    console.log('Rename:', fileName);
  };

  const handleExport = (fileName) => {
    console.log('Export:', fileName);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
                  <th scope="col"><input type="checkbox" className="me-2" /></th>
                  <th scope="col">File Name <FontAwesomeIcon icon={faSortAlphaAsc} /></th>
                  <th scope="col">Last Updated <FontAwesomeIcon icon={faSortNumericAsc} /></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody className='table-group-divider'>
                <tr>
                  <td><input type="checkbox" className="me-2" /></td>
                  <td>File 1</td>
                  <td>30-9-2024</td>
                  <td className='d-flex justify-content-end'>
                    <div className="dropdown" ref={dropdownRef}>
                      <button className="btn btn-link text-black p-0" onClick={() => toggleDropdown(1)}>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                      </button>
                      {dropdownOpen === 1 && (
                        <div className="dropdown-menu show" style={{ position: 'absolute', padding: '5px 10px', width: 'auto', minWidth: '120px' }}>
                          <button className="dropdown-item" onClick={() => handleRename('File 1')}>Rename</button>
                          <button className="dropdown-item" onClick={() => handleExport('File 1')}>Export</button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><input type="checkbox" className="me-2" /></td>
                  <td>File 2</td>
                  <td>30-9-2024</td>
                  <td className='d-flex justify-content-end'>
                    <div className="dropdown" ref={dropdownRef}>
                      <button className="btn btn-link text-black p-0" onClick={() => toggleDropdown(2)}>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                      </button>
                      {dropdownOpen === 2 && (
                        <div className="dropdown-menu show" style={{ position: 'absolute', padding: '5px 10px', width: 'auto', minWidth: '120px' }}>
                          <button className="dropdown-item" onClick={() => handleRename('File 2')}>Rename</button>
                          <button className="dropdown-item" onClick={() => handleExport('File 2')}>Export</button>
                        </div>
                      )}
                    </div>
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
