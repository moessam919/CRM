import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { CustomerFilters, ICustomers } from "../types/customers";
import MessagePopup from "./messagePopup/MessagePopup";
import WhatsAppPopup from "./messagePopup/WhatsAppPopup";
import EmailPopup from "./messagePopup/EmailPopup";
import {
    Phone,
    MessageSquare,
    Mail,
    Pencil,
    Filter,
    MessageCircle,
    Download,
    EllipsisVertical,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditCustomerPopup from "./EditCustomerModal/EditCustomerPopup";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
    actExportCustomers,
    actGetFilteredCustomers,
} from "../store/Customers/act/actGetCustomers";
import FilterModal from "./ContactFilter/FilterModal";
import BulkMessagePopup from "./BulkMessagesPopup/BulkMessagePopup";
import BulkEmailPopup from "./BulkMessagesPopup/BulkEmailPopup";
import BulkWhatsAppPopup from "./BulkMessagesPopup/BulkWhatsAppPopup";

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
    const [totalRows, setTotalRows] = useState(0);

    const [BulkMessagesOpen, setBulkMessagesOpen] = useState(false);
    const [bulkMessageOpen, setIsBulkMessageOpen] = useState(false);
    const [bulkEmailOpen, setIsBulkEmailOpen] = useState(false);
    const [bulkWhatsOpen, setIsBulkWhatsOpen] = useState(false);

    // Filter Modal
    const handleApplyFilters = (filters: CustomerFilters) => {
        dispatch(
            actGetFilteredCustomers({
                filters,
                pageNumber: currentPage,
            })
        ).then((action) => {
            if (actGetFilteredCustomers.fulfilled.match(action)) {
                setTotalRows(action.payload.total_results);
            }
        });
        setIsFilterOpen(false);
    };

    const handleEdit = (customer: ICustomers) => {
        setSelectedCustomer(customer);
        setIsEditOpen(true);
    };

    // Handle calling customer
    const handleCall = (phone: string) => {
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

    // open bulk message modal
    const handleOpenEmail = () => {
        setIsBulkEmailOpen(!bulkEmailOpen);
        setBulkMessagesOpen(false);
    };

    const handleOpenwhatsapp = () => {
        setIsBulkWhatsOpen(!bulkWhatsOpen);
        setBulkMessagesOpen(false);
    };

    const handleOpenmessage = () => {
        setIsBulkMessageOpen(!bulkMessageOpen);
        setBulkMessagesOpen(false);
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
            ).then((action) => {
                if (actGetFilteredCustomers.fulfilled.match(action)) {
                    setTotalRows(action.payload.total_results);
                }
            });
        }, 1000);
        return () => clearTimeout(x);
    }, [filterText, dispatch, currentPage]);

    // date Handle
    const formatArabicDate = (isoDate: string): string => {
        const date = new Date(isoDate);
        const formatter = new Intl.DateTimeFormat("ar-EG", {
            year: "numeric",
            month: "2-digit",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        });
        return formatter.format(date);
    };

    // Add this method
    const handleExport = () => {
        dispatch(
            actExportCustomers({
                filters: currentFilters,
            })
        );
    };

    const handlePageChange = (page: number) => {
        dispatch(
            actGetFilteredCustomers({
                filters: currentFilters,
                pageNumber: page,
            })
        );
    };

    const handleRowsPerPageChange = (page: number) => {
        dispatch(
            actGetFilteredCustomers({
                filters: currentFilters,
                pageNumber: page,
            })
        );
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
            name: "رقم الجوال",
            cell: (row: ICustomers) => (
                <span
                    onClick={() => navigate(`/customer/${row.id}`)}
                    style={{ cursor: "pointer" }}
                >
                    <bdi>
                        {row.phone_number ? row.phone_number.toString() : ""}
                    </bdi>
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
                    {Number(
                        Number(row.total_sales).toFixed(2)
                    ).toLocaleString()}
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
                        className="p-2 text-orange-600 hover:bg-orange-100 rounded-md transition-colors"
                        title="اتصال"
                    >
                        <Phone size={20} />
                    </button>
                    <button
                        onClick={() => handleBulkEmail(row)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                        title="بريد إلكتروني"
                    >
                        <Mail size={20} />
                    </button>
                    <button
                        onClick={() => handleBulkWhatsApp(row)}
                        className="p-2 text-green-500 hover:bg-green-100 rounded-md transition-colors"
                        title="واتساب"
                    >
                        <MessageCircle size={20} />
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
                fontSize: "16px",
                fontWeight: "bold",
                backgroundColor: "#2d3748",
                color: "#fff",
            },
        },
        cells: {
            style: {
                fontSize: "15px",
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
                <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                    {/* Left Section: Search and Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder="بحث..."
                            className="p-2 border rounded-lg md:w-80 focus:outline-none focus:ring-2 focus:ring-gray-500 duration-100"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                        />

                        {/* Filter Button */}
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className="flex items-center gap-2 border border-gray-600 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-600 duration-150"
                            title="تصفية العملاء"
                        >
                            <span>تصفية العملاء</span>
                            <Filter size={16} />
                        </button>

                        {/* Export Button */}
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 border border-gray-600 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-600 duration-150"
                            title="تصدير العملاء"
                        >
                            <span>تحميل اكسيل</span>
                            <Download size={16} />
                        </button>
                    </div>

                    {/* Right Section: Bulk Messaging */}
                    <div className="flex flex-wrap items-end gap-4">
                        {/* Bulk Messages Button */}
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setBulkMessagesOpen(!BulkMessagesOpen)
                                }
                                className="flex items-center gap-2 border border-gray-600 hover:text-white py-2 px-4 rounded-lg hover:bg-gray-600 duration-150"
                                title="ارسال رسالة للجميع"
                            >
                                <span>ارسال لجميع العملاء</span>
                                <EllipsisVertical size={16} />
                            </button>

                            {/* Bulk Message Options */}
                            {BulkMessagesOpen && (
                                <div className="absolute top-full left-0 mt-2 bg-white shadow-lg z-50 border rounded-lg">
                                    <button
                                        onClick={() => handleOpenEmail()}
                                        className="flex items-center gap-2 w-full border-b px-4 py-2 text-left hover:bg-gray-100"
                                        title="إرسال بريد إلكتروني للمحددين"
                                    >
                                        <Mail size={16} />
                                        إرسال بريد إلكتروني
                                    </button>
                                    <button
                                        onClick={() => handleOpenwhatsapp()}
                                        className="flex items-center gap-2 w-full border-b px-4 py-2 text-left hover:bg-gray-100"
                                        title="إرسال واتساب للمحددين"
                                    >
                                        <MessageCircle size={16} />
                                        إرسال واتساب
                                    </button>
                                    <button
                                        onClick={() => handleOpenmessage()}
                                        className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100"
                                        title="إرسال رسالة نصية للمحددين"
                                    >
                                        <MessageSquare size={16} />
                                        إرسال رسالة نصية
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Selected Rows Actions */}
                        {selectedRows.length > 1 && (
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => handleBulkEmail()}
                                    className="flex items-center gap-2 border border-gray-500 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-600 duration-150"
                                    title="إرسال بريد إلكتروني للمحددين"
                                >
                                    <Mail size={16} />({selectedRows.length})
                                </button>
                                <button
                                    onClick={() => handleBulkWhatsApp()}
                                    className="flex items-center gap-2 border border-gray-500 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-600 duration-150"
                                    title="إرسال واتساب للمحددين"
                                >
                                    <MessageCircle size={16} />(
                                    {selectedRows.length})
                                </button>
                                <button
                                    onClick={() => handleBulkSMS()}
                                    className="flex items-center gap-2 border border-gray-500 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-600 duration-150"
                                    title="إرسال رسالة نصية للمحددين"
                                >
                                    <MessageSquare size={16} />(
                                    {selectedRows.length})
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 rounded-md">
                    <DataTable
                        columns={columns}
                        data={customers}
                        pagination
                        paginationServer
                        paginationTotalRows={totalRows}
                        onChangePage={handlePageChange}
                        onChangeRowsPerPage={handleRowsPerPageChange}
                        paginationRowsPerPageOptions={[50]}
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
                        paginationDefaultPage={1}
                        paginationPerPage={50}
                        paginationComponentOptions={{
                            rowsPerPageText: "عدد العملاء لكل صفحة:",
                            rangeSeparatorText: "من",
                            noRowsPerPage: false,
                            selectAllRowsItem: false,
                        }}
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

                {/* bulk popup */}

                {bulkMessageOpen && (
                    <BulkMessagePopup
                        isOpen={bulkMessageOpen}
                        onClose={() => setIsBulkMessageOpen(false)}
                        customers={selectedRows}
                    />
                )}

                {bulkEmailOpen && (
                    <BulkEmailPopup
                        isOpen={bulkEmailOpen}
                        onClose={() => setIsBulkEmailOpen(false)}
                        customers={selectedRows}
                    />
                )}

                {bulkWhatsOpen && (
                    <BulkWhatsAppPopup
                        isOpen={bulkWhatsOpen}
                        onClose={() => setIsBulkWhatsOpen(false)}
                        customers={selectedRows}
                    />
                )}

                {/* Selected Customer Details */}
            </div>
        </div>
    );
};

export default CustomersCallTable;
