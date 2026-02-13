import {Outlet} from 'react-router-dom'
import {Header} from "./Header/header.tsx";
import {Footer} from "./Footer/footer.tsx";

import type {FC} from "react";

interface MainLayoutProps {
    children?: undefined
}

export const MainLayout: FC = ({}: MainLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 pt-16 overflow-y-auto">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}