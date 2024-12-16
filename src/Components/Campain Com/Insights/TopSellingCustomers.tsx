import DataTable, { TableStyles } from "react-data-table-component";
import { SalesReport } from "../../../store/Campaigns/type/CampaignType";
import { useNavigate } from "react-router-dom";

interface TopSellingProductsProps {
    salesReport: SalesReport | null;
}

// Define the type for top_customers
interface TopCustomer {
    id: number;
    name: string;
    phone_number: string;
    city: string;
    total_sales: string;
}

// Custom styles for the table
const customStyles: TableStyles = {
    rows: {
        style: {
            minHeight: "60px",
        },
    },
    headCells: {
        style: {
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "#2d3748",
            color: "#fff",
            textAlign: "right",
        },
    },
    cells: {
        style: {
            fontSize: "15px",
            paddingLeft: "16px",
            paddingRight: "16px",
            textAlign: "right",
        },
    },
};

const TopSellingCustomers = ({ salesReport }: TopSellingProductsProps) => {
    const navigate = useNavigate();

    const topCustomers: TopCustomer[] =
        salesReport?.customers_behaviour?.top_customers || [];

    // Define columns for the table
    const columns = [
        {
            name: "الاسم",
            cell: (row: TopCustomer) => (
                <span
                    onClick={() => navigate(`/customer/${row.id}`)}
                    style={{ cursor: "pointer" }}>
                    <bdi>{row.name}</bdi>
                </span>
            ),
            sortable: true,
        },
        {
            name: "رقم الهاتف",
            cell: (row: TopCustomer) => (
                <span
                    onClick={() => navigate(`/customer/${row.id}`)}
                    style={{ cursor: "pointer" }}>
                    <bdi>{row.phone_number}</bdi>
                </span>
            ),
        },
        {
            name: "المدينة",
            cell: (row: TopCustomer) => (
                <span
                    onClick={() => navigate(`/customer/${row.id}`)}
                    style={{ cursor: "pointer" }}>
                    <bdi>{row.city}</bdi>
                </span>
            ),

            sortable: true,
        },
        {
            name: "إجمالي المبيعات",
            cell: (row: TopCustomer) =>
                `${Number(row.total_sales).toLocaleString()} ريال`,
            sortable: true,
        },
    ];

    return (
        <div className="bg-white p-5 rounded-md shadow-md" dir="rtl">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
                أعلى العملاء مبيعاً
            </h2>
            <DataTable
                columns={columns}
                data={topCustomers}
                customStyles={customStyles}
                pagination
                paginationRowsPerPageOptions={[5]}
                highlightOnHover
                striped
            />
        </div>
    );
};

export default TopSellingCustomers;
