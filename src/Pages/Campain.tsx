import CampainList from "../Components/Campain Com/CampainList";
import CompianBoxes from "../Components/Campain Com/CompianBoxes";
import StatusCopmain from "../Components/Campain Com/StatusCopmain";

const Campain = () => {
    return (
        <div className="bg-gray-200 min-h-[795px] rounded-md p-6">
            <div className="mb-5">
                <CompianBoxes />
            </div>
            <div className="mb-5">
                <StatusCopmain />
            </div>

            <div className="">
                <CampainList />
            </div>
        </div>
    );
};

export default Campain;
