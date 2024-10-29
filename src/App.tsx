import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import Aside from "./UI/Aside";
import Header from "./UI/Header";

function App() {
    // Initialize mobile state based on window width
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    // Initialize aside visibility - hidden on mobile, visible on desktop
    const [isAsideVisible, setIsAsideVisible] = useState(!isMobile);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) {
                setIsAsideVisible(true);
            } else {
                setIsAsideVisible(false);
            }
        };

        // Add initial resize check
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleAside = () => {
        setIsAsideVisible((prev) => !prev);
    };

    const handleAsideClose = () => {
        if (isMobile) {
            setIsAsideVisible(false);
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Overlay for mobile */}
            {isAsideVisible && isMobile && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={handleAsideClose}
                />
            )}

            <Aside
                isVisible={isAsideVisible}
                onNavClick={handleAsideClose}
                isMobile={isMobile}
            />

            <div
                className={`
                    flex flex-col flex-1 transition-all duration-300
                    ${isAsideVisible && !isMobile ? "md:mr-64" : "mr-0"}
                `}
            >
                <Header
                    isAsideVisible={isAsideVisible}
                    toggleAside={toggleAside}
                />
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default App;
