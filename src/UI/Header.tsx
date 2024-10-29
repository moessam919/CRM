import { ChevronDown, LogOut, Menu, User } from "lucide-react";
import SearchComponent from "../Components/SearchComponent";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

interface HeaderProps {
    isAsideVisible: boolean;
    toggleAside: () => void;
}

const Header = ({ isAsideVisible, toggleAside }: HeaderProps) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const toggleButtonRef = useRef<HTMLDivElement>(null);

    // Toggle dropdown on click
    const toggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpen((prevOpen) => !prevOpen);
    };

    // Close dropdown on outside click
    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node) &&
            toggleButtonRef.current &&
            !toggleButtonRef.current.contains(event.target as Node)
        ) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-white border-b-2 p-6 max-h-[90px] w-full transition-all duration-300 ease-in-out ">
            <div className="flex justify-between relative">
                <div className="flex gap-3 md:gap-8 items-center">
                    <div
                        className="cursor-pointer transition-transform hover:scale-110"
                        onClick={toggleAside}
                    >
                        <Menu
                            className={`transform transition-transform ${isAsideVisible ? "" : "rotate-90"}`}
                        />
                    </div>
                    <div className="mb-2 md:text-2xl font-bold flex items-center gap-2 pt-2">
                        <p className="">مرحبا محمود</p>
                        <div className="hidden md:block  md:w-8">
                            <img
                                src="/src/assets/wave.png"
                                alt="welcome wave"
                                className="w-6 md:w-8"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex gap-6 items-center">
                    <SearchComponent />
                    <div
                        ref={toggleButtonRef}
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={toggleDropdown}
                    >
                        <img
                            src="/src/assets/userImg.jpg"
                            alt="userImg"
                            className="w-10 rounded-full"
                        />
                        <span className="hidden md:block">محمود</span>
                        <ChevronDown size={18} />
                    </div>
                </div>

                {/* Dropdown */}
                {open && (
                    <div
                        ref={dropdownRef}
                        className="absolute -left-4 top-20 bg-white w-[250px] py-3 px-4 rounded shadow-lg z-50"
                    >
                        <div className="flex flex-col gap-2">
                            <NavLink
                                to="profile"
                                className={({ isActive }) =>
                                    `font-bold mb-4 flex justify-between items-center py-2 px-2 rounded hover:bg-gray-100 ${
                                        isActive ? "bg-gray-200 font-bold" : ""
                                    }`
                                }
                            >
                                <span>الصفحة الشخصية</span>
                                <User />
                            </NavLink>
                            <NavLink
                                to="logout"
                                className={({ isActive }) =>
                                    `font-bold mb-4 flex justify-between items-center py-2 px-2 rounded hover:bg-gray-100 ${
                                        isActive ? "bg-gray-200 font-bold" : ""
                                    }`
                                }
                            >
                                <span>تسجيل الخروج</span>
                                <LogOut />
                            </NavLink>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
