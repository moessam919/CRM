import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { actgetCampaignById } from "../../store/Campaigns/act/CampaignActions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Calendar, TrendingUp } from "lucide-react";
import CampaignsChart from "./CampaignsChart";
import CampaignsActionsBtn from "./CampaignsActionsBtn";
import AnalysisChart from "./AnalysisChart";
import AnalysisTotalSales from "./MetricsComp/AnalysisTotalSales";
import AnalysisCategorySales from "./MetricsComp/AnalysisCategorySales";
import AnalysisProductSales from "./MetricsComp/AnalysisProductSales";
import AnalysisCustomerRegistration from "./MetricsComp/AnalysisCustomerRegistration";
import MetricsInvoicesCount from "./MetricsComp/MetricsInvoicesCount";
import MetricsNumberofProductsSold from "./MetricsComp/MetricsNumberofProductsSold";
import MetricsAverageTransactionValue from "./MetricsComp/MetricsAverageTransactionValue";
import MetricsCustomerRegistration from "./MetricsComp/MetricsCustomerRegistration";
import MetricsSalesofCategory from "./MetricsComp/MetricsSalesofCategory";
import MetricsSalesofSpecificProducts from "./MetricsComp/MetricsSalesofSpecificProducts";
import MetricsTotalSalesValue from "./MetricsComp/MetricsTotalSalesValue";
import DateFilter from "./DateFilter";
import AnalysisAverageTransactionValue from "./MetricsComp/AnalysisAverageTransactionValue";

const CampaignInfo = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { selectedCampaign, loading } = useAppSelector(
        (state) => state.campaigns
    );

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);


    useEffect(() => {
        if (id) {
            dispatch(
                actgetCampaignById({
                    id: Number(id),
                    startDate: startDate || undefined,
                    endDate: endDate || undefined,
                })
            );
        }
    }, [dispatch, id, startDate, endDate]);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ar-EG", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const handleDateRangeChange = (start: Date, end: Date) => {
        setStartDate(start);
        setEndDate(end);
    };

    if (loading === "pending") {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-300 border-solid border-opacity-50"></div>
            </div>
        );
    }

    if (!selectedCampaign) return null;

    return (
        <div className="p-6 space-y-6 bg-gray-100 rounded-md">
            {/* Campaign Header */}
            <div className="grid grid-cols-1 gap-6">
                <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-start justify-between">
                    <div className="flex flex-col items-center md:items-start w-[80%]">
                        <div className="flex items-center md:items-start gap-5">
                            <h1 className="text-2xl font-bold px-3 py-1">
                                {selectedCampaign.name}
                            </h1>
                        </div>

                        <p className="w-[50%]">
                            {selectedCampaign?.description}
                        </p>
                        <div className="flex items-center gap-2 text-gray-600 mt-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                                {formatDate(selectedCampaign.start_date)} -{" "}
                                {formatDate(selectedCampaign.end_date)}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <TrendingUp className="w-4 h-4" />
                            <div>
                                <span>نسبة التحقيق :</span>{" "}
                                <span
                                    className={`${
                                        selectedCampaign?.average_success_rate <
                                        50
                                            ? "text-red-500"
                                            : selectedCampaign?.average_success_rate <
                                                80
                                              ? "text-yellow-500"
                                              : "text-green-500"
                                    }`}>
                                    {selectedCampaign.average_success_rate}%
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* <div className="flex  ">
                        <div className="flex items-center gap-2 text-gray-600 mt-2">
                            <Clock className="w-4 h-4" />
                            <span>
                                {formatDate(selectedCampaign.created_at)}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                            <User className="w-4 h-4" />
                            <span>
                                تم إنشاؤها بواسطة: {selectedCampaign.created_by}
                            </span>
                        </div>
                    </div> */}
                    <div className="flex justify-center items-center  gap-2 mt-5 md:mt-0">
                        <span
                            className={`px-3 py-1 rounded-md ${
                                selectedCampaign.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}>
                            {selectedCampaign.status === "active"
                                ? "نشط"
                                : "غير نشط"}
                        </span>
                        <CampaignsActionsBtn />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2 md:col-span-3 xl:col-span-1">
                    <AnalysisChart analaysis={selectedCampaign} />
                </div>
                <div className="col-span-2 md:col-span-3 xl:col-span-2">
                    <CampaignsChart id={id} />
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow ">
                <h1 className="text-2xl font-bold mb-4">أهداف الحملة</h1>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
                    {/* Total Sales */}
                    <AnalysisTotalSales selectedCampaign={selectedCampaign} />

                    {/* Category Sales */}

                    <AnalysisCategorySales
                        selectedCampaign={selectedCampaign}
                    />

                    {/* Product Sales */}
                    <AnalysisProductSales selectedCampaign={selectedCampaign} />

                    {/* average transaction value */}
                    <AnalysisAverageTransactionValue
                        selectedCampaign={selectedCampaign}
                    />

                    {/* Customer Registration  */}
                    <AnalysisCustomerRegistration
                        selectedCampaign={selectedCampaign}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1">
                <div className=" ">
                    {/* Metrics Cards */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between mb-4 flex-col md:flex-row">
                            <h2 className="text-xl font-semibold ">
                                مقاييس الحملة
                            </h2>
                            <DateFilter
                                onDateRangeChange={handleDateRangeChange}
                                selectedCampaign={selectedCampaign}
                            />
                        </div>
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-6">
                            {/* Total Sales Value */}
                            <MetricsTotalSalesValue
                                selectedCampaign={selectedCampaign}
                            />

                            {/* Sales of Category */}
                            <MetricsSalesofCategory
                                selectedCampaign={selectedCampaign}
                            />

                            {/* Sales of Specific Products */}
                            <MetricsSalesofSpecificProducts
                                selectedCampaign={selectedCampaign}
                            />

                            {/* Number of Products Sold */}
                            <MetricsNumberofProductsSold
                                selectedCampaign={selectedCampaign}
                            />

                            {/* Invoices Count */}
                            <MetricsInvoicesCount
                                selectedCampaign={selectedCampaign}
                            />

                            {/* Average Transaction Value */}
                            <MetricsAverageTransactionValue
                                selectedCampaign={selectedCampaign}
                            />

                            {/* Customer Registration */}
                            <MetricsCustomerRegistration
                                selectedCampaign={selectedCampaign}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignInfo;
