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
import { UserManagement } from '../pages/UserManagement'
import { Dashboard } from '../pages/Dashboard'
import { OrdersHistory } from '../pages/OrdersHistory'
import { StockDifference } from '../pages/StockDifference'

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
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/user-management' element={<UserManagement />} />
            <Route path='/orders-history' element={<OrdersHistory />} />
            <Route path='/stock-difference' element={<StockDifference />} />
        </Routes>
    )
}
