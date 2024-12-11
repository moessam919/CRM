import { useParams } from "react-router-dom";
import CustomerInfoBoxes from "../Components/CustomerINCOM/CustomerInfoBoxes";
import CustomerNotes from "../Components/CustomerINCOM/CustomerNotes";
import RecentOrder from "../Components/CustomerINCOM/RecentOrder";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { actGetCustomer } from "../store/Customer/act/actGetCustomer";
import { useEffect } from "react";

const CustomerInfo = () => {
    const { id } = useParams();

    const { customer, loading } = useAppSelector((state) => state.Customer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) {
            dispatch(actGetCustomer(Number(id)));
        }
    }, [dispatch, id]);

    if (loading === "pending") {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-300 border-solid border-opacity-50"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-[795px] rounded-md">
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
                <div className="col-span-1 md:col-span-2">
                    <div className="grid grid-cols-1 gap-5">
                        <CustomerInfoBoxes customer={customer} />
                        <CustomerNotes customer={customer} />
                    </div>
                </div>
                <div className="col-span-1 md:col-span-2 xl:col-span-2 2xl:col-span-1 hover:translate-y-1 duration-200">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h1 className="md:text-2xl font-bold">جميع الطلبات</h1>
                        <RecentOrder customer={customer} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerInfo;
