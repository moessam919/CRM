import { CalendarFold, FileText } from "lucide-react";
import { CampaignSummary } from "../../store/Campaigns/type/CampaignType";

interface CompianBoxesProps {
    campaignSummary: CampaignSummary | null;
}

const CompianBoxes = ({ campaignSummary }: CompianBoxesProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
            <div className="bg-white p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl text-gray-500 font-bold">إجمالي</h3>
                    <div className="text-gray-500">
                        {" "}
                        <FileText className="w-6 h-6" />
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-3xl font-bold mb-1">
                        {campaignSummary?.total_campaigns || 0}
                    </p>
                </div>
            </div>
            <div className="bg-white p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl text-gray-500 font-bold">
                        حملات هذا الشهر
                    </h3>
                    <div className="text-gray-500">
                        <CalendarFold className="w-6 h-6" />
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-3xl font-bold mb-1">
                        {campaignSummary?.this_month_campaigns_count || 0}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CompianBoxes;
