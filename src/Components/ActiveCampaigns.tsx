import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { actgetCampaignSummary } from "../store/Campaigns/act/CampaignSummary";
import { useEffect } from "react";

const ActiveCampaigns = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const { campaignSummary, loading } = useAppSelector(
        (state) => state.campaignSummary
    );

    const activeCampaigns = campaignSummary?.active_campaigns || [];

    useEffect(() => {
        dispatch(actgetCampaignSummary());
    }, [dispatch]);

    if (loading === "pending") {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-300 border-solid border-opacity-50"></div>
            </div>
        );
    }

    return (
        <div className="bg-white p-5 rounded-md shadow-md">
            <div className="mb-4">
                <h3 className="text-xl text-gray-500 font-bold">
                    الحملات النشطة
                </h3>
            </div>

            <div className="min-h-[415px] max-h-[415px] overflow-auto">
                {activeCampaigns.length > 0 ? (
                    <div className="space-y-4 ">
                        {activeCampaigns.map((campaign, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    navigate(`/campaign/${campaign.id}`);
                                }}
                                className="bg-gray-100 p-6 rounded-lg flex justify-between flex-col md:flex-row text-center md:text-start items-centers cursor-pointer">
                                <div className="mb-2 md:mb-0">
                                    <div>
                                        <div className=" mb-3">
                                            <h4 className="text-xl md:text-2xl font-semibold text-gray-800">
                                                {campaign.name}
                                            </h4>
                                        </div>
                                        <p className="text-gray-600 mb-4 line-clamp-2 text-lg">
                                            {campaign.description}
                                        </p>
                                    </div>
                                    <div>
                                        <div className="text-xl text-gray-500">
                                            من:{" "}
                                            {new Date(
                                                campaign.start_date
                                            ).toLocaleDateString("ar-EG")}{" "}
                                            - الي:{" "}
                                            {new Date(
                                                campaign.end_date
                                            ).toLocaleDateString("ar-EG")}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center md:justify-start items-center md:items-start text-sm gap-2 text-gray-500 mb-2">
                                    <div className="text-lg flex items-center flex-col ">
                                        <p
                                            className={`mb-1 text-lg md:text-2xl  font-bold ${
                                                campaign.success_rate < 50
                                                    ? "text-red-500"
                                                    : campaign.success_rate < 80
                                                      ? "text-yellow-500"
                                                      : "text-green-500"
                                            }`}>
                                            {campaign.success_rate || 0}%
                                        </p>
                                        <span className="font-bold">
                                            نسبة تحقيق الهدف
                                        </span>
                                        <p
                                            className=" mt-2 cursor-pointer  hover:text-gray-600"
                                            onClick={() => {
                                                navigate(
                                                    `/campaign/${campaign.id}`
                                                );
                                            }}>
                                            عرض التفاصيل
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-8">
                        لا توجد حملات نشطة حالياً
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActiveCampaigns;
