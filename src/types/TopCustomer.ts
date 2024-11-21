export interface ITopCustomer {
    id: number;
    name: string;
    phone_number: string; // Changed to `string` because phone numbers can have non-numeric characters
    email_address: string | null; // Email can be null
    customer_type: "b2b" | "b2c"; // Restrict to valid customer types
    number: number;
    total_sales: number;
    last_invoice_date: string | "No invoices yet"; // Can be a string or a specific message
    invoices_count: number;
}
