import { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

interface Deal {
    name: string;
    amount: number;
    vat: number;
    status: string;
}

const deals: Deal[] = [
    { name: "الصفحة أ", amount: 2500, vat: 125, status: "مكتمل" },
    { name: "الصفحة ب", amount: 4000, vat: 200, status: "قيد الانتظار" },
    { name: "الصفحة ج", amount: 1500, vat: 75, status: "ملغي" },
    { name: "الصفحة ج", amount: 1500, vat: 75, status: "ملغي" },
    { name: "الصفحة ج", amount: 1500, vat: 75, status: "ملغي" },
    { name: "الصفحة ج", amount: 1500, vat: 75, status: "ملغي" },
    { name: "الصفحة ج", amount: 1500, vat: 75, status: "ملغي" },
    { name: "الصفحة ج", amount: 1500, vat: 75, status: "ملغي" },
    { name: "الصفحة ج", amount: 1500, vat: 75, status: "ملغي" },
];

// Define table columns
const columns: TableColumn<Deal>[] = [
    {
        name: "اسم العميل",
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: "المبلغ",
        selector: (row) => row.amount,
        sortable: true,
    },
    {
        name: "الضريبة",
        selector: (row) => row.vat,
        sortable: true,
    },
    {
        name: "حالة الطلب",
        selector: (row) => row.status,
        sortable: true,
    },
    {
        name: "تفاصيل",
        cell: () => (
            <div className="border-gray-300 hover:bg-gray-200 duration-200 cursor-pointer text-xs py-3 text-center rounded font-semibold  p-1">
                عرض التفاصيل
            </div>
        ),
    },
];

const LastDealTable = () => {
    const [rowsPerPage] = useState<number>(5);

    return (
        <div className="p-4 bg-white rounded-md shadow-md">
            <h2 className="text-lg font-bold text-gray-500 mb-4">
                آخر الصفقات
            </h2>
            <DataTable
                columns={columns}
                data={deals}
                pagination
                paginationPerPage={rowsPerPage}
                paginationRowsPerPageOptions={[5, 10]}
                noDataComponent={
                    <div className="text-gray-500 py-4">لا يوجد بيانات</div>
                }
                responsive
                customStyles={{
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
                            fontSize: "14px",
                        },
                    },
                }}
            />
        </div>
    );
};

export default LastDealTable;
