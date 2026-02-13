import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/layouts/mainLayout.tsx";
import {Dashboard} from "./pages/Dashboard/Dashboard.tsx";
import {PropertiesList} from "./pages/Properties/PropertiesList.tsx";

export const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            { path: "/", element: <PropertiesList /> },
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/properties", element: <PropertiesList /> },
        ],
    },
]);