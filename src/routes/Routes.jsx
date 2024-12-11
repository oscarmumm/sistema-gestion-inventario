import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { ProductManagement } from '../pages/ProductManagement'
import { VendorManagement } from '../pages/VendorManagement'
import { InventoryCount } from '../pages/InventoryCount'
import { RegisterSale } from '../pages/RegisterSale'
import { SalesHistory } from '../pages/SalesHistory'
import { PurchaseOrder } from '../pages/PurchaseOrder'
import { ProductList } from '../pages/ProductList'
import { VendorList } from '../pages/VendorList'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product-management' element={<ProductManagement />} />
            <Route path='/vendor-management' element={<VendorManagement />} />
            <Route path='/inventory-count' element={<InventoryCount />} />
            <Route path='/register-sale' element={<RegisterSale />} />
            <Route path='/sales-history' element={<SalesHistory />} />
            <Route path='/purchase-order' element={<PurchaseOrder />} />
            <Route path='/product-list' element={<ProductList />} />
            <Route path='/vendor-list' element={<VendorList />} />
        </Routes>
    )
}
