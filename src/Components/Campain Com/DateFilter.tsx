import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { selectedCampaign } from "../../store/Campaigns/type/CampaignType";

interface DateFilterProps {
    onDateRangeChange: (startDate: Date, endDate: Date) => void;
    selectedCampaign: selectedCampaign;
}

const DateFilter: React.FC<DateFilterProps> = ({
    onDateRangeChange,
    selectedCampaign,
}) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleDateRangeChange = () => {
        if (!startDate || !endDate) {
            setErrorMessage("يرجى اختيار تاريخ البداية وتاريخ النهاية.");
            return;
        }

        setErrorMessage(null);
        onDateRangeChange(startDate, endDate);
    };

    const dateRange = selectedCampaign?.start_date
        ? new Date(selectedCampaign.start_date)
        : null;

    const minStartDate = dateRange
        ? new Date(dateRange.getTime() - 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0]
        : "";

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            setErrorMessage(null);
        }
    }, [errorMessage]);

    return (
        <div className="flex flex-col text-center items-center xl:items-start mt-4 xl:mt-0">
            <h3 className="text-center xl:text-start font-bold">
                تغيير الفترة
            </h3>
            <div className="flex flex-col md:flex-row items-center gap-4 mt-2 md:mt-0">
                <p className="font-bold">من</p>
                <div>
                    <input
                        title="اختر تاريخ البداية"
                        type="date"
                        id="startDate"
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        value={startDate?.toISOString().split("T")[0] || ""}
                        max={minStartDate}
                        onChange={(e) => setStartDate(new Date(e.target.value))}
                    />
                </div>
                <p className="font-bold">إلى</p>
                <div>
                    <input
                        title="اختر تاريخ النهاية"
                        type="date"
                        id="endDate"
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        value={endDate?.toISOString().split("T")[0] || ""}
                        min={
                            startDate
                                ? startDate.toISOString().split("T")[0]
                                : ""
                        }
                        onChange={(e) => setEndDate(new Date(e.target.value))}
                    />
                </div>

                <button
                    onClick={handleDateRangeChange}
                    className="flex-col-reverse border  w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-bold ">
                    تحديث البيانات
                </button>
            </div>
        </div>
    );
};

export default DateFilter;
