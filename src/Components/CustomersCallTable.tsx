import { useState, useMemo } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Phone, MessageSquare, Mail } from "lucide-react";
import MessagePopup from "./messagePopup/MessagePopup";
import WhatsAppPopup from "./messagePopup/WhatsAppPopup";
import EmailPopup from "./messagePopup/EmailPopup";

export interface CustomerData {
    id: string;
    name: string;
    email: string;
    phone: string;
}

const CustomersCallTable = () => {
    // Sample data - replace with your actual data
    const initialData: CustomerData[] = [
        {
            id: "200",
            name: "محمود",
            email: "ma7moud.aelaziz@gmail.com",
            phone: "+20 123 456 789",
        },
        {
            id: "1",
            name: "أحمد محمد",
            email: "ahmed@example.com",
            phone: "+20 123 456 789",
        },
        {
            id: "2",
            name: "فاطمة علي",
            email: "fatima@example.com",
            phone: "+20 987 654 321",
        },
        {
            id: "3",
            name: "فاطمة علي",
            email: "fatima@example.com",
            phone: "+20 987 654 321",
        },
        {
            id: "4",
            name: "فاطمة علي",
            email: "fatima@example.com",
            phone: "+20 987 654 321",
        },
        {
            id: "5",
            name: "فاطمة علي",
            email: "fatima@example.com",
            phone: "+20 987 654 321",
        },
        {
            id: "6",
            name: "فاطمة علي",
            email: "fatima@example.com",
            phone: "+20 987 654 321",
        },
        {
            id: "7",
            name: "فاطمة علي",
            email: "fatima@example.com",
            phone: "+20 987 654 321",
        },
        {
            id: "8",
            name: "أحمد محمد",
            email: "ahmed@example.com",
            phone: "+20 123 456 789",
        },
        {
            id: "9",
            name: "أحمد محمد",
            email: "ahmed@example.com",
            phone: "+20 123 456 789",
        },
        {
            id: "10",
            name: "أحمد محمد",
            email: "ahmed@example.com",
            phone: "+20 123 456 789",
        },
        {
            id: "11",
            name: "أحمد محمد",
            email: "ahmed@example.com",
            phone: "+20 123 456 789",
        },
    ];
    const [filterText, setFilterText] = useState("");
    const [data] = useState<CustomerData[]>(initialData);
    const [selectedCustomer, setSelectedCustomer] =
        useState<CustomerData | null>(initialData[0]);
    const [selectedRows, setSelectedRows] = useState<CustomerData[]>([]);
    const [MessageOpen, setIsMessageOpen] = useState(false);
    const [WhatsOpen, setIsWhatsOpen] = useState(false);
    const [EmailOpen, setIsEmailOpen] = useState(false);

    // Handle calling customer
    const handleCall = (phone: string) => {
        window.location.href = `tel:${phone}`;
    };

    // handle Bulk SMS
    const handleBulkSMS = (customer?: CustomerData) => {
        if (customer) {
            setSelectedRows([customer]);
        } else {
            if (selectedRows.length > 0) {
                setSelectedRows(selectedRows);
            }
        }
        setIsMessageOpen(true);
    };

    // Handle Bulk Email
    const handleBulkEmail = (customer?: CustomerData) => {
        if (customer) {
            setSelectedRows([customer]);
        } else {
            if (selectedRows.length > 0) {
                setSelectedRows(selectedRows);
            }
        }
        setIsEmailOpen(true);
    };

    // Handle Bulk WhatsApp
    const handleBulkWhatsApp = (customer?: CustomerData) => {
        if (customer) {
            setSelectedRows([customer]);
        } else {
            if (selectedRows.length > 0) {
                setSelectedRows(selectedRows);
            }
        }
        setIsWhatsOpen(true);
    };

    // Handle row click
    const handleRowClick = (row: CustomerData) => {
        setSelectedCustomer(row);
    };

    const columns: TableColumn<CustomerData>[] = [
        {
            name: "الاسم",
            selector: (row: CustomerData) => row.name,
            sortable: true,
        },
        {
            name: "البريد الإلكتروني",
            selector: (row: CustomerData) => row.email,
            sortable: true,
        },
        {
            name: "رقم الهاتف",
            selector: (row: CustomerData) => row.phone,
            sortable: true,
        },
        {
            name: "الإجراءات",
            cell: (row: CustomerData) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleCall(row.phone)}
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
                </div>
            ),
            width: "200px",
        },
    ];

    const filteredItems = useMemo(() => {
        return data.filter((item) => {
            return (
                (item.name &&
                    item.name
                        .toLowerCase()
                        .includes(filterText.toLowerCase())) ||
                (item.email &&
                    item.email
                        .toLowerCase()
                        .includes(filterText.toLowerCase())) ||
                (item.phone && item.phone.includes(filterText))
            );
        });
    }, [data, filterText]);

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

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
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
                            className="p-2 border rounded-lg md:w-96 focus:outline-none focus:ring-2 focus:ring-gray-500 duration-100"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                        />

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
                            data={filteredItems}
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
                </div>

                {/*  */}

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

                {/*  */}
                {selectedCustomer && (
                    <div className="grid grid-cols-1">
                        <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center">
                            <div className="bg-white px-10 md:py-10 md:px-[20%] rounded-md text-right">
                                <h2 className="text-lg md:text-2xl font-bold text-gray-500 bg-white p-2 rounded-md mb-4">
                                    تفاصيل العميل
                                </h2>
                                <p className="text-gray-500 font-bold mb-2">
                                    الاسم:
                                </p>
                                <p className="text-gray-700 mb-4">
                                    {selectedCustomer.name}
                                </p>
                                <p className="text-gray-500 font-bold mb-2">
                                    البريد الإلكتروني:
                                </p>
                                <p className="text-gray-700 mb-4">
                                    {selectedCustomer.email}
                                </p>
                                <p className="text-gray-500 font-bold mb-2">
                                    رقم الهاتف:
                                </p>
                                <p className="text-gray-700 mb-4">
                                    {selectedCustomer.phone}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomersCallTable;
