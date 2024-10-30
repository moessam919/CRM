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
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-right">
                <button className="text-gray-500 float-left" onClick={onClose}>
                    X
                </button>
                <h2 className="font-bold text-xl mb-2">{order.title}</h2>
                <p className="text-sm text-gray-500 mb-4">
                    {order.price} - {order.date}
                </p>
                <p className="text-gray-700 mb-4">{order.description}</p>
                <div className="flex gap-4 mt-4">
                    <button className="flex-1 bg-yellow-500 text-white py-2 rounded">
                        اتصل
                    </button>
                    <button className="flex-1 bg-blue-500 text-white py-2 rounded">
                        أرسل رسالة
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;
