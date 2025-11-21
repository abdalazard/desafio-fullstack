export type Task = {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
};

interface TaskStore {
  task: Task | null;
  tasks: Task[];
  tasksconcluidas: Task[]
  setTarefas: (tasks: Task[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  obtemTarefa: (taskId: number) => Promise<void>;
  fetchTarefasConcluidas: () => Promise<void>;
  fetchTarefas: () => Promise<void>;
  criaTarefa: (title: string, description: string) => Promise<void>;
  updateTarefa: (id: number, title: string, description: string) => Promise<void>;
  deletaTarefa: (id: number) => Promise<void>;
  toggleConcluirTarefa: (task: Task) => Promise<void>;
}

export default TaskStore;