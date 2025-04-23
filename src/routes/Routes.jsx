import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import LandingPage from "../features/landing/LandingPage";
import Auth from "../features/auth/Auth";
import Dashboard from "../features/dashboard/Dashboard";
import Categories from "../features/dashboard/modules/categories/Categories";
import Products from "../features/dashboard/modules/products/Products";
import Roles from "../features/dashboard/modules/roles/Roles";
import Companies from "../features/dashboard/modules/companies/Companies";
import PrivateRoutes from "./PrivateRoutes";
import NotFound from "../features/notFound/NotFound";
import Users from "../features/dashboard/modules/users/Users";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/landing" replace />
    },
    {
        path: "/landing",
        element: <LandingPage />
    },
    {
        path: "/login",
        element: <Auth />
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoutes>
                <Dashboard />
            </PrivateRoutes>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="users" replace />
            },
            {
                path: "products",
                element: <Products />
            },
            {
                path: "roles",
                element: <Roles />
            },
            {
                path: "companies",
                element: <Companies />
            },
            {
                path: "categories",
                element: <Categories />
            },
            {
                path: "users",
                element: <Users />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])

export default Routes;