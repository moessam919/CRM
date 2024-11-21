export interface IRes {
    links: {
        next: string | null;
        previous: string | null;
    };
    total_pages: number;
    current_page: number;
    results: ICustomers[];
}
export interface ICustomers {
    id: number;
    customer_type: string;
    number: number;
    name: string;
    phone_number: number;
    email_address: string;
    billing_address?: string;
    created_at: string;
    total_sales: number;
    last_invoice_date: string | null;
    invoices_count: number;
    average_invoice_value: number;
    last_month_sales?: number;
}

export interface CustomerFilters {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    customer_type?: string;
    min_sales_value?: number;
    max_sales_value?: number;
    min_sales_count?: number;
    max_sales_count?: number;
    created_at_after?: string;
    created_at_before?: string;
    last_invoice_date?: string;
    no_purchases?: boolean;
}
