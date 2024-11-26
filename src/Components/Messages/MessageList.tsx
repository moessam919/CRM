import {
    Clock,
    Mail,
    Send,
    Users,
    MessageCircle,
    MessageSquare,
} from "lucide-react"; // Add relevant icons
import { Message } from "../../types/MessageData";
import { Link } from "react-router-dom";

interface MessageProp {
    messages: Message[];
    loading: "idle" | "pending" | "succeeded" | "failed";
}

const MessageList = ({ messages, loading }: MessageProp) => {
    if (loading === "pending") {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-300 border-solid border-opacity-50"></div>
            </div>
        );
    }

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ar-EG", {
            weekday: "long",
            year: "numeric",
            month: "2-digit",
            day: "numeric",
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
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            {messages.map((message: Message) => {
                const { icon, bgClass } = getMessageIcon(message.type); 
                return (
                    <Link
                        key={message.id}
                        to={`/message/${message.id}`}
                        className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-150"
                    >
                        <div className="flex items-start gap-4 flex-1 flex-col md:flex-row">
                            <div className={`${bgClass} p-2 rounded-lg mt-1`}>
                                {icon}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-medium md:text-lg line-clamp-1">
                                        {message.content}
                                    </h3>
                                </div>
                                <p className="text-gray-600 mb-2 line-clamp-1">
                                    {message.content}
                                </p>
                                <div className="flex flex-col items-start md:flex-row md:items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Users className="h-4 w-4 ml-1" />
                                        {message.recipients.length} مستلم
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4 ml-1" />
                                        {formatDate(message.sent_at)}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Send className="h-4 w-4 ml-1" />
                                        <span>{message.sent_by.username}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default MessageList;
