import React from "react";
import styles from "../styles/Footer.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import logoBranca from "../assets/imagens/logo_branca.svg";
import facebook from "../assets/imagens/icone_facebook.svg";
import instagram from "../assets/imagens/icone_instagram.svg";
import twitter from "../assets/imagens/icone_twitter.svg";

const Footer = () => {
  return (
    <div>
      <footer className={`container-fluid bg-dark text-white py-5`}>
        <div className="container">
          <div className="row">
            <div className="col-md-3 mb-4 mb-md-0">
              <img
                src={logoBranca}
                alt="Digital Store Logo Branca"
                style={{ height: 40, marginBottom: 10 }}
              />
              <h5>Digital Store</h5>
              <p className="small">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore.
              </p>
              <div>
                <a href="#" className="text-white me-2">
                  <img src={facebook} alt="Facebook" className={styles.iconeSocial}/>
                </a>
                <a href="#" className="text-white me-2">
                  <img src={instagram} alt="Instagram" className={styles.iconeSocial}/>
                </a>
                <a href="#" className="text-white">
                  <img src={twitter} alt="Twitter" className={styles.iconeSocial} />
                </a>
              </div>
            </div>

            <div className="col-md-3 col-6 mb-4 mb-md-0">
              <h6>Informação</h6>
              <ul className="list-unstyled small">
                {[
                  "Sobre Drip Store",
                  "Segurança",
                  "Wishlist",
                  "Blog",
                  "Trabalhe conosco",
                  "Meus Pedidos",
                ].map((item, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-white text-decoration-none">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-md-3 col-6 mb-4 mb-md-0">
              <h6>Categorias</h6>
              <ul className="list-unstyled small">
                {["Camisetas", "Calças", "Bonés", "Headphones", "Tênis"].map(
                  (item, idx) => (
                    <li key={idx}>
                      <a href="#" className="text-white text-decoration-none">
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="col-md-3">
              <h6>Contato</h6>
              <p className="small mb-1">
                Av. Santos Dumont, 1510 - 1 andar - Aldeota, Fortaleza - CE,
                60150-161
              </p>
              <p className="small mb-1">(85) 3051-3411</p>
            </div>
          </div>
          <hr className="my-4" />
          <div className="text-center small">
            <p>&copy; 2024 Digital Store. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;