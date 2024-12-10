import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

const CampaignOverview = () => {
    const navigate = useNavigate();
    const { campaigns, loading } = useSelector(
        (state: RootState) => state.campaigns
    );

    if (loading === "pending") {
        return <div className="text-center py-4">جاري التحميل...</div>;
    }

    if (campaigns.length === 0) {
        return <div className="text-center py-4">لا توجد حملات</div>;
    }

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ar-EG", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getArabicStatus = (status: string): string => {
        const statusMap: { [key: string]: string } = {
            active: "نشط",
            draft: "مسودة",
            completed: "مكتمل",
            pending: "قيد الانتظار",
            cancelled: "ملغي",
        };
        return statusMap[status.toLowerCase()] || status;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-2">
            {campaigns.map((campaign) => (
                <div
                    key={campaign.id}
                    onClick={() => navigate(`/campaign/${campaign.id}`)}
                    className="bg-white p-5 rounded-md border-2 hover:translate-y-1 duration-200 cursor-pointer">
                    <div className="flex items-center justify-between gap-2">
                        <h3 className="text-xl text-gray-500 font-bold">
                            {campaign.name}
                        </h3>
                        <div className="px-3 py-1 text-xs rounded-md bg-gray-100 text-gray-800">
                            {getArabicStatus(campaign.status)}
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="text-gray-500">{campaign.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                            <p className="text-gray-500 font-bold">
                                {formatDate(campaign.start_date)} -{" "}
                                {formatDate(campaign.end_date)}
                            </p>
                        </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                        <p className="text-gray-500 font-bold">
                            نسبة تحقيق الهدف: {campaign.success_rate} %
                        </p>
                        <p className="text-gray-500 font-bold">
                            {campaign.metrics_count > 1
                                ? `${campaign.metrics_count} اهداف`
                                : `${campaign.metrics_count} هدف`}
                        </p>
                    </div>

                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-gray-600 h-2.5 rounded-full"
                            style={{
                                width: `${campaign.success_rate > 100 ? 100 : campaign.success_rate}%`,
                            }}></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CampaignOverview;
