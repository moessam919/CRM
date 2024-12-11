import { ChartPie } from "lucide-react";
import { CampaignSummary } from "../../store/Campaigns/type/CampaignType";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface CompianBoxesProps {
    campaignSummary: CampaignSummary | null;
}

const StatusCopmain = ({ campaignSummary }: CompianBoxesProps) => {
    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const activeCampaigns = campaignSummary?.active_campaigns || [];
    const totalCampaigns = activeCampaigns.length;

    useEffect(() => {
        const timer = setInterval(() => {
            if (totalCampaigns > 1) {
                setCurrentIndex((prev) =>
                    prev === totalCampaigns - 1 ? 0 : prev + 1
                );
            }
        }, 5000);

        return () => clearInterval(timer);
    }, [totalCampaigns]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === totalCampaigns - 1 ? 0 : prev + 1));
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? totalCampaigns - 1 : prev - 1));
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const minSwipeDistance = 50;

        if (Math.abs(distance) < minSwipeDistance) return;

        if (distance > 0) {
            handleNext();
        } else {
            handlePrev();
        }

        setTouchStart(0);
        setTouchEnd(0);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {/* Campaign Status Box */}
            <div className="bg-white p-5 rounded-md shadow-md hover:translate-y-1 duration-200 col-span-2 xl:col-span-1">
                <div className="flex items-center justify-between gap-2 mb-4">
                    <h3 className="text-xl text-gray-500 font-bold">
                        حالة الحملات
                    </h3>
                    <div className="text-gray-500">
                        <ChartPie />
                    </div>
                </div>

                <div className="mt-2 flex items-center justify-between text-xl">
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-green-500"></span>
                        <h2 className="font-bold text-gray-500">نشط</h2>
                    </div>
                    <p className="font-bold p-2">
                        {campaignSummary?.active_campaigns_count || 0}
                    </p>
                </div>

                <div className="mt-2 flex items-center justify-between text-xl">
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-yellow-500"></span>
                        <h2 className="font-bold text-gray-500">مسودة</h2>
                    </div>
                    <p className="font-bold p-2">
                        {campaignSummary?.draft_campaigns_count || 0}
                    </p>
                </div>

                <div className="mt-2 flex items-center justify-between text-xl">
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-gray-500"></span>
                        <h2 className="font-bold text-gray-500">اكتملت</h2>
                    </div>
                    <p className="font-bold p-2">
                        {campaignSummary?.completed_campaigns_count || 0}
                    </p>
                </div>
            </div>

            {/* Active Campaigns Display */}
            <div className="bg-white p-5 rounded-md shadow-md hover:translate-y-1 duration-200 col-span-2 relative">
                <div className="flex items-center justify-between gap-2 mb-4">
                    <h3 className="text-xl text-gray-500 font-bold">
                        الحملات النشطة
                    </h3>
                </div>

                <div
                    className="h-[200px] relative"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}>
                    {totalCampaigns > 0 ? (
                        <>
                            <div className="h-full">
                                <div
                                    onClick={() =>
                                        navigate(
                                            `/campaign/${activeCampaigns[currentIndex].id}`
                                        )
                                    }
                                    className="bg-gray-100 p-6 rounded-lg h-full grid grid-cols-1 md:grid-cols-2 text-center md:text-start items-center md:gap-96 cursor-pointer">
                                    <div>
                                        <div>
                                            <div className=" mb-3">
                                                <h4 className="text-xl md:text-2xl font-semibold text-gray-800">
                                                    {
                                                        activeCampaigns[
                                                            currentIndex
                                                        ].name
                                                    }
                                                </h4>
                                            </div>
                                            <p className="text-gray-600 mb-4 line-clamp-2 text-lg">
                                                {
                                                    activeCampaigns[
                                                        currentIndex
                                                    ].description
                                                }
                                            </p>
                                        </div>
                                        <div>
                                            <div className="text-xl text-gray-500">
                                                من:{" "}
                                                {new Date(
                                                    activeCampaigns[
                                                        currentIndex
                                                    ].start_date
                                                ).toLocaleDateString(
                                                    "ar-EG"
                                                )}{" "}
                                                - الي:{" "}
                                                {new Date(
                                                    activeCampaigns[
                                                        currentIndex
                                                    ].end_date
                                                ).toLocaleDateString("ar-EG")}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center md:justify-start items-center md:items-start text-sm gap-2 text-gray-500 mb-2">
                                        <div className="text-lg flex items-center flex-col ">
                                            <p
                                                className={`mb-1 text-lg md:text-2xl  font-bold ${
                                                    activeCampaigns[
                                                        currentIndex
                                                    ].success_rate < 50
                                                        ? "text-red-500"
                                                        : activeCampaigns[
                                                                currentIndex
                                                            ].success_rate < 80
                                                          ? "text-yellow-500"
                                                          : "text-green-500"
                                                }`}>
                                                {activeCampaigns[currentIndex]
                                                    .success_rate || 0}
                                                %
                                            </p>
                                            <span className="font-bold">
                                                نسبة تحقيق الهدف
                                            </span>
                                            <p
                                                className=" mt-2 cursor-pointer  hover:text-gray-600"
                                                onClick={() => {
                                                    navigate(
                                                        `/campaign/${activeCampaigns[currentIndex].id}`
                                                    );
                                                }}>
                                                عرض التفاصيل
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {totalCampaigns > 1 && (
                                <>
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                        {activeCampaigns.map((_, index) => (
                                            <div
                                                key={index}
                                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                    index === currentIndex
                                                        ? "w-4 bg-gray-600"
                                                        : "bg-gray-300"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <div className="text-center text-gray-500 py-8">
                            لا توجد حملات نشطة حالياً
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatusCopmain;
