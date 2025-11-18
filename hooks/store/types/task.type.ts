export type Task = {
    id: number;
    title: string;
    description: string;
};

interface TaskStore {
  task: Task | null;
  tasks: Task[];
  setTarefas: (tasks: Task[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  fetchTarefas: () => Promise<void>;
  criaTarefa: (title: string, description: string) => Promise<void>;
}

export default TaskStore;