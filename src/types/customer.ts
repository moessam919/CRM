export interface ICustomer {
    id: number;
    customer_type: string;
    number: number;
    name: string;
    phone_number: number;
    billing_address: string;
    email_address: string;
    created_at: string;
    total_sales: number;
    last_invoice_date: string;
    last_month_sales: number;
    invoices_count: number;
    purchased_products: [
        {
            product__arabic_name: string;
            product__sku: string;
            product__ref_number: string;
            count: number;
        },
    ];
    invoices: [
        {
            created_at: string;
            ref_number: string;
            id: number;
            value: string;
            url: string;
        },
    ];
    purchased_categories: [];
}
