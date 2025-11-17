export type Task = {
    codigo: string;
    descricao: string;
    descricaoweb: string;
    prazo: number;
};

interface TaskStore {
  task: Task | null;
  tasks: Task[];
  setDemandas: (tasks: Task[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  fetchDemandas: () => Promise<void>;
}

export default TaskStore;