import { useEffect } from "react";
import { actGetCustomerMessages } from "../../store/Customer/act/actGetCustomer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ICustomer } from "../../types/customer";
import { Clock, Mail, MessageCircle, MessageSquare, Send } from "lucide-react";
import { Link } from "react-router-dom";

interface Customer {
    customer: ICustomer | null;
}

const MessageHistory = ({ customer }: Customer) => {
    const { messages } = useAppSelector((state) => state.Customer);
    const dispatch = useAppDispatch();
    const id = customer?.id;

    useEffect(() => {
        if (id) {
            dispatch(actGetCustomerMessages(id));
        }
    }, [dispatch, id]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString("ar-EG", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getMessageIcon = (type: string) => {
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

    return (
        <div className="pt-4 px-6 bg-white rounded-lg shadow-lg md:min-h-[348px]">
            <h2 className="text-xl font-bold mb-4">سجل الرسائل</h2>

            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                {messages &&
                    messages.map((message) => {
                        const { icon, bgClass } = getMessageIcon(message.type);
                        return (
                            <Link
                                key={message.id}
                                to={`/message/${message.id}`}
                                className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-150"
                            >
                                <div className="flex items-start gap-4 flex-1 flex-col md:flex-row">
                                    <div
                                        className={`${bgClass} p-2 rounded-lg mt-1`}
                                    >
                                        {icon}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex flex-col items-start md:flex-row md:items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4 ml-1" />
                                                {formatDate(message.sent_at)}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Send className="h-4 w-4 ml-1" />
                                                <span>
                                                    {message.sent_by.username}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-gray-600 md:text-lg line-clamp-1 font-bold ">
                                                {message?.title}
                                            </h3>
                                        </div>
                                        <p className="text-gray-500">
                                            {message.content.slice(0, 50)}
                                            {message.content.length > 50 &&
                                                "..."}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
            </div>
        </div>
    );
};

export default MessageHistory;
