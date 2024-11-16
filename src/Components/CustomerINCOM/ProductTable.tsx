import DataTable, { TableColumn } from "react-data-table-component";

interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
}

const ProductTable: React.FC = () => {
    const products: Product[] = [
        { id: 1, name: "منتج 1", price: 50, stock: 20 },
        { id: 2, name: "منتج 2", price: 75, stock: 15 },
        { id: 3, name: "منتج 3", price: 100, stock: 10 },
    ];

    const columns: TableColumn<Product>[] = [
        {
            name: "رقم المنتج",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "اسم المنتج",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "السعر",
            selector: (row) => `${row.price} ريال`,
            sortable: true,
        },
        {
            name: "الكمية المطلوبة",
            selector: (row) => row.stock,
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
            <DataTable
                columns={columns}
                data={products}
                pagination
                paginationRowsPerPageOptions={[3]}
                customStyles={customStyles}
                noDataComponent={
                    <div className="text-gray-500 py-4">لا يوجد بيانات</div>
                }
                striped
                highlightOnHover
                responsive
            />
        </div>
    );
};

export default ProductTable;
