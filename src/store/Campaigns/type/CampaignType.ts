export interface Campaign {
    id: number;
    metrics_count: number;
    success_rate: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    status: string;
}

export interface Category {
    id: number;
    arabic_name: string;
    english_name: string | null;
    number: string;
    level: string;
}

export interface Product {
    id: number;
    ref_number: string;
    sku: string;
    arabic_name: string;
    selling_price: string;
    category_1: Category;
}

interface Metric {
    id: number;
    name: string;
    type: string;
    value: number;
    additional_fields: {
        categories?: Category[];
        products?: Product[];
    };
}

interface AnalysisData {
    current: string;
    previous: string;
    target: string;
    change: string;
    percentage_change: string;
    achievement_percentage: string;
}

interface Analysis {
    customer_registration: AnalysisData;
    sales_of_category: AnalysisData;
    sales_of_specific_products: AnalysisData;
    total_sales: AnalysisData;
    average_transaction_value: AnalysisData;
}

interface ComparisonPeriod {
    period_name: number;
    comparison: {
        customer_registration: AnalysisData;
        sales_of_category: AnalysisData;
        sales_of_specific_products: AnalysisData;
        total_sales: AnalysisData;
    };
}

export interface selectedCampaign {
    id: number;
    name: string;
    description: string;
    status: string;
    start_date: string;
    end_date: string;
    created_at: string;
    created_by: string;
    metrics: Metric[];
    analysis: Analysis;
    comparison_periods_analysis: ComparisonPeriod[];
    average_success_rate: number;
}

// Campaign Summary

interface ActiveCampaigns {
    id: number;
    name: string;
    status: string;
    start_date: string;
    end_date: string;
    description: string;
    success_rate: number;
    metrics_count: number;
}

export interface CampaignSummary {
    total_campaigns: number;
    active_campaigns_count: number;
    this_month_campaigns_count: number;
    completed_campaigns_count: number;
    draft_campaigns_count: number;
    active_campaigns: ActiveCampaigns[];
}

// Campaigns Chart

export interface Metrics {
    total_sales?: string;
    sales_of_category?: string;
    sales_of_specific_products?: string;
    customer_registration?: string;
}

export interface ChartDataPoint {
    date: string;
    metrics: Metrics;
}

// insights

export interface SalesReport {
    sales_performance: {
        total_sales_value: string;
        invoices_count: number;
        average_transaction_value: string;
        sales_volume: number;
        products_sold: number;
        top_selling_products: {
            product__arabic_name: string;
            total_quantity: number;
        }[];
    };
    customers_behaviour: {
        total_customers: number;
        first_time_customers: number;
        repeat_customers: number;
        top_selling_locations: {
            city: string;
            total_sales: number;
        }[];
        customer_types: {
            customer_type: string;
            total_value: number;
            count: number;
        }[];
        top_customers: {
            id: number;
            name: string;
            phone_number: string;
            city: string;
            total_sales: string;
        }[];
    };
}
