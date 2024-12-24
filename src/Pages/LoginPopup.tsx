import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login } from "../store/API/act/actGetCheckAuth";
import toast from "react-hot-toast";

const LoginPopup = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.ApiSlice);

    const [isOpen, setIsOpen] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [validationErrors, setValidationErrors] = useState({
        username: "",
        password: "",
    });

    const validateForm = () => {
        const errors = {
            username: "",
            password: "",
        };

        if (!formData.username.trim()) {
            errors.username = "يرجي ادخال اسم المستخدم";
        } else if (formData.username.length < 4) {
            errors.username = "يجب أن يكون اسم المستخدم 4 أحرف على الأقل";
        }

        if (!formData.password.trim()) {
            errors.password = "يرجي ادخال كلمة المرور";
        } else if (formData.password.length < 4) {
            errors.password = "يجب أن تكون كلمة المرور 4 أحرف على الأقل";
        }

        setValidationErrors(errors);
        return !errors.username && !errors.password;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await dispatch(login(formData)).unwrap();
            setIsOpen(false);
            toast.success("تم تسجيل الدخول بنجاح");
        } catch (error) {
            console.error("Login error:", error);
            toast.error("حدث خطأ أثناء تسجيل الدخول");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        تسجيل الدخول
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="text-red-600 text-sm text-center">
                            {error === "User not authenticated"
                                ? "الرجاء تسجيل الدخول"
                                : error}
                        </div>
                    )}

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
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    username: e.target.value,
                                });
                                setValidationErrors({
                                    ...validationErrors,
                                    username: "",
                                });
                            }}
                            className={`w-full px-3 py-2 border ${
                                validationErrors.username
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-right`}
                            minLength={4}
                        />
                        {validationErrors.username && (
                            <p className="text-red-500 text-sm mt-1">
                                {validationErrors.username}
                            </p>
                        )}
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
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                });
                                setValidationErrors({
                                    ...validationErrors,
                                    password: "",
                                });
                            }}
                            className={`w-full px-3 py-2 border ${
                                validationErrors.password
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-right`}
                            minLength={4}
                        />
                        {validationErrors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {validationErrors.password}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading === "pending"}
                        className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading === "pending"
                            ? "جاري تسجيل الدخول..."
                            : "تسجيل الدخول"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPopup;
