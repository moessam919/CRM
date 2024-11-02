import { useState, useMemo } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Phone, MessageSquare, Send } from "lucide-react";

interface CustomerData {
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

    // Handle calling customer
    const handleCall = (phone: string) => {
        window.location.href = `tel:${phone}`;
    };

    // Handle messaging customer
    const handleMessage = (email: string) => {
        window.location.href = `mailto:${email}`;
    };

    // Handle bulk messaging
    const handleBulkMessage = () => {
        if (selectedRows.length > 0) {
            const emailAddresses = selectedRows
                .map((customer) => customer.email)
                .join(",");
            window.location.href = `mailto:${emailAddresses}`;
        }
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
                <div className="flex gap-3">
                    <button
                        onClick={() => handleCall(row.phone)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                        title="اتصال"
                    >
                        <Phone size={20} />
                    </button>
                    <button
                        onClick={() => handleMessage(row.email)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-md transition-colors"
                        title="رسالة"
                    >
                        <MessageSquare size={20} />
                    </button>
                </div>
            ),
            width: "150px",
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
                            className="p-2 border rounded-lg md:w-96 focus:outline-none focus:ring-2 focus:ring-gray-500  duration-100"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                        />

                        {selectedRows.length > 0 && (
                            <button
                                onClick={handleBulkMessage}
                                className="flex items-center gap-2 border-2 border-gray-500 hover:border-[#0d9a86]  hover:text-white px-4 py-2 rounded-lg hover:bg-[#0d9a86] duration-150"
                            >
                                <Send size={16} />
                                إرسال رسالة للمحددين ({selectedRows.length})
                            </button>
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
                {selectedCustomer && (
                    <div className="grid grid-cols-1">
                        <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center">
                            <div className="bg-white px-10 md:py-10 md:px-[20%] rounded-md text-right">
                                <h2 className="text-lg font-bold text-gray-500 bg-white p-2 rounded-md mb-4">
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
                                <div className="flex gap-3 justify-center">
                                    <button
                                        onClick={() =>
                                            handleCall(selectedCustomer.phone)
                                        }
                                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                                        title="اتصال"
                                    >
                                        <Phone size={20} />
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleMessage(
                                                selectedCustomer.phone
                                            )
                                        }
                                        className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"
                                        title="رسالة"
                                    >
                                        <MessageSquare size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomersCallTable;
