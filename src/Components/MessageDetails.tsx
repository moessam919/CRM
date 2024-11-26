import {
    ArrowLeft,
    Mail,
    Clock,
    User,
    MessageCircle,
    MessageSquare,
} from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMessageDetails } from "../store/SendBulkMessage/act/actSendMessage";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const MessageDetails = () => {
    const { id } = useParams(); // Get the message ID from the URL
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { messageDetails, loading } = useAppSelector(
        (state) => state.Message
    );

    useEffect(() => {
        if (id) {
            dispatch(getMessageDetails(id)); // Dispatch the action to fetch the message details
        }
    }, [id, dispatch]);

    if (loading === "pending") {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-300 border-solid border-opacity-50"></div>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ar-EG", {
            weekday: "long",
            year: "numeric",
            month: "2-digit",
            day: "numeric",
        });
    };

    const getIconAndBg = (type: string | undefined) => {
        switch (type) {
            case "whatsapp":
                return {
                    icon: <MessageCircle className="h-5 w-5 text-green-600" />,
                    bgClass: "bg-green-100",
                };
            case "text":
                return {
                    icon: <MessageSquare className="h-5 w-5 text-purple-600" />,
                    bgClass: "bg-purple-100",
                };
            case "email":
            default:
                return {
                    icon: <Mail className="h-5 w-5 text-blue-600" />,
                    bgClass: "bg-blue-100",
                };
        }
    };

    const iconAndBg = getIconAndBg(messageDetails?.type);

    return (
        <div className="bg-gray-200 rounded-md p-6">
            <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-sm">
                <div className="mb-8">
                    <div className="flex items-center justify-between md:mb-2">
                        <h1 className="text-xl md:text-2xl font-semibold">
                            مرحباً بك في خدمتنا
                        </h1>
                        <div
                            className="flex justify-end items-center gap-2 md:mb-6 text-gray-600 cursor-pointer"
                            onClick={() => navigate("/messages")}
                        >
                            <span className="hidden md:block">
                                العودة إلى الرسائل
                            </span>
                            <ArrowLeft className="h-5 w-5" />
                        </div>
                    </div>
                </div>

                {/* Message Details Grid */}
                <div className="mb-8">
                    {/* Sender Info */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div
                                className={`${iconAndBg?.bgClass} p-2 rounded-lg`}
                            >
                                {iconAndBg?.icon}
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">المرسل</p>
                                <p className="font-medium">
                                    {messageDetails?.sent_by.username}
                                </p>
                                <p className="text-sm text-gray-500"></p>
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
                                    <p className="font-medium">
                                        {messageDetails?.sent_at &&
                                            formatDate(messageDetails.sent_at)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recipients Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4">المستلمون</h2>
                    <div className="space-y-3 max-h-[150px] overflow-auto">
                        {messageDetails?.recipients.map((recipient, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer"
                                onClick={() =>
                                    navigate(`/customer/${recipient.id}`)
                                }
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            {recipient.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {recipient.email_address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Message Content */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">
                        محتوى الرسالة
                    </h2>
                    <div className="space-y-4 text-gray-600 overflow-auto max-h-[210px] min-h-[210px]">
                        {messageDetails?.content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageDetails;
