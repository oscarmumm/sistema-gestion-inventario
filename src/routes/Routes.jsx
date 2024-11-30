import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Products } from '../pages/Products'
import { Suppliers } from '../pages/Suppliers'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/productos' element={<Products />} />
            <Route path='/proveedores' element={<Suppliers />} />
        </Routes>
    )
}
