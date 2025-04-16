import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import LandingPage from "../features/landing/LandingPage";
import NotFound from "../features/notFound/NotFound";
import Dashboard from "../features/dashboard/Dashboard";
import Categories from "../features/dashboard/modules/categories/Categories";
import Products from "../features/dashboard/modules/products/Products";
import Roles from "../features/dashboard/modules/roles/Roles";
import Companies from "../features/dashboard/modules/companies/Companies";

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
        path: "/dashboard",
        element: <Dashboard />,
        children: [
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
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])

export default Routes;