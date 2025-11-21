import { create } from 'zustand';
import axios from "axios";
import TaskStore, { Task } from "./types/task.type";
import API_URL from '@/utils/api';

export const useTarefaStore = create<TaskStore>((set, get) => ({
  task: null,
  tasks: [],
  tasksconcluidas: [],
  isLoading: false,
  error: null,
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  setTarefas: (tasks: Task[]) => set({ tasks }),

  obtemTarefa: async (taskId: number) => {
    try {
      set({ isLoading: true, error: null });

      const response = await axios.get(`${API_URL}/task/${taskId}`);

      set({ task: response.data.task || response.data });
    } catch (error) {
      console.error(error);
      set({ error: "Erro ao carregar a demanda" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTarefasConcluidas: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.get(`${API_URL}/tasks/concluidas`);

      set({ tasksconcluidas: response.data.tasks });
    } catch (error) {
      console.error(error);
      set({ error: "Erro ao carregar concluídas" });
    } finally {
      set({ isLoading: false });
    }
  },

  toggleConcluirTarefa: async (task: Task) => {
    try {
      const novoStatus = !task.isCompleted;

      const tarefaAberta = get().task;
      if (tarefaAberta && tarefaAberta.id === task.id) {
        set({ task: { ...tarefaAberta, isCompleted: novoStatus } });
      }
      await axios.put(`${API_URL}/task/update`, {
        id: task.id,
        isCompleted: novoStatus
      });
      await get().fetchTarefasConcluidas();
      await get().fetchTarefas();

    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      set({ error: "Erro ao atualizar status" });
      get().fetchTarefasConcluidas();
      get().fetchTarefas();
      if (get().task?.id === task.id) get().obtemTarefa(task.id);
    }
  },

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
        isCompleted: false,
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

      await axios.put(`${API_URL}/task/update`, {
        id,
        title,
        description,
        isCompleted: false,
      });

      await get().fetchTarefas();
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      set({ error: "Erro ao atualizar tarefa" });
    } finally {
      set({ isLoading: false });
    }
  },

  deletaTarefa: async (id: number) => {
    try {
      set({ isLoading: true, error: null });

      await axios.delete(`${API_URL}/task/delete`, {
        data: { id },
      });

      await get().fetchTarefas();
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      set({ error: "Erro ao deletar tarefa" });
    } finally {
      set({ isLoading: false });
    }
  },

  concluirTarefa: async (id: number) => {
    try {
      set({ isLoading: true, error: null });

      await axios.put(`${API_URL}/task/concluir`, {
        id,
        isCompleted: true,
      });

      set({ tasksconcluidas: get().tasksconcluidas.filter(task => task.id !== id) });

      await get().fetchTarefasConcluidas();
    } catch (error) {
      console.error("Erro ao concluir tarefa:", error);
      set({ error: "Erro ao concluir tarefa" });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useTarefaStore;