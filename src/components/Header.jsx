import React from "react";
import styles from "../styles/Header.module.css";
import logo from "../assets/imagens/logo.svg";
import carrinho from "../assets/imagens/icone_carrinho.svg";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  return (
    <div className={styles.background}>
      <header className={`container-fluid p-3 ${styles.headerWhite}`}>
        <div className="container">
          <div className="row align-items-center mb-3">
            <div className="col-md-4 col-12 text-center text-md-start d-flex align-items-center justify-content-center justify-content-md-start">
              <img
                src={logo}
                alt="Digital Store Logo"
                style={{ height: 40, marginRight: 10 }}
              />
              <h1 className="h4 mb-0">
                <a href="/" className="text-decoration-none text-dark">
                  Digital Store
                </a>
              </h1>
            </div>

            <div className="col-md-5 col-12 mt-2 mt-md-0">
              <form className="d-flex">
                <input
                  className={`form-control me-2 ${styles.searchInput}`}
                  type="search"
                  placeholder="Pesquisar produto..."
                  aria-label="Pesquisar"
                />
                <button
                  className={`btn ${styles.btnPesquisarPink}`}
                  type="submit"
                >
                  Pesquisar
                </button>
              </form>
            </div>

            <div className="col-md-3 col-12 text-center text-md-end mt-2 mt-md-0">
              <a href="#" className="text-decoration-none text-dark me-2">
                Cadastre-se
              </a>
              <a href="#" className="text-decoration-none text-dark">
                Entrar
              </a>
              <a
                href="Compra.html"
                className="text-decoration-none text-dark ms-3"
              >
                <img src={carrinho} alt="Carrinho" width="24" />
              </a>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <nav className="navbar navbar-expand-lg">
                <button
                  className="navbar-toggler ms-auto"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse justify-content-center"
                  id="navbarNav"
                >
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="/"
                      >
                        Home
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Produtos
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Categorias
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Meus Pedidos
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
