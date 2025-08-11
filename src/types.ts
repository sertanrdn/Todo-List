// Defining the Types
export type Todo = {
    id: number;
    text: string;
    isComplete: boolean;
}

export enum Filter {
    All = "all",
    Active = "active",
    Completed = "completed"
}

export function isValidFilter(value: any): value is Filter {
    return value === Filter.All || value === Filter.Active || value === Filter.Completed;
}