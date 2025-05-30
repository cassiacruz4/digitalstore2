import React, { useState } from "react";
import styles from "../styles/Compraestilo.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/imagens/logo.svg";
import carrinho from "../assets/imagens/icone_carrinho.svg";
import estrela from "../assets/imagens/estrelas3.png";
import papete from "../assets/imagens/papete.png";
import papete3 from "../assets/imagens/papete3.png";
import bola1 from "../assets/imagens/bola.png";
import bola2 from "../assets/imagens/bola2.png";
import bola3 from "../assets/imagens/bola3.png";
import bola4 from "../assets/imagens/bola4.png";
import logoBranca from "../assets/imagens/logo_branca.svg";
import facebook from "../assets/imagens/icone_facebook.svg";
import instagram from "../assets/imagens/icone_instagram.svg";
import twitter from "../assets/imagens/icone_twitter.svg";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const Compra = ({ onAddToCart }) => {
  const [papeteBgColor, setPapeteBgColor] = useState(null);

  const miniColors = ["#e2e3ff", "#ffe8bc", "#ffc0bc", "#dec699", "#e8dfcf"];

  const [selectedSize, setSelectedSize] = useState(null);

  const [selectedColor, setSelectedColor] = useState(null);

  const { addToCart } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Tamanho selecionado:", selectedSize);
  }, [selectedSize]);

  useEffect(() => {
    console.log("Cor selecionada:", selectedColor);
  }, [selectedColor]);

  return (
    <div className={styles.background}>
      <main>
        <div className={styles.tudo}>
          <div className={styles.papetecontainer}>
            <div className={styles.ladoesquerdo}>
              <div className={styles.minimenu}>
                <h5>
                  <a className={styles.home} href="">
                    Home
                  </a>
                </h5>
                <h4>/</h4>
                <h5>
                  <a className={styles.produtos} href="">
                    Produtos
                  </a>
                </h5>
                <h4>/</h4>
                <h5>Tênis</h5>
                <h4>/</h4>
                <h5>Nike</h5>
                <h4>/</h4>
                <h5>Tênis Nike Revolution 6 Next Nature Masculino</h5>
              </div>

              <div
                className={styles.papetedoseninha}
                style={{ backgroundColor: papeteBgColor }}
              >
                <h1 className={styles.esquerda}>&lt;</h1>
                <img src={papete} className={styles.papetenis} alt="papete" />
                <h1 className={styles.direita}>&gt;</h1>
              </div>

              <div className={styles.miniatura}>
                {miniColors.map((color, idx) => (
                  <img
                    key={idx}
                    src={papete}
                    alt={`mini${idx + 1}`}
                    className={styles.minisapato}
                    onClick={() => setPapeteBgColor(color)}
                  />
                ))}
              </div>

              <div className={styles.iniciocatalogo}>
                <h1 className={styles.prod}>Produtos Relacionados</h1>
                <h3 className={styles.vermais}>Ver todos &rarr;</h3>
              </div>

              <div className={styles.catalogo2}>
                {[1, 2, 3, 4].map((item, idx) => (
                  <div className={styles.alinhado1} key={idx}>
                    <div className={styles.sobrepor}>
                      <img
                        src={papete3}
                        alt={`Tênis ${item}`}
                        className={styles[`vertical${item}`]}
                      />
                      <p className={styles.superpromo}>30% OFF</p>
                    </div>
                    <div
                      className={item === 1 ? styles.cltenis1 : styles.cltenis2}
                    >
                      <p>Tênis</p>
                      <h3>K-Swiss V8 - Masculino</h3>
                      <div className={styles.precosapato}>
                        <p className={styles.traçado1}>$200</p>
                        <p className={styles.corpreco}>$100</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.tudov2}>
              <div className={styles.todotexto}>
                <div className={styles.nomes}>
                  <h2 className={styles.nomeclatura}>
                    Tênis Nike Revolution 6 Next Nature Masculino
                  </h2>
                  <h4 className={styles.outros}>
                    Casual | Nike | REF: 38416711
                  </h4>
                  <img src={estrela} className={styles.este} alt="estrela" />
                </div>

                <div className={styles.precocontainer}>
                  <h4 className={styles.cifra}>R$</h4>
                  <h3 className={styles.valor}>219</h3>
                  <h3 className={styles.virgulakkkk}>,</h3>
                  <h3 className={styles.doublezero}>00</h3>
                  <h4 className={styles.antigo}>219,00</h4>
                </div>

                <div className={styles.descproduto}>
                  <h3 className={styles.descricao}>Descrição do produto</h3>
                  <h3 className={styles.desctexto}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </h3>
                </div>

                <div className={styles.tamanhocontainer}>
                  <h3 className={styles.tamanho}>Tamanho</h3>
                  <div className={styles.tamanhocaixa}>
                    {[39, 40, 41, 42, 43].map((tam) => (
                      <h3
                        key={tam}
                        className={`${selectedSize == tam ? styles.ativo : ""}`}
                        onClick={() => setSelectedSize(tam)}
                      >
                        {tam}
                      </h3>
                    ))}
                  </div>

                  <div className={styles.corbola}>
                    <h3 className={styles.eraprasercor}>Tamanho</h3>
                    {[bola1, bola2, bola3, bola4].map((img, idx) => (
                      <span
                        key={idx}
                        className={styles.bolafunc}
                        onClick={() => setSelectedColor(idx)}
                      >
                        <img
                          src={img}
                          alt={`bolinha${idx + 1}`}
                          className={`${styles[`bola${idx + 1}`]} ${
                            selectedColor === idx ? styles.bordaSelecionada : ""
                          }`}
                        />
                      </span>
                    ))}
                    <div className={styles.botaocompra}>
                      <button
                        className={styles.compra}
                        onClick={() => {
                          if (selectedSize === null || selectedColor === null) {
                            alert(
                              "Por favor, selecione um tamanho e uma cor antes de comprar."
                            );
                            return;
                          }

                          const produto = {
                            id: 1,
                            nome: "Tênis Nike Revolution 6 Next Nature Masculino",
                            preco: 219,
                            tamanho: selectedSize,
                            cor: selectedColor,
                            imagem: papete,
                          };

                          addToCart(produto);
                        }}
                      >
                        COMPRAR
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Compra;
