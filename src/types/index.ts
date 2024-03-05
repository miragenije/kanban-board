export type Task = {
    id: string;
    title: string;
    description: string;
    person: string;
};

export type ListData = {
    id: string;
    listName: string;
    task: Task[];
};
