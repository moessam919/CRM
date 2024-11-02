import React, { useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";

type Order = {
    id: number;
    title: string;
    price: string;
    date: string;
    status: "جميع الطلبات" | "الطلبات المكتملة" | "جاري التوصيل" | "تم التوصيل";
    description: string;
};

const MainKanbanView: React.FC = () => {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const orders: Order[] = [
        {
            id: 1,
            title: "طلب 1",
            price: "$87k",
            date: "01 Jan, 2022",
            status: "جميع الطلبات",
            description: "تفاصيل الطلب 1",
        },
        {
            id: 2,
            title: "طلب 2",
            price: "$87k",
            date: "01 Jan, 2022",
            status: "جميع الطلبات",
            description: "تفاصيل الطلب 1",
        },
        {
            id: 3,
            title: "طلب 1",
            price: "$87k",
            date: "01 Jan, 2022",
            status: "جميع الطلبات",
            description: "تفاصيل الطلب 1",
        },
        {
            id: 55,
            title: "طلب 1",
            price: "$87k",
            date: "01 Jan, 2022",
            status: "جميع الطلبات",
            description: "تفاصيل الطلب 1",
        },
        {
            id: 21,
            title: "طلب 1",
            price: "$87k",
            date: "01 Jan, 2022",
            status: "جميع الطلبات",
            description: "تفاصيل الطلب 1",
        },
        {
            id: 42,
            title: "طلب 1",
            price: "$87k",
            date: "01 Jan, 2022",
            status: "جميع الطلبات",
            description: "تفاصيل الطلب 1",
        },
        {
            id: 66,
            title: "طلب 1",
            price: "$87k",
            date: "01 Jan, 2022",
            status: "جميع الطلبات",
            description: "تفاصيل الطلب 1",
        },
        {
            id: 5,
            title: "طلب 2",
            price: "$20.3k",
            date: "24 Dec, 2021",
            status: "الطلبات المكتملة",
            description: "تفاصيل الطلب 2",
        },
        {
            id: 6,
            title: "طلب 2",
            price: "$20.3k",
            date: "24 Dec, 2021",
            status: "الطلبات المكتملة",
            description: "تفاصيل الطلب 2",
        },
        {
            id: 7,
            title: "طلب 2",
            price: "$20.3k",
            date: "24 Dec, 2021",
            status: "الطلبات المكتملة",
            description: "تفاصيل الطلب 2",
        },
        {
            id: 8,
            title: "طلب 2",
            price: "$20.3k",
            date: "24 Dec, 2021",
            status: "الطلبات المكتملة",
            description: "تفاصيل الطلب 2",
        },
        {
            id: 120,
            title: "طلب 3",
            price: "$124.3k",
            date: "29 Dec, 2021",
            status: "جاري التوصيل",
            description: "تفاصيل الطلب 3",
        },
        {
            id: 4,
            title: "طلب 4",
            price: "$33.6k",
            date: "24 Dec, 2021",
            status: "تم التوصيل",
            description: "تفاصيل الطلب 4",
        },
        // Add more orders as needed
    ];

    const handleOrderClick = (order: Order) => {
        setSelectedOrder(order);
    };

    const columns = [
        { title: "جميع الطلبات", status: "جميع الطلبات", color: "bg-pink-100" },
        {
            title: "الطلبات المكتملة",
            status: "الطلبات المكتملة",
            color: "bg-green-100",
        },
        {
            title: "جاري التوصيل",
            status: "جاري التوصيل",
            color: "bg-yellow-100",
        },
        { title: "تم التوصيل", status: "تم التوصيل", color: "bg-blue-100" },
    ];

    return (
        <div className="p-6 rounded-md">
            <p className="font-bold md:text-lg text-gray-500 mb-5 bg-white p-6 rounded-md">
                المبيعات الاسبوعية
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                {columns.map((col) => (
                    <div>
                        <div
                            key={col.status}
                            className={` ${col.color} p-4 rounded-md mb-6 shadow-md`}
                        >
                            <h2 className="font-bold mb-2 text-gray-500">
                                {col.title}
                            </h2>
                            <p className="text-gray-700 font-bold">
                                500 طلب
                                <span className="text-gray-500">
                                    | 50.000 ريال
                                </span>
                            </p>
                        </div>
                        <div className="">
                            {orders
                                .filter((order) => order.status === col.status)
                                .map((order) => (
                                    <div
                                        key={order.id}
                                        onClick={() => handleOrderClick(order)}
                                        className="bg-white p-3 rounded-md shadow cursor-pointer hover:bg-gray-100 mb-2 hover:scale-105 duration-200"
                                    >
                                        <h3 className="font-semibold">
                                            {order.title}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {order.price} - {order.date}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
                {selectedOrder && (
                    <OrderDetailsModal
                        order={selectedOrder}
                        onClose={() => setSelectedOrder(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default MainKanbanView;
