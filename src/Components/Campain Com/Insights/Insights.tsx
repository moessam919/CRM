import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { actgetSalesReport } from "../../../store/Campaigns/act/CampaignActions";
import SalesBoxes from "./SalesBoxes";
import CustomersBehavior from "./CustomersBehavior";
import InsightsCharts from "./InsightsCharts";
import TopSellingLocation from "./TopSellingLocation";
import TopSellingCustomers from "./TopSellingCustomers";
import TopSellingProducts from "./TopSellingProducts";

interface IInsights {
    id: string | undefined;
}

const Insights = ({ id }: IInsights) => {
    const { salesReport } = useAppSelector((state) => state.campaigns);

    console.log(salesReport);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) {
            dispatch(actgetSalesReport({ id }));
        }
    }, [dispatch, id]);

    return (
        <div>
            <div className="bg-white p-6 rounded-lg shadow ">
                <h2 className="text-2xl font-bold mb-4">تحليل الاداء</h2>
                <div className="gap-5 grid">
                    <SalesBoxes salesReport={salesReport} />
                    <CustomersBehavior salesReport={salesReport} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <InsightsCharts salesReport={salesReport} />
                <TopSellingCustomers salesReport={salesReport} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <TopSellingLocation salesReport={salesReport} />
                <TopSellingProducts salesReport={salesReport} />
            </div>
        </div>
    );
};

export default Insights;
