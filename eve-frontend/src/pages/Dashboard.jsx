import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSortAlphaAsc, faSortNumericAsc, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import UploadExcelPopup from '../components/UploadExcelPopup';
import { api } from '../API/api';

function Dashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [renameFileId, setRenameFileId] = useState(null);
  const [newFileName, setNewFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleRenameClick = (fileId, currentName) => {
    setRenameFileId(fileId);
    setNewFileName(currentName);
  };

  const handleRenameChange = (event) => {
    setNewFileName(event.target.value);
  };

  const handleRenameSubmit = async (fileId) => {
    if (!newFileName) return;

    try {
      const response = await api.renameFile(fileId, newFileName);

      if (response.ok) {
        setFiles((prevFiles) =>
          prevFiles.map((file) =>
            file.id === fileId ? { ...file, name: newFileName } : file
          )
        );
        setRenameFileId(null);
      } else {
        console.error('Error renaming file');
      }
    } catch (error) {
      console.error('Error renaming file', error);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(null);
    }
  };

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await api.getFiles();
      if (response.ok) {
        const data = await response.json();
        setFiles(data);
      } else {
        console.error('Error fetching files');
      }
    } catch (error) {
      console.error('Error fetching files', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectFile = (fileId) => {
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.includes(fileId)
        ? prevSelectedFiles.filter((id) => id !== fileId)
        : [...prevSelectedFiles, fileId]
    );
  };

  const handleDeleteFiles = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete the selected files?');
    if (!confirmDelete) return;

    try {
      for (const fileId of selectedFiles) {
        const response = await api.deleteFile(fileId);

        if (response.ok) {
          setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
        } else {
          console.error('Error deleting file with id:', fileId);
        }
      }

      setSelectedFiles([]);
    } catch (error) {
      console.error('Error deleting files:', error);
    }
  };

  const handleFileUploaded = () => {
    fetchFiles();
  };

  return (
    <main className="container">
      <div className="card mb-3">
        <div className="card-body">
          <div className="mb-4 d-flex flex-column">
            <div className="d-flex flex-row mb-4">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Search for file..."
              />
              <div className="d-flex align-items-center">
                <UploadExcelPopup onFileUploaded={handleFileUploaded} />
                <button className="btn btn-danger" onClick={handleDeleteFiles} disabled={selectedFiles.length === 0}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
            {loading ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <table className="table table-auto table-hover align-middle">
                <thead>
                  <tr>
                    <th scope="col">
                      <input type="checkbox" className="me-2" />
                    </th>
                    <th scope="col">
                      File Name <FontAwesomeIcon icon={faSortAlphaAsc} />
                    </th>
                    <th scope="col">
                      Last Updated <FontAwesomeIcon icon={faSortNumericAsc} />
                    </th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {files.length > 0 ? (
                    files.map((file, index) => (
                      <tr key={file.id}>
                        <td>
                          <input
                            type="checkbox"
                            className="me-2"
                            checked={selectedFiles.includes(file.id)}
                            onChange={() => handleSelectFile(file.id)}
                          />
                        </td>
                        <td>
                          {renameFileId === file.id ? (
                            <input
                              type="text"
                              value={newFileName}
                              onChange={handleRenameChange}
                              onBlur={() => handleRenameSubmit(file.id)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleRenameSubmit(file.id);
                              }}
                              autoFocus
                              className="form-control"
                            />
                          ) : (
                            file.name
                          )}
                        </td>
                        <td>{new Date(file.lastUpdated).toLocaleDateString()}</td>
                        <td className="d-flex justify-content-end">
                          <div className="dropdown" ref={dropdownRef}>
                            <button className="btn btn-link text-black p-0" onClick={() => toggleDropdown(index)}>
                              <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                            {dropdownOpen === index && (
                              <div
                                className="dropdown-menu show"
                                style={{ position: 'absolute', padding: '5px 10px', width: 'auto', minWidth: '120px' }}
                              >
                                <button className="dropdown-item" onClick={() => handleRenameClick(file.id, file.name)}>
                                  Rename
                                </button>
                                <button className="dropdown-item" onClick={() => console.log('Export:', file.name)}>
                                  Export
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No files available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
