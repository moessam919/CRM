import { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Eye } from "lucide-react";
import LeadDetailsModal from "./LeadDetailsModal";

type Lead = {
    id: number;
    createdDate: string;
    name: string;
    phone: string;
    status: string;
};

const LeadsTable = () => {
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const leads: Lead[] = [
        {
            id: 1,
            createdDate: "2024-10-29",
            name: "أحمد محمد",
            phone: "123-456-7890",
            status: "جديد",
        },
        {
            id: 2,
            createdDate: "2024-10-28",
            name: "فاطمة علي",
            phone: "987-654-3210",
            status: "تم الاتصال",
        },
        {
            id: 3,
            createdDate: "2024-10-29",
            name: "أحمد محمد",
            phone: "123-456-7890",
            status: "جديد",
        },
        {
            id: 4,
            createdDate: "2024-10-28",
            name: "فاطمة علي",
            phone: "987-654-3210",
            status: "تم الاتصال",
        },
        {
            id: 5,
            createdDate: "2024-10-29",
            name: "أحمد محمد",
            phone: "123-456-7890",
            status: "جديد",
        },
        {
            id: 6,
            createdDate: "2024-10-28",
            name: "فاطمة علي",
            phone: "987-654-3210",
            status: "تم الاتصال",
        },
        {
            id: 7,
            createdDate: "2024-10-29",
            name: "أحمد محمد",
            phone: "123-456-7890",
            status: "جديد",
        },
        {
            id: 8,
            createdDate: "2024-10-28",
            name: "فاطمة علي",
            phone: "987-654-3210",
            status: "تم الاتصال",
        },
        {
            id: 9,
            createdDate: "2024-10-29",
            name: "أحمد محمد",
            phone: "123-456-7890",
            status: "جديد",
        },
        {
            id: 10,
            createdDate: "2024-10-28",
            name: "فاطمة علي",
            phone: "987-654-3210",
            status: "تم الاتصال",
        },
        {
            id: 11,
            createdDate: "2024-10-29",
            name: "أحمد محمد",
            phone: "123-456-7890",
            status: "جديد",
        },
        {
            id: 12,
            createdDate: "2024-10-28",
            name: "فاطمة علي",
            phone: "987-654-3210",
            status: "تم الاتصال",
        },
    ];

    const columns: TableColumn<Lead>[] = [
        {
            name: "تاريخ الإنشاء",
            selector: (row) => row.createdDate,
            sortable: true,
        },
        {
            name: "الاسم",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "الهاتف",
            selector: (row) => row.phone,
            sortable: true,
        },
        {
            name: "الحالة",
            selector: (row) => row.status,
            sortable: true,
        },
        {
            name: "إجراء",
            cell: (row) => (
                <button
                    className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 duration-200 p-2 rounded-md"
                    onClick={() => handleViewDetails(row)}
                >
                    <Eye />
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: "60px",
            },
        },
        headCells: {
            style: {
                fontSize: "14px",
                fontWeight: "bold",
                backgroundColor: "#2d3748",
                color: "#fff",
            },
        },
        cells: {
            style: {
                paddingLeft: "16px",
                paddingRight: "16px",
            },
        },
    };

    const handleViewDetails = (lead: Lead) => {
        setSelectedLead(lead);
        setIsModalOpen(true);
    };

    const filteredLeads = leads.filter(
        (lead) =>
            lead.name.includes(searchTerm) ||
            lead.phone.includes(searchTerm) ||
            lead.status.includes(searchTerm) ||
            lead.createdDate.includes(searchTerm)
    );

    return (
        <div className="bg-white p-6 rounded-md grid grid-cols-1 shadow-md">
            <div className=" md:w-96">
                <input
                    type="text"
                    placeholder="بحث..."
                    className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4 duration-100"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <DataTable
                columns={columns}
                data={filteredLeads || "لا يوجد بيانات"}
                pagination
                paginationRowsPerPageOptions={[10, 15]}
                noDataComponent={
                    <div className="text-gray-500 py-4">لا يوجد بيانات</div>
                }
                striped
                highlightOnHover
                responsive
                customStyles={customStyles}
            />
            {isModalOpen && selectedLead && (
                <LeadDetailsModal
                    lead={selectedLead}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default LeadsTable;
