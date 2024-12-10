import { ArrowDown, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import CampaignOverview from "./CampaignOverview";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actgetCampaigns } from "../../store/Campaigns/act/CampaignActions";
import { AppDispatch } from "../../store/store";
import debounce from "lodash/debounce";

const CampainList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [selectedStatus, setSelectedStatus] = useState("جميع الحالات");
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const statusOptions = ["جميع الحالات", "نشط", "مسودة", "مكتمل"];

    const debouncedSearch = debounce((term: string) => {
        dispatch(actgetCampaigns(term));
    }, 300);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        debouncedSearch(value);
    };

    useEffect(() => {
        dispatch(actgetCampaigns(""));
        return () => {
            debouncedSearch.cancel();
        };
    }, [dispatch, debouncedSearch]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleStatusSelect = (status: string) => {
        setSelectedStatus(status);
        setIsOpen(false);
    };

    return (
        <>
            <div className="bg-white p-5 rounded-md shadow-md  ">
                <div className="flex flex-col md:flex-row gap-4 mb-5">
                    {/* Search by title or customer name */}
                    <div className="flex-1 relative">
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="البحث في الحملات..."
                            className="w-full pr-10 pl-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 duration-150"
                        />
                    </div>

                    <div className="relative">
                        <button
                            className="flex items-center gap-2 px-5 py-3 border rounded-lg hover:bg-gray-50 w-full md:w-auto justify-center"
                            onClick={toggleDropdown}>
                            <span>{selectedStatus}</span>
                            <ArrowDown
                                className={`w-4 h-4 transform transition-transform ${
                                    isOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>
                        {isOpen && (
                            <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-10">
                                {statusOptions.map((status, index) => (
                                    <div
                                        key={index}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() =>
                                            handleStatusSelect(status)
                                        }>
                                        {status}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <button
                            onClick={() => navigate("/create-campaign")}
                            className="px-4 py-3 border hover:text-white rounded-md hover:bg-gray-600 duration-150 flex gap-2">
                            انشاء حملة
                            <Plus />
                        </button>
                    </div>
                </div>

                <div className="max-h-[299px] min-h-[299px] overflow-auto">
                    <CampaignOverview />
                </div>
            </div>
        </>
    );
};

export default CampainList;
