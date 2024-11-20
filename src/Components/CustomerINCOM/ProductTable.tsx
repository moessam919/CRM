import DataTable from "react-data-table-component";
import { ICustomer } from "../../types/customer";

interface Product {
    customer: ICustomer | null;
}

interface PurchasedProduct {
    product__arabic_name: string;
    product__sku: string;
    product__ref_number: string;
    count: number;
}

const ProductTable: React.FC<Product> = ({ customer }) => {
    if (!customer) {
        return (
            <div className="text-center text-2xl text-gray-500 py-10">
                لا يوجد بيانات
            </div>
        );
    }

    const products = customer.purchased_products;

    const columns = [
        {
            name: "اسم المنتج",
            selector: (row: PurchasedProduct) => row.product__arabic_name,
        },
        {
            name: "رقم المنتج",
            selector: (row: PurchasedProduct) => row.product__sku,
            sortable: true,
        },
        {
            name: "رقم المرجعي",
            selector: (row: PurchasedProduct) => row.product__ref_number,
            sortable: true,
        },
        {
            name: "الكمية المطلوبة",
            selector: (row: PurchasedProduct) => row.count,
            sortable: true,
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

    return (
        <div className="pt-4 md:px-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">جدول المنتجات</h2>
            <div className="md:min-h-[288px]">
                <DataTable
                    columns={columns}
                    data={products}
                    pagination
                    paginationRowsPerPageOptions={[3]}
                    customStyles={customStyles}
                    noDataComponent={
                        <div className="text-center text-2xl text-gray-500 py-10">
                            لا يوجد بيانات
                        </div>
                    }
                    striped
                    highlightOnHover
                    responsive
                />
            </div>
        </div>
    );
};

export default ProductTable;
