import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPlus, faTrash, faEllipsisVertical, faSortAlphaAsc, faSortNumericAsc } from '@fortawesome/free-solid-svg-icons';

function ProductPage() {
  const [products, setProducts] = useState([
    { id: 1, identifier: 'File.x23', lastUpdated: '30-9-2024' },
    { id: 2, identifier: 'File.x24', lastUpdated: '30-9-2024' },
    { id: 3, identifier: 'File.x25', lastUpdated: '30-9-2024' }
  ]);

  const handleRename = (id) => {
    console.log('Rename product with id:', id);
  };

  const handleEdit = (id) => {
    console.log('Edit product with id:', id);
  };

  return (
    <main className="container mt-4">
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>File.x23</h4>
            <div className="d-flex">
              <button className="btn btn-primary me-2">
                <FontAwesomeIcon icon={faDownload} className="text-white" />
              </button>
              <button className="btn btn-primary me-2">
                <FontAwesomeIcon icon={faPlus} className="text-white" />
              </button>
              <button className="btn btn-danger">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>

          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search for a file..."
            />
          </div>

          <table className="table table-auto table-hover align-middle">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Product Identifier <FontAwesomeIcon icon={faSortAlphaAsc} /></th>
                <th scope="col">Last Updated <FontAwesomeIcon icon={faSortNumericAsc} /></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {products.map((product) => (
                <tr key={product.id}>
                  <td><input type="checkbox" className="me-2" /></td>
                  <td>{product.identifier}</td>
                  <td>{product.lastUpdated}</td>
                  <td className="d-flex justify-content-end">
                    <div className="dropdown">
                      <button
                        className="btn btn-link text-black p-0"
                        id={`dropdownMenuButton-${product.id}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby={`dropdownMenuButton-${product.id}`}>
                        <li>
                          <button className="dropdown-item" onClick={() => handleRename(product.id)}>
                            Rename
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item" onClick={() => handleEdit(product.id)}>
                            Edit
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default ProductPage;
