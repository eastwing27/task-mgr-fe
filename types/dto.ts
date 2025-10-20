export type TaskStatus = 'new' | 'inProgress' | 'completed' | 'cancelled';

export interface NewTaskDTO {
    title: string;
    description?: string;
    deadline?: Date;
};

export interface UpdateTaskDTO {
    id: number;
    title?: string;
    description?: string;
    deadline?: Date;
    status?: TaskStatus;
};

export interface EditTaskDTO {
    title?: string;
    description?: string;
    deadline?: Date;
    status?: TaskStatus;
};

export interface TaskDTO {
    id: number;
    title: string;
    description: string | null;
    deadline: Date | null;
    status: TaskStatus;
    createdAt: Date;
}

export interface TaskBriefDTO {
    id: number;
    title: string;
    status: TaskStatus;
    deadline: Date | null;
};
