import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { actGetTopCustomers } from "../store/Customers/act/actGetCustomers";
import { ITopCustomer } from "../types/TopCustomer";
import { useNavigate } from "react-router-dom";

const TopBuyersTable = () => {
    const { TopCustomers, loading } = useAppSelector(
        (state) => state.TopCustomers
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(actGetTopCustomers());
    }, [dispatch]);

    const navigate = useNavigate();

    // Define table columns
    const columns: TableColumn<ITopCustomer>[] = [
        {
            name: "اسم العميل",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "رقم الجوال",
            cell: (row) => <bdi>{row.phone_number}</bdi>,
            sortable: true,
        },
        {
            name: "البريد الإلكتروني",
            selector: (row) => row.email_address || "",
            sortable: true,
        },
        {
            name: "نوع العميل",
            selector: (row) =>
                row.customer_type === "b2c"
                    ? "عميل فردي"
                    : row.customer_type === "b2b"
                      ? "عميل تجاري"
                      : "غير معروف",
            sortable: true,
        },
        {
            name: "إجمالي المبيعات",
            selector: (row) => row.total_sales.toFixed(2).toLocaleString(),
            sortable: true,
        },
        {
            name: "آخر فاتورة",
            selector: (row) =>
                row.last_invoice_date === "No invoices yet" ||
                !row.last_invoice_date
                    ? "لم يتم الطلب"
                    : new Date(row.last_invoice_date).toLocaleDateString(
                          "ar-EG",
                          {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                          }
                      ),
            sortable: true,
        },
        {
            name: "تفاصيل",
            cell: (row) => (
                <div
                    onClick={() => navigate(`/customer/${row.id}`)}
                    className="border-gray-300 hover:bg-gray-200 duration-200 cursor-pointer text-xs py-3 text-center rounded font-semibold  p-1"
                >
                    عرض التفاصيل
                </div>
            ),
        },
    ];

    const [rowsPerPage] = useState<number>(5);

    return (
        <div className="p-4 bg-white rounded-md shadow-md min-h-[499px] overflow-auto">
            <h2 className="text-lg font-bold text-gray-500 mb-4">
                العملاء ذو أعلى قيمة طلبات
            </h2>
            <DataTable
                columns={columns}
                data={TopCustomers}
                pagination
                paginationPerPage={rowsPerPage}
                paginationRowsPerPageOptions={[5, 10]}
                progressPending={loading === "pending"} // Show loading indicator
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

export default TopBuyersTable;
