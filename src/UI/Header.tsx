import { ChevronDown, LogOut, Menu } from "lucide-react";
import SearchComponent from "../Components/SearchComponent";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { checkAuth, logout } from "../store/API/act/actGetCheckAuth";

interface HeaderProps {
    isAsideVisible: boolean;
    toggleAside: () => void;
}

const Header = ({ isAsideVisible, toggleAside }: HeaderProps) => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.ApiSlice);

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

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

    const handleLogout = async () => {
        try {
            await dispatch(logout());
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

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
                        <p className="">
                            مرحبا {typeof user === "object" ? user?.user : ""}
                        </p>
                        <div className="hidden md:block  md:w-8">
                            <img
                                src="/imgs/wave.png"
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
                            src="/imgs/userImg.jpg"
                            alt="userImg"
                            className="w-10 rounded-full"
                        />
                        <span className="hidden md:block">
                            {typeof user === "object" ? user?.user : ""}
                        </span>
                        <ChevronDown size={18} />
                    </div>
                </div>

                {/* Dropdown */}
                {open && (
                    <div
                        ref={dropdownRef}
                        className="absolute -left-4 top-14 bg-white w-[250px] py-3 px-4 rounded shadow-lg z-50"
                    >
                        <p
                            onClick={handleLogout}
                            className={`font-bold mb-4 flex justify-between items-center py-2 px-2 rounded hover:bg-gray-100 cursor-pointer`}
                        >
                            <span>تسجيل الخروج</span>
                            <LogOut />
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
