export interface ICustomerNote {
    id: number;
    created_by: {
        username: string;
        id: number;
    };
    note: string;
    created_at: string;
    customer: {
        id: number;
        name: string;
        phone_number: string | null;
        email_address: string | null;
        customer_type: string;
        number: number;
    };
}
