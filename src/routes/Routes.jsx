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
import { TodaySales } from '../pages/TodaySales'

const publicRoutes = [
    {path: '/', element: <Home />},
    {path: '/unauthorized', element: <Unauthorized />},
]

const userRoutes = [
    {
        path: '/inventory-count',
        element: (
            <ProtectedRoute allowedRoles={['admin', 'manager', 'user']}>
                <InventoryCount />
            </ProtectedRoute>
        ),
    },
    {
        path: '/register-sale',
        element: (
            <ProtectedRoute allowedRoles={['admin', 'manager', 'user']}>
                <RegisterSale />
            </ProtectedRoute>
        ),
    },
    {
        path: '/product-list',
        element: (
            <ProtectedRoute allowedRoles={['admin', 'manager', 'user']}>
                <ProductList />
            </ProtectedRoute>
        ),
    },
    {
        path: '/vendor-list',
        element: (
            <ProtectedRoute allowedRoles={['admin', 'manager', 'user']}>
                <VendorList />
            </ProtectedRoute>
        ),
    },
    {
        path: '/purchase-order',
        element: (
            <ProtectedRoute allowedRoles={['admin', 'manager', 'user']}>
                <PurchaseOrder />
            </ProtectedRoute>
        ),
    },
    {
        path: '/stock-difference',
        element: (
            <ProtectedRoute allowedRoles={['admin', 'manager', 'user']}>
                <StockDifference />
            </ProtectedRoute>
        ),
    },
    {
        path: '/orders-history',
        element: (
            <ProtectedRoute allowedRoles={['admin', 'manager', 'user']}>
                <OrdersHistory />
            </ProtectedRoute>
        ),
    },
]

const managerRoutes = [
    {
        path: '/product-management',
        element: (
            <ProtectedRoute allowedRoles={['admin', 'manager']}>
                <ProductManagement />
            </ProtectedRoute>
        ),
    },
    {
        path: '/vendor-management',
        element: (
            <ProtectedRoute allowedRoles={['admin', 'manager']}>
                <VendorManagement />
            </ProtectedRoute>
        ),
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute allowedRoles={['admin', 'manager']}>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: '/today-sales-history',
        element: (
            <ProtectedRoute allowedRoles={['admin', 'manager']}>
                <TodaySales />
            </ProtectedRoute>
        )
    },
    {
        path: '/sales-history',
        element: (
            <ProtectedRoute allowedRoles={['admin', 'manager']}>
                <SalesHistory />
            </ProtectedRoute>
        ),
    },
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
