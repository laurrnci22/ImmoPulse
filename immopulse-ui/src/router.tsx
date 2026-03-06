import { createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { MainLayout } from "./components/layouts/mainLayout.tsx";
import { Dashboard } from "./pages/Dashboard/Dashboard.tsx";
import { PropertiesList } from "./pages/Properties/PropertiesList.tsx";
import { Register } from "./components/Register";
import {SearchProvider} from "./contexts/SearchContextType.tsx";

export const router = createBrowserRouter([
    {
        element: (
            <AuthProvider>
                <SearchProvider>
                    <MainLayout />
                </SearchProvider>
            </AuthProvider>
        ),
        children: [
            { path: "/", element: <PropertiesList /> },
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/properties", element: <PropertiesList /> },
            { path: "/register", element: <Register /> },
        ],
    },
]);
