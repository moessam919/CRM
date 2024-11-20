export interface ICustomer {
    id: number;
    customer_type: string;
    number: number;
    name: string;
    phone_number: number;
    email_address: string;
    created_at: string;
    total_sales: number;
    last_invoice_date: string;
    invoices_count: number;
    purchased_products: [
        {
            product__arabic_name: string;
            product__sku: string;
            product__ref_number: string;
            count: number;
        },
    ];
    invoices: [];
    purchased_categories: [];
}
