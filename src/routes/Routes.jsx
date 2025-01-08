import {Routes, Route} from 'react-router-dom'
import {Home} from '../pages/Home'
import {ProductManagement} from '../pages/ProductManagement'
import {VendorManagement} from '../pages/VendorManagement'
import {InventoryCount} from '../pages/InventoryCount'
import {RegisterSale} from '../pages/RegisterSale'
import {SalesHistory} from '../pages/SalesHistory'
import {PurchaseOrder} from '../pages/PurchaseOrder'
import {ProductList} from '../pages/ProductList'
import {VendorList} from '../pages/VendorList'
import {UserManagement} from '../pages/UserManagement'
import {Dashboard} from '../pages/Dashboard'
import {OrdersHistory} from '../pages/OrdersHistory'
import {StockDifference} from '../pages/StockDifference'
import {ProtectedRoute} from './ProtectedRoute'
import {Unauthorized} from '../pages/Unauthorized'

const publicRoutes = [
    {path: '/', element: <Home />},
    {path: '/unauthorized', element: <Unauthorized />},
]

const userRoutes = [
    {path: '/inventory-count', element: <InventoryCount />},
    {path: '/register-sale', element: <RegisterSale />},
    {path: '/product-list', element: <ProductList />},
    {path: '/vendor-list', element: <VendorList />},
    {path: '/sales-history', element: <SalesHistory />},
    {path: '/purchase-order', element: <PurchaseOrder />},
    {path: '/stock-difference', element: <StockDifference />},
    {path: '/orders-history', element: <OrdersHistory />},
]

const managerRoutes = [
    {path: '/product-management', element: <ProductManagement />},
    {path: '/vendor-management', element: <VendorManagement />},
    {path: '/dashboard', element: <Dashboard />},
]

const adminRoutes = [
    {
        path: '/user-management',
        element: (
            <ProtectedRoute allowedRoles={['admin']}>
                <UserManagement />
            </ProtectedRoute>
        ),
    },
]

export const AppRoutes = () => {
    return (
        <Routes>
            {/* Rutas Públicas */}
            {publicRoutes.map(({path, element}) => (
                <Route key={path} path={path} element={element} />
            ))}
            {/* Rutas Usuario */}
            {userRoutes.map(({path, element}) => (
                <Route key={path} path={path} element={element} />
            ))}
            {/* Rutas Encargado */}
            {managerRoutes.map(({path, element}) => (
                <Route key={path} path={path} element={element} />
            ))}
            {/* Rutas Admin */}
            {adminRoutes.map(({path, element}) => (
                <Route key={path} path={path} element={element} />
            ))}
        </Routes>
    )
}
