import { Link } from "react-router-dom";
import { ICustomer } from "../../types/customer";

interface ICustomerInfo {
    customer: ICustomer | null;
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const RecentOrder = ({ customer }: ICustomerInfo) => {
    return (
        <div className="overflow-y-auto h-[300px] md:h-[350px] xl:h-[450px] 2xl:h-[663px] mt-1">
            {/* orders */}

            {customer &&
                customer.invoices.map((order) => (
                    <div className="flex justify-center " key={order.id}>
                        <div className="flex justify-between w-[80%] border-b-2 pb-4 border-gray-300">
                            <div className="flex flex-col justify-center items-start gap-2">
                                <h4 className="font-bold">
                                    طلب {order.ref_number}
                                </h4>
                                <span className="text-gray-500">
                                    {formatDate(order.created_at)}
                                </span>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-2 ">
                                <p className="font-bold text-green-500">
                                    {order.value
                                        ? `${Number(Number(order.value).toFixed(2)).toLocaleString()} ريال`
                                        : "لا يوجد"}
                                </p>
                                <p className="p-1 bg-green-500 text-white rounded">
                                    <Link to={order.url} target="_blank">
                                        عرض الفاتورة
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default RecentOrder;
