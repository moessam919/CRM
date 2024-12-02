export interface MessageData {
    type: string;
    title: string;
    content: string;
    recipients: number[];
}

export interface BulkMessageData {
    type: string;
    title: string;
    content: string;
    filterparams: { [key: string]: string | number | boolean };
}

export interface Recipient {
    id: number;
    name: string;
    phone_number: string | null;
    email_address: string | null;
    customer_type: "b2c" | "b2b";
    number: number;
}

export interface Message {
    id: number;
    url: string;
    type: "whatsapp" | "email" | "sms";
    title?: string;
    content: string;
    sent_at: string;
    status: "sent" | "failed" | "pending";
    additional_data: string | null;
    sent_by: {
        id: number;
        username: string;
    };
    recipients: Recipient[];
}
