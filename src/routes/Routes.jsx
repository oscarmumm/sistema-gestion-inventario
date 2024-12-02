import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Products } from '../pages/Products'
import { Suppliers } from '../pages/Suppliers'
import { InventoryCount } from '../pages/InventoryCount'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/suppliers' element={<Suppliers />} />
            <Route path='/inventory-count' element={<InventoryCount />} />
        </Routes>
    )
}
