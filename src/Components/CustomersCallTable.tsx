import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { CustomerFilters, ICustomers } from "../types/customers";
import MessagePopup from "./messagePopup/MessagePopup";
import WhatsAppPopup from "./messagePopup/WhatsAppPopup";
import EmailPopup from "./messagePopup/EmailPopup";
import { Phone, MessageSquare, Mail, Pencil, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditCustomerPopup from "./EditCustomerModal/EditCustomerPopup";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { actGetFilteredCustomers } from "../store/Customers/act/actGetCustomers";
import FilterModal from "./ContactFilter/FilterModal";

interface CustomersCallTableProps {
    customers: ICustomers[];
}

const CustomersCallTable: React.FC<CustomersCallTableProps> = ({
    customers,
}) => {
    const { currentFilters, currentPage } = useAppSelector(
        (state) => state.Customers
    );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [filterText, setFilterText] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState<ICustomers | null>(
        customers[0]
    );
    const [selectedRows, setSelectedRows] = useState<ICustomers[]>([]);
    const [MessageOpen, setIsMessageOpen] = useState(false);
    const [WhatsOpen, setIsWhatsOpen] = useState(false);
    const [EmailOpen, setIsEmailOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Filter Modal
    const handleApplyFilters = (filters: CustomerFilters) => {
        dispatch(
            actGetFilteredCustomers({
                filters,
                pageNumber: currentPage,
            })
        );
        setIsFilterOpen(false);
    };

    const handleEdit = (customer: ICustomers) => {
        setSelectedCustomer(customer);
        setIsEditOpen(true);
    };

    // Handle calling customer
    const handleCall = (phone: number) => {
        window.location.href = `tel:${phone}`;
    };

    // Handle Bulk SMS
    const handleBulkSMS = (customer?: ICustomers) => {
        if (customer) {
            setSelectedRows([customer]);
        }
        setIsMessageOpen(true);
    };

    // Handle Bulk Email
    const handleBulkEmail = (customer?: ICustomers) => {
        if (customer) {
            setSelectedRows([customer]);
        }
        setIsEmailOpen(true);
    };

    // Handle Bulk WhatsApp
    const handleBulkWhatsApp = (customer?: ICustomers) => {
        if (customer) {
            setSelectedRows([customer]);
        }
        setIsWhatsOpen(true);
    };

    // Handle row click
    const handleRowClick = (row: ICustomers) => {
        setSelectedCustomer(row);
    };

    // search
    useEffect(() => {
        const x = setTimeout(() => {
            let searchParams: CustomerFilters = {};
            if (filterText.includes("@")) {
                searchParams = { email: filterText };
            } else if (Number(filterText)) {
                searchParams = { phone: filterText };
            } else {
                searchParams = { name: filterText };
            }

            dispatch(
                actGetFilteredCustomers({
                    filters: searchParams,
                    pageNumber: currentPage,
                })
            );
        }, 1000);
        return () => clearTimeout(x);
    }, [filterText, dispatch, currentPage]);

    // date Handle
    const formatArabicDate = (isoDate: string): string => {
        const date = new Date(isoDate);
        const formatter = new Intl.DateTimeFormat("ar-EG", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        });
        return formatter.format(date);
    };

    // Define table columns
    const columns: TableColumn<ICustomers>[] = [
        {
            name: "نوع العميل",
            cell: (row: ICustomers) => (
                <span
                    onClick={() => navigate(`/customer/${row.id}`)}
                    style={{ cursor: "pointer" }}
                >
                    {row.customer_type === "b2b" ? "شركات" : "افراد"}
                </span>
            ),
            sortable: true,
        },

        {
            name: "الاسم",
            cell: (row: ICustomers) => (
                <span
                    onClick={() => navigate(`/customer/${row.id}`)}
                    style={{ cursor: "pointer" }}
                >
                    {row.name}
                </span>
            ),
            sortable: true,
        },
        {
            name: "البريد الإلكتروني",
            cell: (row: ICustomers) => (
                <span
                    onClick={() => navigate(`/customer/${row.id}`)}
                    style={{ cursor: "pointer" }}
                >
                    {row.email_address || ""}
                </span>
            ),
            sortable: true,
        },
        {
            name: "العنوان",
            cell: (row: ICustomers) => (
                <span
                    onClick={() => navigate(`/customer/${row.id}`)}
                    style={{ cursor: "pointer" }}
                >
                    {row.billing_address || ""}
                </span>
            ),
            sortable: true,
        },
        {
            name: "رقم الهاتف",
            cell: (row: ICustomers) => (
                <span
                    onClick={() => navigate(`/customer/${row.id}`)}
                    style={{ cursor: "pointer" }}
                >
                    {row.phone_number ? row.phone_number.toString() : ""}
                </span>
            ),
            sortable: true,
        },
        {
            name: "اجمالي المشتريات",
            cell: (row) => (
                <span
                    onClick={() => navigate(`/customer/${row.id}`)}
                    style={{ cursor: "pointer" }}
                >
                    {row.total_sales}
                </span>
            ),
            sortable: true,
        },

        {
            name: "تاريخ الاضاافة",
            cell: (row) => (
                <span
                    onClick={() => navigate(`/customer/${row.id}`)}
                    style={{ cursor: "pointer" }}
                >
                    {formatArabicDate(row.created_at)}
                </span>
            ),
            sortable: true,
        },
        {
            name: "اخر عملية شراء",
            cell: (row) => (
                <span
                    onClick={() => navigate(`/customer/${row.id}`)}
                    style={{ cursor: "pointer" }}
                >
                    {row.last_invoice_date === null
                        ? ""
                        : formatArabicDate(row.last_invoice_date)}
                </span>
            ),
            sortable: true,
        },
        {
            name: "الإجراءات",
            cell: (row: ICustomers) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleCall(row.phone_number)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                        title="اتصال"
                    >
                        <Phone size={20} />
                    </button>
                    <button
                        onClick={() => handleBulkEmail(row)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-md transition-colors"
                        title="بريد إلكتروني"
                    >
                        <Mail size={20} />
                    </button>
                    <button
                        onClick={() => handleBulkWhatsApp(row)}
                        className="p-2 text-green-500 hover:bg-green-100 rounded-md transition-colors"
                        title="واتساب"
                    >
                        <img
                            src="/src/assets/whatsapp.png"
                            alt="whatsappIcon"
                            className="w-5"
                        />
                    </button>
                    <button
                        onClick={() => handleBulkSMS(row)}
                        className="p-2 text-purple-600 hover:bg-purple-100 rounded-md transition-colors"
                        title="رسالة نصية"
                    >
                        <MessageSquare size={20} />
                    </button>

                    <button
                        onClick={() => handleEdit(row)}
                        className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-md transition-colors"
                        title="تعديل"
                    >
                        <span>
                            <Pencil />
                        </span>
                    </button>
                </div>
            ),
            width: "250px",
        },
    ];

    // Filter logic

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
        table: {
            style: {
                height: "58vh",
                overflow: "auto",
            },
        },
    };
    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="col-span-1 xl:col-span-2">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-500">
                        قائمة العملاء
                    </h2>
                </div>
                <div className="flex justify-between items-center flex-col md:flex-row mb-4">
                    <input
                        type="text"
                        placeholder="بحث..."
                        className="p-2 border rounded-lg md:w-96 focus:outline-none focus:ring-2 focus:ring-gray-500 duration-100 mb-4 md:mb-0"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className="flex items-center gap-2 border border-gray-500 hover:border-[#0d9a86] hover:text-white px-4 py-2 rounded-lg hover:bg-[#0d9a86] duration-150"
                        title="فلترة"
                    >
                        <Filter size={16} />
                    </button>

                    {selectedRows.length > 1 && (
                        <div className="flex gap-2 mt-4 md:mt-0">
                            <button
                                onClick={() => handleBulkEmail()}
                                className="flex items-center gap-2 border border-gray-500 hover:border-[#0d9a86]  hover:text-white px-4 py-2 rounded-lg hover:bg-[#0d9a86] duration-150"
                                title="إرسال بريد إلكتروني للمحددين"
                            >
                                <Mail size={16} />({selectedRows.length})
                            </button>
                            <button
                                onClick={() => handleBulkWhatsApp()}
                                className="flex items-center gap-2 border border-gray-500 hover:border-[#0d9a86]  hover:text-white px-4 py-2 rounded-lg hover:bg-[#0d9a86] duration-150"
                                title="إرسال واتساب للمحددين"
                            >
                                <img
                                    src="/src/assets/whatsapp.png"
                                    alt="whatsappIcon"
                                    className="w-5"
                                />
                                ({selectedRows.length})
                            </button>
                            <button
                                onClick={() => handleBulkSMS()}
                                className="flex items-center gap-2 border border-gray-500 hover:border-[#0d9a86]  hover:text-white px-4 py-2 rounded-lg hover:bg-[#0d9a86] duration-150"
                                title="إرسال رسالة نصية للمحددين"
                            >
                                <MessageSquare size={16} />(
                                {selectedRows.length})
                            </button>
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-1 rounded-md">
                    <DataTable
                        columns={columns}
                        data={customers}
                        pagination
                        paginationRowsPerPageOptions={[10, 15]}
                        customStyles={customStyles}
                        noDataComponent={
                            <div className="text-gray-500 py-4">
                                لا يوجد بيانات
                            </div>
                        }
                        striped
                        highlightOnHover
                        responsive
                        onRowClicked={handleRowClick}
                        selectableRows
                        onSelectedRowsChange={({ selectedRows }) =>
                            setSelectedRows(selectedRows)
                        }
                    />
                </div>

                {/* Filter Customer Popup */}

                {isFilterOpen && (
                    <FilterModal
                        isOpen={isFilterOpen}
                        onClose={() => setIsFilterOpen(false)}
                        onSubmit={handleApplyFilters}
                        initialFilters={currentFilters}
                    />
                )}

                {/* Edit Customer Popup */}
                {isEditOpen && selectedCustomer && (
                    <EditCustomerPopup
                        isOpen={isEditOpen}
                        onClose={() => setIsEditOpen(false)}
                        customer={selectedCustomer}
                    />
                )}

                {/* Popups */}
                {MessageOpen && (
                    <MessagePopup
                        isOpen={MessageOpen}
                        onClose={() => setIsMessageOpen(false)}
                        customers={selectedRows}
                    />
                )}

                {WhatsOpen && (
                    <WhatsAppPopup
                        isOpen={WhatsOpen}
                        onClose={() => setIsWhatsOpen(false)}
                        customers={selectedRows}
                    />
                )}

                {EmailOpen && (
                    <EmailPopup
                        isOpen={EmailOpen}
                        onClose={() => setIsEmailOpen(false)}
                        customers={selectedRows}
                    />
                )}

                {/* Selected Customer Details */}
            </div>
        </div>
    );
};

export default CustomersCallTable;
