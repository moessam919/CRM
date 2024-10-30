import {
    ChartPie,
    Handshake,
    LayoutDashboard,
    SquareUserRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface AsideProps {
    isVisible: boolean;
    onNavClick: () => void;
    isMobile: boolean;
}

const Aside = ({ isVisible, onNavClick, isMobile }: AsideProps) => {
    const linkClasses = ({ isActive }: { isActive: boolean }) => `
        flex gap-2 justify-between items-center mb-5 
        hover:bg-gray-100 p-4 rounded-md w-full
        ${isActive ? "bg-gray-200 font-bold" : ""}
    `;

    return (
        <aside
            className={`
                bg-white shadow-lg flex flex-col items-center w-44 md:w-64
                transition-all duration-300 ease-in-out
                ${isMobile ? "fixed right-0" : "fixed"}
                ${isVisible ? "translate-x-0" : "translate-x-full"}
                top-0 bottom-0 z-50
            `}
        >
            <div className="mt-4 border-b-2 w-full flex flex-col items-center">
                <div className="my-4 text-xl md:text-4xl font-bold">CRM</div>
            </div>

            <nav className="p-2 w-full">
                <NavLink to="/" onClick={onNavClick} className={linkClasses}>
                    <span>لوحة التحكم</span>
                    <LayoutDashboard />
                </NavLink>

                <NavLink
                    to="/leads"
                    onClick={onNavClick}
                    className={linkClasses}
                >
                    <span>Lead</span>
                    <Handshake />
                </NavLink>

                <NavLink
                    to="/customers"
                    onClick={onNavClick}
                    className={linkClasses}
                >
                    <span>إدارة الطلبات</span>
                    <ChartPie />
                </NavLink>

                <NavLink
                    to="/contacts"
                    onClick={onNavClick}
                    className={linkClasses}
                >
                    <span>الاتصال</span>
                    <SquareUserRound />
                </NavLink>
            </nav>
        </aside>
    );
};

export default Aside;
