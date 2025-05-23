import React, { useState } from 'react';
import styles from "../styles/Pagamento.module.css"

const DripStoreCheckout = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    celular: '',
    endereco: '',
    bairro: '',
    cidade: '',
    cep: '',
    complemento: '',
    formaPagamento: 'cartao',
    nomeCartao: '',
    numeroCartao: '',
    dataCartao: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Aplicar máscaras
    if (name === 'cpf') {
      formattedValue = value.replace(/\D/g, '');
      formattedValue = formattedValue.replace(/(\d{3})(\d)/, '$1.$2');
      formattedValue = formattedValue.replace(/(\d{3})(\d)/, '$1.$2');
      formattedValue = formattedValue.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else if (name === 'celular') {
      formattedValue = value.replace(/\D/g, '');
      formattedValue = formattedValue.replace(/(\d{2})(\d)/, '($1) $2');
      formattedValue = formattedValue.replace(/(\d{5})(\d)/, '$1-$2');
    } else if (name === 'cep') {
      formattedValue = value.replace(/\D/g, '');
      formattedValue = formattedValue.replace(/(\d{5})(\d)/, '$1-$2');
    } else if (name === 'numeroCartao') {
      formattedValue = value.replace(/\D/g, '');
      formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    } else if (name === 'dataCartao') {
      formattedValue = value.replace(/\D/g, '');
      formattedValue = formattedValue.replace(/(\d{2})(\d)/, '$1/$2');
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setFormData(prev => ({
      ...prev,
      formaPagamento: e.target.value
    }));
  };

  const handleSubmit = () => {
    console.log('Dados do formulário:', formData);
    alert('Pagamento realizado com sucesso!');
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Finalizar Compra</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna Esquerda - Formulários */}
            <div className="lg:col-span-2 space-y-6">
              {/* Informações Pessoais */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h6 className="text-lg font-medium mb-4 text-gray-800">Informações Pessoais</h6>
                <hr className="mb-4" />
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo*
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Insira seu nome"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CPF*
                    </label>
                    <input
                      type="text"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Insira seu CPF"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail*
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Insira seu email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Celular*
                    </label>
                    <input
                      type="text"
                      name="celular"
                      value={formData.celular}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Insira seu celular"
                    />
                  </div>
                </div>
              </div>

              {/* Informações de Entrega */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h6 className="text-lg font-medium mb-4 text-gray-800">Informações de Entrega</h6>
                <hr className="mb-4" />

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Endereço*
                    </label>
                    <input
                      type="text"
                      name="endereco"
                      value={formData.endereco}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Insira seu endereço"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bairro*
                      </label>
                      <input
                        type="text"
                        name="bairro"
                        value={formData.bairro}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Insira seu bairro"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cidade*
                      </label>
                      <input
                        type="text"
                        name="cidade"
                        value={formData.cidade}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Insira sua cidade"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CEP*
                      </label>
                      <input
                        type="text"
                        name="cep"
                        value={formData.cep}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Insira seu CEP"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Complemento
                      </label>
                      <input
                        type="text"
                        name="complemento"
                        value={formData.complemento}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Insira complemento"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Informações de Pagamento */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h6 className="text-lg font-medium mb-4 text-gray-800">Informações de Pagamento</h6>
                <hr className="mb-4" />

                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">Forma de Pagamento</p>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="formaPagamento"
                        value="cartao"
                        checked={formData.formaPagamento === 'cartao'}
                        onChange={handlePaymentMethodChange}
                        className="mr-2"
                      />
                      Cartão de Crédito
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="formaPagamento"
                        value="boleto"
                        checked={formData.formaPagamento === 'boleto'}
                        onChange={handlePaymentMethodChange}
                        className="mr-2"
                      />
                      Boleto Bancário
                    </label>
                  </div>
                </div>

                {formData.formaPagamento === 'cartao' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome do Cartão*
                      </label>
                      <input
                        type="text"
                        name="nomeCartao"
                        value={formData.nomeCartao}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Insira o nome do seu cartão"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número do Cartão*
                      </label>
                      <input
                        type="text"
                        name="numeroCartao"
                        value={formData.numeroCartao}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Insira o número do seu cartão"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data de Validade*
                        </label>
                        <input
                          type="text"
                          name="dataCartao"
                          value={formData.dataCartao}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="MM/AA"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV*
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="CVV"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Finalizar Compra - Mobile */}
              <div className="bg-white rounded-lg shadow-sm p-6 lg:hidden">
                <h6 className="text-lg font-medium mb-4 text-gray-800">Finalizar Compra</h6>
                <hr className="mb-4" />
                
                <div className="text-center mb-4">
                  <h5 className="text-lg font-medium">Total</h5>
                  <h2 className="text-3xl font-bold text-blue-600">R$ 189,00</h2>
                  <p className="text-gray-500">ou 10x de R$ 18,90 sem juros</p>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Realizar Pagamento
                </button>
              </div>
            </div>

            {/* Coluna Direita - Resumo */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h5 className="text-xl font-semibold mb-6 text-gray-800">Resumo</h5>

                <div className="flex mb-6">
                  <div className="mr-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-xs">Imagem</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h6 className="font-medium mb-1">Tênis Nike Air Force 1 '07</h6>
                    <small className="text-gray-500">Branco/Vermelho</small>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R$ 219,00</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Frete:</span>
                    <span className="text-green-600">R$ 0,00</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Desconto:</span>
                    <span className="text-green-600">- R$ 30,00</span>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between mb-2">
                  <h5 className="text-xl font-semibold">Total</h5>
                  <h5 className="text-xl font-semibold text-blue-600">R$ 189,00</h5>
                </div>
                
                <p className="text-gray-500 text-right mb-6">ou 10x de R$ 18,90 sem juros</p>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium hidden lg:block"
                >
                  Realizar Pagamento
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>  
  )
}

export default DripStoreCheckout;