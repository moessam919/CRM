import { useEffect } from "react";
import CampainList from "../Components/Campain Com/CampainList";
import CompianBoxes from "../Components/Campain Com/CompianBoxes";
import StatusCopmain from "../Components/Campain Com/StatusCopmain";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { actgetCampaignSummary } from "../store/Campaigns/act/CampaignSummary";

const Campain = () => {
    const dispatch = useAppDispatch();
    const { campaignSummary, loading } = useAppSelector(
        (state) => state.campaignSummary
    );

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
        <div className="bg-gray-200 min-h-[795px] rounded-md p-6">
            <div className="mb-5">
                <CompianBoxes campaignSummary={campaignSummary} />
            </div>
            <div className="mb-5">
                <StatusCopmain campaignSummary={campaignSummary} />
            </div>

            <div className="">
                <CampainList />
            </div>
        </div>
    );
};

export default Campain;
