import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPlus, faTrash, faEllipsisVertical, faSortAlphaAsc, faSortNumericAsc } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { getProducts, addProduct, deleteProduct } from '../Services/ProductService';
import { useNavigate } from "react-router-dom";

const Property = ({ product, file }) => {
  const navigate = useNavigate();
  const loadEditPage = () => {
    navigate("/editpage", {state: { product, file }});
  }
  return (
    <div>
      <button onClick={loadEditPage}>
        {product.id}
      </button>
    </div>
  )

}
export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const data = location.state || {};
  const { file } = data;
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const retreiveProducts = async () => {
      const data = await getProducts(file.id);
      setProducts(data);
    }
    retreiveProducts();
  }, []);

  const handleAddProduct = () => {
    addProduct(file.id);
  }

  const handleDeleteProducts = () => {
    for (const productId of selectedProducts) {
      deleteProduct(productId);
    }
    setSelectedProducts([]);
  }

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.includes(productId)
        ? prevSelectedProducts.filter((id) => id !== productId)
        : [...prevSelectedProducts, productId]
    );
  };

  if (products) {
    return (
      <main className="container mt-4">
        <div className="card mb-3">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4>{file.name}</h4>
              <div className="d-flex">
                <button className="btn btn-primary me-2">
                  <FontAwesomeIcon icon={faDownload} className="text-white" />
                </button>
                <button className="btn btn-primary me-2" onClick={handleAddProduct}>
                  <FontAwesomeIcon icon={faPlus} className="text-white" />
                </button>
                <button className="btn btn-danger" onClick={handleDeleteProducts}>
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
                    <td><input type="checkbox" className="me-2" onChange={() => handleSelectProduct(product.id)} /> </td>
                    <td><Property product={product} file={file}/></td>
                    <td>{product.lastUpdated}</td>
                    <td className="d-flex justify-content-end">
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
}

