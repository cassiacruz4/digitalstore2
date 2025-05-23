import React from 'react'
import styles from "../styles/Home.module.css";
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

const Home = () => {
  return (
    <div>
 <> 
    
    <section className="container my-5">
        <div className="row banner-principal align-items-center">
            
            <div className="col-md-6 text-start">
                <h6 className="text-warning fw-bold">Melhores ofertas personalizadas</h6>
                <h1 className="fw-bold">Queima de estoque Nike 🔥</h1>
                    <p className="lead my-3">
                        Consequat culpa exercitation mollit nisi excepteur do do tempor laboris eiusmod irure
                        consectetur
                    </p>
                    <a href="#" className="btn btn-danger btn-lg">Ver Ofertas</a>
            </div>

            
            <div className="col-md-6 text-center">
                <img src="White-Sneakers-PNG-Clipart 1.svg" className="img-fluid" alt="Queima de Estoque Nike"/>
            </div>
        </div>
    </section>

    
    <section className="container my-5">
        <h2 className="mb-4">Coleções em destaque</h2>
        <div className="row">
            
            <div className="col-md-4 mb-4">
                <div className="p-3 rounded-4 shadow-sm" style= {{backgroundColor:"#e6f0ff"}}>
                    <span className="badge destaque-off mb-2">30% OFF</span>
                    <h5 className="fw-bold">Novo drop Supreme</h5>
                    <img src="Camisa.svg" className="img-fluid my-3 d-block mx-auto" alt="Novo drop Supreme"/>
                    <div className="text-start">
                        <a href="#" className="btn botao-comprar">Comprar</a>
                    </div>
                </div>
            </div>

            
            <div className="col-md-4 mb-4">
                <div className="p-3 rounded-4 shadow-sm" style={{backgroundColor: "#e6f0ff"}}>
                    <span className="badge destaque-off mb-2">30% OFF</span>
                    <h5 className="fw-bold">Coleção Adidas</h5>
                    <img src="Tenis Nike.svg" className="img-fluid my-3 d-block mx-auto" alt="Coleção Adidas"/>
                    <div className="text-start">
                        <a href="#" className="btn botao-comprar">Comprar</a>
                    </div>
                </div>
            </div>

          
            <div className="col-md-4 mb-4">
                <div className="p-3 rounded-4 shadow-sm" style={{backgroundColor: "#e6f0ff"}}>
                    <span className="badge destaque-off mb-2">30% OFF</span>
                    <h5 className="fw-bold">Novo Beats Bass</h5>
                    <img src="fone.svg" className="img-fluid my-3 d-block mx-auto" alt="Novo Beats Bass"/>
                    <div className="text-start">
                        <a href="#" className="btn botao-comprar">Comprar</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section className="container my-5">
        <h2 className="text-center mb-4">Coleções em destaque</h2>
        <div className="row justify-content-center">
           
            <div className="col-6 col-md-4 col-lg-2 mb-3 text-center">
                <a href="#" className="text-decoration-none text-dark">
                    <div className="category-item">
                        <img src="Camisetas.svg" className="img-fluid" alt="Camisetas"/>
                    </div>
                </a>
            </div>
            
            <div className="col-6 col-md-4 col-lg-2 mb-3 text-center">
                <a href="#" className="text-decoration-none text-dark">
                    <div className="category-item">
                        <img src="calcas.svg" className="img-fluid" alt="Calças"/>
                    </div>
                </a>
            </div>
            
            <div className="col-6 col-md-4 col-lg-2 mb-3 text-center">
                <a href="#" className="text-decoration-none text-dark">
                    <div className="category-item">
                        <img src="bones.svg" className="img-fluid" alt="Bonés"/>
                    </div>
                </a>
            </div>
           
            <div className="col-6 col-md-4 col-lg-2 mb-3 text-center">
                <a href="#" className="text-decoration-none text-dark">
                    <div className="category-item">
                        <img src="headphones.svg" className="img-fluid" alt="Headphones"/>
                    </div>
                </a>
            </div>
           
            <div className="col-6 col-md-4 col-lg-2 mb-3 text-center">
                <a href="#" className="text-decoration-none text-dark">
                    <div className="category-item">
                        <img src="tenis.svg" className="img-fluid" alt="Tênis"/>
                    </div>
                </a>
            </div>
        </div>
    </section>
    
    <section className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Produtos em alta</h2>
            <a href="#" className="btn btn-outline-primary">Ver todos</a>
        </div>
        <div className="row">
            
            <div className="col-6 col-md-4 col-lg-3 mb-4">
                <div className="card h-100 shadow-sm product-card">
                    <span className="badge bg-danger position-absolute top-0 start-0 m-2">30% OFF</span>
                    <img src="tenis em alta.svg" className="card-img-top p-2" alt="Produto em Alta 1"/>
                    <div className="card-body d-flex flex-column">
                        <h6 className="card-subtitle mb-2 text-muted">Tênis</h6>
                        <h5 className="card-title flex-grow-1">K-Swiss V8-Masculino</h5>
                        <div>
                            <span className="text-decoration-line-through text-muted">$200</span>
                            <span className="fw-bold fs-5 ms-1">$100</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="col-6 col-md-4 col-lg-3 mb-4">
                <div className="card h-100 shadow-sm product-card">
                    <span className="badge bg-danger position-absolute top-0 start-0 m-2">30% OFF</span>
                    <img src="tenis em alta.svg" className="card-img-top p-2" alt="Produto em Alta 2"/>
                    <div className="card-body d-flex flex-column">
                        <h6 className="card-subtitle mb-2 text-muted">Tênis</h6>
                        <h5 className="card-title flex-grow-1">K-Swiss V8-Masculino</h5>
                        <div>
                            <span className="text-decoration-line-through text-muted">$200</span>
                            <span className="fw-bold fs-5 ms-1">$100</span>
                        </div>
                    </div>
                </div>
            </div>
          
            <div className="col-6 col-md-4 col-lg-3 mb-4">
                <div className="card h-100 shadow-sm product-card">
                    <img src="tenis em alta.svg" className="card-img-top p-2" alt="Produto em Alta 3"/>
                    <div className="card-body d-flex flex-column">
                        <h6 className="card-subtitle mb-2 text-muted">Tênis</h6>
                        <h5 className="card-title flex-grow-1">K-Swiss V8-Masculino</h5>
                        <div>
                            <span className="fw-bold fs-5 ms-1">$200</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="col-6 col-md-4 col-lg-3 mb-4">
                <div className="card h-100 shadow-sm product-card">
                    <span className="badge bg-danger position-absolute top-0 start-0 m-2">30% OFF</span>
                    <img src="tenis em alta.svg" className="card-img-top p-2" alt="Produto em Alta 4"/>
                    <div className="card-body d-flex flex-column">
                        <h6 className="card-subtitle mb-2 text-muted">Tênis</h6>
                        <h5 className="card-title flex-grow-1">K-Swiss V8-Masculino</h5>
                        <div>
                            <span className="text-decoration-line-through text-muted">$200</span>
                            <span className="fw-bold fs-5 ms-1">$100</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="col-6 col-md-4 col-lg-3 mb-4">
                <div className="card h-100 shadow-sm product-card">
                    <img src="tenis em alta.svg" className="card-img-top p-2" alt="Produto em Alta 5"/>
                    <div className="card-body d-flex flex-column">
                        <h6 className="card-subtitle mb-2 text-muted">Tênis</h6>
                        <h5 className="card-title flex-grow-1">K-Swiss V8-Masculino</h5>
                        <div>
                            <span className="text-decoration-line-through text-muted">$200</span>
                            <span className="fw-bold fs-5 ms-1">$100</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="col-6 col-md-4 col-lg-3 mb-4">
                <div className="card h-100 shadow-sm product-card">
                    <span className="badge bg-danger position-absolute top-0 start-0 m-2">30% OFF</span>
                    <img src="tenis em alta.svg" className="card-img-top p-2" alt="Produto em Alta 6"/>
                    <div className="card-body d-flex flex-column">
                        <h6 className="card-subtitle mb-2 text-muted">Tênis</h6>
                        <h5 className="card-title flex-grow-1">K-Swiss V8-Masculino</h5>
                        <div>
                            <span className="text-decoration-line-through text-muted">$200</span>
                            <span className="fw-bold fs-5 ms-1">$100</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="col-6 col-md-4 col-lg-3 mb-4">
                <div className="card h-100 shadow-sm product-card">
                    <img src="tenis em alta.svg" className="card-img-top p-2" alt="Produto em Alta 7"/>
                    <div className="card-body d-flex flex-column">
                        <h6 className="card-subtitle mb-2 text-muted">Tênis</h6>
                        <h5 className="card-title flex-grow-1">K-Swiss V8-Masculino</h5>
                        <div>
                            <span className="fw-bold fs-5 ms-1">$150</span>
                        </div>
                    </div>
                </div>
            </div>
         
            <div className="col-6 col-md-4 col-lg-3 mb-4">
                <div className="card h-100 shadow-sm product-card">
                    <span className="badge bg-danger position-absolute top-0 start-0 m-2">10% OFF</span>
                    <img src="tenis em alta.svg" className="card-img-top p-2" alt="Produto em Alta 8"/>
                    <div className="card-body d-flex flex-column">
                        <h6 className="card-subtitle mb-2 text-muted">Tênis</h6>
                        <h5 className="card-title flex-grow-1">K-Swiss V8-Masculino</h5>
                        <div>
                            <span className="text-decoration-line-through text-muted">$250</span>
                            <span className="fw-bold fs-5 ms-1">$225</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
   
    <section className="container-fluid bg-light py-5">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <img src="air_jordan_especial.svg" className="img-fluid rounded shadow"
                        alt="Air Jordan Edição de Colecionador"/>
                </div>
                <div className="col-md-6 mt-4 mt-md-0">
                    <h2 className="display-6 fw-bold">Oferta especial</h2>
                    <h3 className="fw-normal">Air Jordan edição de colecionador</h3>
                    <p className="my-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip.</p>
                    <a href="#" className="btn btn-primary btn-lg">Ver Oferta</a>
                </div>
            </div>
        </div>
    </section>
    
 
 </>
    </div>
  )
}

export default Home
