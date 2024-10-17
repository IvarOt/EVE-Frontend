import React, { useState, useEffect } from 'react';
import { api } from '../API/api';

function Editpage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 1;
  const excelId = 46;

  const fetchObjectsWithProperties = async () => {
    setLoading(true);
    try {
      const response = await api.get(`${excelId}/Object`);
      const objects = await response.json();

      setData(objects);
    } catch (error) {
      console.error('Error fetching objects:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchObjectsWithProperties();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const getPaginationNumbers = () => {
    const paginationNumbers = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - 2);

    if (totalPages > maxVisible) {
      if (startPage + maxVisible - 1 > totalPages) {
        startPage = totalPages - maxVisible + 1;
      }
      if (startPage < 1) {
        startPage = 1;
      }
    }

    for (let i = 0; i < maxVisible && startPage <= totalPages; i++, startPage++) {
      paginationNumbers.push(startPage);
    }
    return paginationNumbers;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setInputPage('');
    }
  };

  const handleInputPageChange = (event) => {
    setInputPage(event.target.value);
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber)) {
      handlePageChange(pageNumber);
    }
  };

  const handleSave = () => {
    alert('Changes saved!');
  };

  return (
    <div className="d-flex flex-column">
      <main className="container flex-fill">
        <div className="card mb-3">
          <div className="card-body overflow-auto" style={{ maxHeight: '75vh', minHeight: '75vh' }}>
            {/* Loading state or data display */}
            {loading ? (
              <div>Loading...</div>
            ) : (
              currentItems.map((object, cardIndex) => (
                <div key={cardIndex} className="mb-4">
                  <div className="card-body">
                    {object.excelProperties.map((property, index) => (
                      <div className="mb-3" key={index}>
                        <label className="form-label">{property.name}</label>
                        <input
                          type="text"
                          className="form-control"
                          value={property.value}
                          readOnly
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <footer className="footer text-center text-lg-start py-3">
        <div className="container-fluid d-flex flex-column align-items-center">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="me-3">
              Total {data.length} products
            </div>
            <nav>
              <ul className="pagination mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                    Previous
                  </button>
                </li>
                {getPaginationNumbers().map((pageNumber) => (
                  <li className={`page-item ${currentPage === pageNumber ? 'active' : ''}`} key={pageNumber}>
                    <button className="page-link" onClick={() => handlePageChange(pageNumber)}>
                      {pageNumber}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
            <div className="d-flex align-items-center ms-3">
              <span className="me-2">Go to:</span>
              <input
                type="number"
                className="form-control me-2 w-25"
                value={inputPage}
                onChange={handleInputPageChange}
                placeholder="Page"
              />
              <button className="btn btn-primary me-2" onClick={handleGoToPage}>Go</button>
              <button className="btn btn-success" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Editpage;
