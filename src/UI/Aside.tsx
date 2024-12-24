import {
    ArrowRight,
    LayoutDashboard,
    Mails,
    Megaphone,
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
        flex gap-2  items-center mb-5 
        hover:bg-gray-100 p-4 rounded-md w-full
        ${isActive ? "bg-white font-bold" : ""}
    `;

    return (
        <aside
            className={`
                bg-[#e3e7ed] shadow-lg flex flex-col items-center w-44 md:w-64
                transition-all duration-300 ease-in-out
                ${isMobile ? "fixed right-0" : "fixed"}
                ${isVisible ? "translate-x-0" : "translate-x-full"}
                top-0 bottom-0 z-50
            `}
        >
            <div className="mt-4 border-b-2 border-gray-300 w-full flex flex-col items-center">
                <div className="my-4 text-xl md:text-4xl font-bold">CRM</div>
            </div>
            <nav className="p-2 w-full">
                <NavLink to="/" onClick={onNavClick} className={linkClasses}>
                    <LayoutDashboard />
                    <span>لوحة التحكم</span>
                </NavLink>

                <NavLink
                    to="/contacts"
                    onClick={onNavClick}
                    className={linkClasses}
                >
                    <SquareUserRound />
                    <span>الاتصال</span>
                </NavLink>

                <NavLink
                    to="/messages"
                    onClick={onNavClick}
                    className={linkClasses}
                >
                    <Mails />
                    <span>الرسائل</span>
                </NavLink>

                <NavLink
                    to="/campaign"
                    onClick={onNavClick}
                    className={linkClasses}
                >
                    <Megaphone />
                    <span>الحملات</span>
                </NavLink>

                {/* <NavLink
                    to="/customers"
                    onClick={onNavClick}
                    className={linkClasses}
                >
                    <ChartPie />
                    <span>إدارة الطلبات</span>
                </NavLink>

                <NavLink
                    to="/leads"
                    onClick={onNavClick}
                    className={linkClasses}
                >
                    <Handshake />
                    <span>Lead</span>
                </NavLink> */}
            </nav>
            <div className="mt-auto w-full p-2">
                <a
                    href="https://erp.rashodi.online/"
                    rel="noopener noreferrer"
                    className="font-bold mb-4 justify-center text-gray-800 gap-2 hover:text-white border border-gray-800 hover:border-gray-800 hover:bg-gray-800 flex items-center p-2 rounded-md duration-150"
                >
                    <ArrowRight />

                    <span>العودة إلى ERP</span>
                </a>
            </div>
        </aside>
    );
};

export default Aside;
