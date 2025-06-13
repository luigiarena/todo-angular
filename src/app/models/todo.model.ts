export interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    priority: 'low' | 'medium' | 'high';
}

export interface TodoFilter {
    status: 'all' | 'completed' | 'pending';
    priority?: 'low' | 'medium' | 'high';
}