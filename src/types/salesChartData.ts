export interface ISalesChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
    }[];
}