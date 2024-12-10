import { ArrowDown, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import CampaignOverview from "./CampaignOverview";
import { useNavigate } from "react-router-dom";
import { actgetCampaigns } from "../../store/Campaigns/act/CampaignActions";
import debounce from "lodash/debounce";
import { useAppDispatch } from "../../store/hooks";
// import { useAppSelector } from "../../store/hooks";

// Status translation mapping
const STATUS_TRANSLATIONS = {
    all: "جميع الحالات",
    active: "نشط",
    draft: "مسودة",
    completed: "مكتمل",
};

const CampainList = () => {
    // const { campaigns, loading } = useAppSelector((state) => state.campaigns);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [selectedStatus, setSelectedStatus] = useState("جميع الحالات");
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    // Use English keys for backend, but keep Arabic for UI
    const statusOptions = Object.entries(STATUS_TRANSLATIONS).map(
        ([key, value]) => ({
            key,
            value,
        })
    );

    const debouncedSearch = debounce((term: string, status: string) => {
        dispatch(
            actgetCampaigns({
                searchTerm: term,
                status:
                    status !== "جميع الحالات"
                        ? Object.entries(STATUS_TRANSLATIONS).find(
                              ([, v]) => v === status
                          )?.[0]
                        : "",
            })
        );
    }, 300);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        debouncedSearch(value, selectedStatus);
    };

    const handleStatusSelect = (statusValue: string) => {
        setSelectedStatus(statusValue);
        setIsOpen(false);
        debouncedSearch(searchQuery, statusValue);
    };

    useEffect(() => {
        dispatch(
            actgetCampaigns({
                searchTerm: "",
                status: "",
            })
        );
    }, [dispatch]);

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

                    {/* Status Dropdown */}
                    <div className="relative">
                        <button
                            className="flex items-center gap-2 px-5 py-3 border rounded-lg hover:bg-gray-50 w-full md:w-auto justify-center"
                            onClick={() => setIsOpen(!isOpen)}>
                            <span>{selectedStatus}</span>
                            <ArrowDown
                                className={`w-4 h-4 transform transition-transform ${
                                    isOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>
                        {isOpen && (
                            <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-10">
                                {statusOptions.map(({ key, value }) => (
                                    <div
                                        key={key}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() =>
                                            handleStatusSelect(value)
                                        }>
                                        {value}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <button
                            onClick={() => navigate("/create-campaign")}
                            className="px-4 py-3 border bg-gray-600 text-white rounded-md hover:bg-gray-700 duration-150 flex gap-2">
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
