import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-black box-shadow mb-3">
      <div className="container-fluid">
        <a className="navbar-brand" href="/" style={{ color: 'white' }}>
        <FontAwesomeIcon icon={faHome} />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
          <ul className="navbar-nav flex-grow-1">
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <span className="nav-link text-white">Welcome!</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    )
}

export default Navbar

