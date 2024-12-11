import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { ProductsManagement } from '../pages/ProductsManagement'
import { Vendors } from '../pages/Vendors'
import { InventoryCount } from '../pages/InventoryCount'
import { RegisterSale } from '../pages/RegisterSale'
import { SalesHistory } from '../pages/SalesHistory'
import { PurchaseOrder } from '../pages/PurchaseOrder'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products-management' element={<ProductsManagement />} />
            <Route path='/vendor-management' element={<Vendors />} />
            <Route path='/inventory-count' element={<InventoryCount />} />
            <Route path='/register-sale' element={<RegisterSale />} />
            <Route path='/sales-history' element={<SalesHistory />} />
            <Route path='/purchase-order' element={<PurchaseOrder />} />
        </Routes>
    )
}
