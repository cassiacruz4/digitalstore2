import React, { useState } from 'react';
import styles from "../styles/Pagamento.module.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import tenisnikerevolution from "../assets/imagens/tenisnikerevolution.png"

const Pagamento = () => {
 return(
<>
    <main className="container-fluid" style={{marginTop: "90px"}}>
        <div className="container">
            <h2 className="mb-4 ps-2"><strong>Finalizar Compra</strong></h2>

            <div className="row">
                {/* <!-- Coluna Esquerda - Formulários --> */}
                <div className="col-lg-8">
                    {/* <!-- Informações Pessoais --> */}
                    <div className="section-bg">
                        <h6 className="mb-3">Informações Pessoais</h6>
                        <hr/>
                        
                        <div className="mb-3">
                            <label htmlFor="nome" className="form-label"><strong>Nome Completo*</strong></label>
                            <input type="text" className="form-control" id="nome" name="nome" placeholder="Insira seu nome"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="cpf" className="form-label"><strong>CPF*</strong></label>
                            <input type="text" className="form-control" id="cpf" name="cpf" placeholder="Insira seu CPF"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label"><strong>E-mail*</strong></label>
                            <input type="email" className="form-control" id="email" name="email" placeholder="Insira seu email"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="celular" className="form-label"><strong>Celular*</strong></label>
                            <input type="text" className="form-control" id="celular" name="celular" placeholder="Insira seu celular"/>
                        </div>
                    </div>

                    {/* <!-- Informações de Entrega --> */}
                    <div className="section-bg">
                        <h6 className="mb-3">Informações de Entrega</h6>
                        <hr/>

                        <div className="mb-3">
                            <label htmlFor="endereco" className="form-label"><strong>Endereço*</strong></label>
                            <input type="text" className="form-control" id="endereco" name="endereco" placeholder="Insira seu endereço"/>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="bairro" className="form-label"><strong>Bairro*</strong></label>
                                    <input type="text" className="form-control" id="bairro" name="bairro" placeholder="Insira seu bairro"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="cidade" className="form-label"><strong>Cidade*</strong></label>
                                    <input type="text" className="form-control" id="cidade" name="cidade" placeholder="Insira sua cidade"/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="cep" className="form-label"><strong>CEP*</strong></label>
                                    <input type="text" className="form-control" id="cep" name="cep" placeholder="Insira seu CEP"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="complemento" className="form-label"><strong>Complemento</strong></label>
                                    <input type="text" className="form-control" id="complemento" name="complemento" placeholder="Insira complemento"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Informações de Pagamento --> */}
                    <div className="section-bg">
                        <h6 className="mb-3">Informações de Pagamento</h6>
                        <hr/>

                        <div className="mb-4">
                            <p><strong>Forma de Pagamento</strong></p>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="formaPagamento" id="cartao" value="cartao"/>
                                <label className="form-check-label" htmlFor="cartao">Cartão de Crédito</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="formaPagamento" id="boleto" value="boleto"/>
                                <label className="form-check-label" htmlFor="boleto">Boleto Bancário</label>
                            </div>
                        </div>

                        <div id="dadosCartao">
                            <div className="mb-3">
                                <label htmlFor="nomeCartao" className="form-label"><strong>Nome do Cartão*</strong></label>
                                <input type="text" className="form-control" id="nomeCartao" name="nomeCartao" placeholder="Insira o nome do seu cartão"/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="numeroCartao" className="form-label"><strong>Número do Cartão*</strong></label>
                                <input type="text" className="form-control" id="numeroCartao" name="numeroCartao" placeholder="Insira o número do seu cartão"/>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="dataCartao" className="form-label"><strong>Data de Validade*</strong></label>
                                        <input type="text" className="form-control" id="dataCartao" name="dataCartao" placeholder="MM/AA"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="cvv" className="form-label"><strong>CVV*</strong></label>
                                        <input type="text" className="form-control" id="cvv" name="cvv" placeholder="CVV"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Finalizar Compra - Mobile --> */}
                    <div className="section-bg d-lg-none">
                        <h6 className="mb-3">Finalizar Compra</h6>
                        <hr/>
                        
                        <div className="text-center mb-3">
                            <h5>Total</h5>
                            <h2 className="total-price">R$ 219,00</h2>
                            <p className="text-muted">ou 10x de R$ 21,00 sem juros</p>
                        </div>

                        <button type="button" className="btn btn-primary w-100" style={{height: "50px"}}>
                            Realizar Pagamento
                        </button>
                    </div>
                </div>

                {/* <!-- Coluna Direita - Resumo --> */}
                <div className="col-lg-4">
                    <div className="section-bg sticky-top" style={{top: "110px"}}>
                        <h5 className="mb-4">Resumo</h5>

                        <div className="d-flex mb-4">
                            <div className="me-3">
                                <img src={tenisnikerevolution} alt="Tênis Nike Air Force 1" 
                                     className="img-fluid" style={{width: "80px", height:"80px", objectFit: "cover", borderRadius: "8px"}}/>
                            </div>
                            <div className="flex-grow-1">
                                <h6 className="mb-2">Tênis Nike Air Force 1 '07</h6>
                                <small className="text-muted">Branco/Vermelho</small>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between mb-2">
                            <span>Subtotal:</span>
                            <span>R$ 219,00</span>
                        </div>

                        <div className="d-flex justify-content-between mb-2">
                            <span>Frete:</span>
                            <span className="text-success">R$ 0,00</span>
                        </div>

                        <div className="d-flex justify-content-between mb-3">
                            <span>Desconto:</span>
                            <span className="text-success">- R$ 30,00</span>
                        </div>

                        <hr/>

                        <div className="d-flex justify-content-between mb-2">
                            <h5>Total</h5>
                            <h5 className="total-price">R$ 189,00</h5>
                        </div>
                        
                        <p className="text-muted text-lg-end mb-4">ou 10x de R$ 18,90 sem juros</p>

                        <button type="button" className="btn btn-primary w-100 d-none d-lg-block" style={{height: "50px",backgroundColor:"rgba(246, 170, 28, 1)",border:"0px"}}>
                            Realizar Pagamento
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>

</>
  
)}

export default Pagamento