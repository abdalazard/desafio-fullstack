import { create } from 'zustand';
import TaskStore, { Task } from "./types/task.type";

export const useDemandaStore = create<TaskStore>((set) => ({
  task: null,
  tasks: [],
  isLoading: false,
  error: null,
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  setDemandas: (tasks: Task[]) => set({ tasks }),

  fetchDemandas: async () => {
    try {
      set({ task: null, isLoading: true, error: null });
    } catch (error) {
      set({ error: "Erro ao carregar as demandas" });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useDemandaStore;