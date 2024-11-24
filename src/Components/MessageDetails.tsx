import { ArrowLeft, Mail, Clock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MessageDetails = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-200 rounded-md p-6">
            <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-sm">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-2xl font-semibold">
                            مرحباً بك في خدمتنا
                        </h1>
                        <div
                            className="flex justify-end items-center gap-2 mb-6 text-gray-600 cursor-pointer"
                            onClick={() => navigate("/messages")}
                        >
                            <span>العودة إلى الرسائل</span>
                            <ArrowLeft className="h-5 w-5" />
                        </div>
                    </div>
                </div>

                {/* Message Details Grid */}
                <div className="mb-8">
                    {/* Sender Info */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-100 p-2 rounded-lg">
                                <Mail className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">المرسل</p>
                                <p className="font-medium">سارة جونسون</p>
                                <p className="text-sm text-gray-500">
                                    sarahj@company.com
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-3">
                                <div className="bg-orange-100 p-2 rounded-lg">
                                    <Clock className="h-5 w-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        تاريخ الإرسال
                                    </p>
                                    <p className="font-medium">2024-03-15</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recipients Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4">المستلمون</h2>
                    <div className="space-y-3 max-h-[150px] overflow-auto">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                    <User size={20} />
                                </div>
                                <div>
                                    <p className="font-medium">جون سميث</p>
                                    <p className="text-sm text-gray-500">
                                        john.smith@example.com
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                    <User size={20} />
                                </div>
                                <div>
                                    <p className="font-medium">أليس جونسون</p>
                                    <p className="text-sm text-gray-500">
                                        alice.j@example.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Message Content */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">
                        محتوى الرسالة
                    </h2>
                    <div className="space-y-4 text-gray-600 overflow-auto max-h-[190px]">
                        <p>عزيزنا العميل،</p>
                        <p>
                            يسعدنا الترحيب بك في خدمتنا. نود أن نشكرك شخصياً على
                            اختيارك لنا ونؤكد لك التزامنا بتقديم أفضل تجربة
                            ممكنة لك.
                        </p>
                        <p>
                            إذا كان لديك أي أسئلة أو استفسارات، لا تتردد في
                            التواصل معنا.
                        </p>
                        <p>مع أطيب التحيات،</p>
                        <p>فريق خدمة العملاء</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageDetails;
