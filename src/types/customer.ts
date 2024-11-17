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
    purchased_products: [];
    invoices: [];
    purchased_categories: [];
}
