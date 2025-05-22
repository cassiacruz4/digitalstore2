import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Cadastro from '../pages/Cadastro'
import Compra from '../pages/Compra'
import Pagamento from '../pages/Pagamento'
import Produtos from '../pages/Produtos'


const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element= {<Home/>}/>
        <Route path='/Cadastro' element= {<Cadastro/>}/>
        <Route path='/Compra' element= {<Compra/>}/>
        <Route path='/Pagamento' element= {<Pagamento/>}/>
        <Route path='/Produtos' element= {<Produtos/>}/>
    </Routes>
  )
}

export default AppRoutes
