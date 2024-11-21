export interface ISalesReport {
    total_sales: string;
    total_invoices: number;
    average_daily_sales: string;
    average_invoice_value: string;
    customers_count: number;
    top_selling_products: {
        product__arabic_name: string;
        quantity_sold: number;
        sales_value: string;
    }[];
    top_selling_salespersons: {
        sales_person__name: string | null;
        sales_value: string;
    }[];
    branch_sales_share: {
        branch: string;
        share: number;
        value: string;
    }[];
    sales_last_7_days: string;
    sales_current_month: string;
    sales_current_year: string;
    today_sales: string;
}
