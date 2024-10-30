import { MessageCircle, Phone } from "lucide-react";
import React from "react";

type Order = {
    id: number;
    title: string;
    price: string;
    date: string;
    description: string;
};

interface OrderDetailsModalProps {
    order: Order;
    onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
    order,
    onClose,
}) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="font-bold text-xl ">{order.title}</h2>
                    <button
                        className=" hover:bg-red-500 hover:text-white duration-200 px-2 bg-gray-100 rounded-md"
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                    {order.price} - {order.date}
                </p>
                <p className="text-gray-700 mb-4">{order.description}</p>
                <div className="flex items-center justify-around mt-4">
                    <div className="">
                        <button className="flex gap-2 border border-gray-500 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 duration-200 p-2 rounded">
                            اتصل
                            <Phone size={20} />
                        </button>
                    </div>
                    <div className="">
                        <button className="flex gap-2 border border-gray-500 hover:bg-blue-500 hover:text-white hover:border-blue-500 duration-200 p-2 rounded">
                            أرسل رسالة
                            <MessageCircle size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;
