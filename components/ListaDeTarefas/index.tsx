import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import useTarefaStore from '@/hooks/store/task.store';
import { useEffect, useState } from 'react';
import styles from '@/app/style';
import ModalDeleteTask from '@/components/ModalDeleteTask';
import { router } from 'expo-router';

export default function ListaDeTarefas({ onEdit }: { onEdit: (item: any) => void }) {

  const { deletaTarefa, fetchTarefas, tasks, isLoading } = useTarefaStore();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<{ id: number; title: string } | null>(null);

  useEffect(() => {
    fetchTarefas();
  }, [fetchTarefas]);

  const handleDeletePress = (task: { id: number; title: string }) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  const handleOpenTaskScreen = (task: { id: number; title: string }) => {
    router.push({
      pathname: '/(tabs)/(tarefas)',
      params: { id: task.id, title: task.title },
    });
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete !== null) {
      if (deletaTarefa) {
        await deletaTarefa(taskToDelete.id);
      }
      handleCloseDeleteModal();
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.viewContainer, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando tarefas...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={{ fontSize: 20, marginBottom: 10, textAlign: 'center' }}>Lista de Tarefas</Text>

      {!isLoading && tasks.length === 0 && (
        <Text style={{ color: '#555', textAlign: 'center', marginTop: '50%' }}>Nenhuma tarefa encontrada no servidor...</Text>
      )}

      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleOpenTaskScreen(item)}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              padding: 15,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              opacity: item.isCompleted ? 0.6 : 1
            }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={{
                fontWeight: 'bold',
                fontSize: 16,
                color: item.isCompleted ? '#888' : '#000',
                textDecorationLine: item.isCompleted ? 'line-through' : 'none',
              }}>
                {item.title}
              </Text>
              <Text style={{
                color: item.isCompleted ? '#aaa' : '#555',
                textDecorationLine: item.isCompleted ? 'line-through' : 'none',
              }}>
                {item.description}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => onEdit(item)} style={{ padding: 5, backgroundColor: '#ccffcc', borderRadius: 5, marginRight: 10, justifyContent: 'center', borderColor: '#005300ff', borderWidth: 1 }}>
                <Text style={{ color: '#005300ff', textAlign: 'center', fontWeight: 'bold' }}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleDeletePress(item)} style={{ padding: 5, backgroundColor: '#ffcccc', borderRadius: 5, justifyContent: 'center', borderColor: '#ff0000', borderWidth: 1 }}>
                <Text style={{ color: '#ff0000', textAlign: 'center', fontWeight: 'bold' }}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      <ModalDeleteTask
        isVisible={showDeleteModal}
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        taskTitle={taskToDelete?.title}
      />
    </View>
  );
}