import { useAppDispatch, useAppSelector } from "../store/hooks";
import { actGetSalesReport } from "../store/SalesReport/salesreportSlice";
import { useEffect } from "react";

// component
import DetailsBoxes from "../Components/DetailsBoxes";
import LastDealTable from "../Components/LastDealTable";
import SalesOverview from "../Components/SalesOverview";
import TopBuyersTable from "../Components/TopBuyersTable";
import ActiveCampaigns from "../Components/ActiveCampaigns";

const Dashboard = () => {
    const { salesreport, loading } = useAppSelector(
        (state) => state.salesreport
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!salesreport) dispatch(actGetSalesReport());
    }, [dispatch, salesreport]);

    if (loading === "pending") {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-300 border-solid border-opacity-50"></div>
            </div>
        );
    }

    if (!salesreport) {
        return;
    }

    return (
        <div className="bg-gray-200 rounded-md">
            <div className="p-6">
                <div className="mb-5">
                    <DetailsBoxes salesreport={salesreport} />
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
                    <div className="col-span-2 xl:col-span-1">
                        <SalesOverview />
                    </div>
                    <div className="col-span-2 md:col-span-2">
                        <LastDealTable />
                    </div>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 ">
                    <div className="">
                        <ActiveCampaigns />
                    </div>
                    <div className="">
                        <TopBuyersTable />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
