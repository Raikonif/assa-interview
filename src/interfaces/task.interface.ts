export interface Task {
  id: string;
  name: string;
  status: boolean;
  createdAt: string;
}

export type OPTask = Partial<Task>;
