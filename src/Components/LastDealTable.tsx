import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { actGetLatestInvoices } from "../store/Invoice/act/actGetInvoices";
import { Invoice } from "../types/invoice";
import { Link } from "react-router-dom";


const LastDealTable = () => {
    const {invoices  } = useAppSelector((state) => state.Invoice)
    const dispatch = useAppDispatch() 
    useEffect(() => {
        dispatch(actGetLatestInvoices())

    },[dispatch])
    const [rowsPerPage] = useState<number>(5);
    console.log(invoices);


    // Define table columns
const columns: TableColumn<Invoice>[] = [
    {
        name: "رقم الفاتورة",
        selector: (row) => row.ref_number,
        sortable: true,
    },
    {
        name: "العميل",
        selector: (row) => row.customer,
        sortable: true,
    },
    {
        name: "الفرع",
        selector: (row) => row.branch,
        sortable: true,
    },
    {
        name: "القيمة",
        selector: (row) => row.value,
        sortable: true,
    },
    {
        name: "تفاصيل",
        cell: (row) => (
          
            <Link  to={`${row.url}`}  
            target="_blank"
            className="border-gray-300 hover:bg-gray-200 duration-200 cursor-pointer text-xs py-3 text-center rounded font-semibold  p-1">
                عرض التفاصيل
            </Link>
        ),
    },
];

    
    return (
        <div className="p-4 bg-white rounded-md shadow-md">
            <h2 className="text-lg font-bold text-gray-500 mb-4">
                آخر عمليات البيع
            </h2>
            <DataTable
                columns={columns}
                data={invoices}
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
