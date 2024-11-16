import LeadsBoxes from "../Components/LeadsBoxes";
import LeadsTable from "../Components/LeadsTable";

const Leads = () => {
    return (
        <div className="bg-gray-200 min-h-[795px] rounded-md">
            <div className="p-6">
                <LeadsBoxes />
            </div>

            <div className="p-6 pt-0">
                <LeadsTable />
            </div>
        </div>
    );
};

export default Leads;
