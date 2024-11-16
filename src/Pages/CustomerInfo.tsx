import CustomerInfoBoxes from "../Components/CustomerINCOM/CustomerInfoBoxes";
import CustomerNotes from "../Components/CustomerINCOM/CustomerNotes";
import RecentOrder from "../Components/CustomerINCOM/RecentOrder";

const CustomerInfo = () => {
    return (
        <div className="bg-gray-200 min-h-[795px] rounded-md">
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
                <div className="col-span-1 md:col-span-2">
                    <div className="grid grid-cols-1 gap-5">
                        <CustomerInfoBoxes />
                        <CustomerNotes />
                    </div>
                </div>
                <div className="col-span-1 md:col-span-2 xl:col-span-2 2xl:col-span-1 hover:translate-y-1 duration-200">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h1 className="md:text-2xl font-bold">جميع الطلبات</h1>
                        <RecentOrder />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerInfo;
