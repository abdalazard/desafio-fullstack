import { create } from 'zustand';
import axios from "axios";
import TaskStore, { Task } from "./types/task.type";
import API_URL from '@/utils/api';

export const useTarefaStore = create<TaskStore>((set, get) => ({
  task: null,
  tasks: [],
  isLoading: false,
  error: null,
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  setTarefas: (tasks: Task[]) => set({ tasks }),

  fetchTarefas: async () => {
    try {
      set({ isLoading: true, error: null });

      const response = await axios.get(`${API_URL}/tasks`);

      set({ tasks: response.data.tasks });
    } catch (error) {
      console.error(error);
      set({ error: "Erro ao carregar as demandas" });
    } finally {
      set({ isLoading: false });
    }
  },

  criaTarefa: async (title: string, description: string) => {
    try {
      set({ isLoading: true });

      await axios.post(`${API_URL}/task/create`, {
        title,
        description,
      });

      await get().fetchTarefas();
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      set({ error: "Erro ao criar tarefa" });
    } finally {
      set({ isLoading: false });
    }
  },

  updateTarefa: async (id: number, title: string, description: string) => {
    try {
      set({ isLoading: true, error: null });

      // O id é enviado no corpo, e a URL não precisa mais dele no final
      await axios.put(`${API_URL}/task/update`, {
        id, // <--- ADICIONADO AQUI
        title,
        description,
      });

      await get().fetchTarefas();
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      set({ error: "Erro ao atualizar tarefa" });
    } finally {
      set({ isLoading: false });
    }
  }
}));

export default useTarefaStore;