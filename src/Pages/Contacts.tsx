import { useAppDispatch, useAppSelector } from "../store/hooks";
import actGetCustomers from "../store/Customers/act/actGetCustomers";

import CustomersCallTable from "../Components/CustomersCallTable";
import { useEffect } from "react";

const Contacts = () => {
    const { customers, loading } = useAppSelector((state) => state.Customers);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(actGetCustomers());
    }, [dispatch]);

    

    if (loading === "pending") {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-300 border-solid border-opacity-50"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-200 rounded-md">
            <div className="p-6">
                <CustomersCallTable customers={customers} />
            </div>
        </div>
    );
};

export default Contacts;
