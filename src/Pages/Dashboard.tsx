import DetailsBoxes from "../Components/DetailsBoxes";
import LastDealTable from "../Components/LastDealTable";
import SalesForecastChart from "../Components/SalesForecastChart";
import SalesOverview from "../Components/SalesOverview";
import TopBuyersTable from "../Components/TopBuyersTable";

const Dashboard = () => {
    return (
        <div className="bg-gray-200 min-h-[840px] rounded-md">
            <div className="p-6">
                <div className="mb-5">
                    <DetailsBoxes />
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
                    <div className="col-span-2 xl:col-span-1">
                        <SalesOverview />
                    </div>
                    <div className="col-span-2 md:col-span-2">
                        <LastDealTable />
                    </div>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-5 ">
                    <div className="col-span-1 md:col-span-2">
                        <SalesForecastChart />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <TopBuyersTable />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
