import { useEffect, useState } from "react";

const LoginPopup = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        const handleLoginPopup = () => {
            setIsOpen(true);
        };

        window.addEventListener("openLoginPopup", handleLoginPopup);

        return () => {
            window.removeEventListener("openLoginPopup", handleLoginPopup);
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Add your login logic here
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold  text-gray-800">
                        تسجيل الدخول
                    </h2>
                    <button
                        onClick={handleClose}
                        className=" text-gray-500 hover:text-red-700 duration-150"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            اسم المستخدم
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={formData.username}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    username: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-right"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            كلمة المرور
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-right"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 duration-150"
                    >
                        تسجيل الدخول
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPopup;
