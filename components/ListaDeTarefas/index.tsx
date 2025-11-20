import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import useTarefaStore from '@/hooks/store/task.store';
import { useEffect, useState } from 'react';
import styles from '@/app/style';
import ModalDeleteTask from '@/components/ModalDeleteTask';

export default function ListaDeTarefas({ onEdit }: { onEdit: (item: any) => void }) {

  const { deletaTarefa, fetchTarefas, tasks, isLoading } = useTarefaStore();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDeleteId, setTaskToDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchTarefas();
  }, []);

  const handleDeletePress = (taskId: number) => {
    setTaskToDeleteId(taskId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setTaskToDeleteId(null);
    fetchTarefas();
  };

  const handleConfirmDelete = async () => {
    if (taskToDeleteId !== null) {
      if (deletaTarefa) {
        await deletaTarefa(taskToDeleteId);
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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>
              <Text style={{ color: '#555' }}>{item.description}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => onEdit(item)} style={{ padding: 5, backgroundColor: '#ccffcc', borderRadius: 5, marginRight: 10, justifyContent: 'center', borderColor: '#005300ff', borderWidth: 1 }}>
                <Text style={{ color: '#005300ff', textAlign: 'center', fontWeight: 'bold' }}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeletePress(item.id)} style={{ padding: 5, backgroundColor: '#ffcccc', borderRadius: 5, justifyContent: 'center', borderColor: '#ff0000', borderWidth: 1 }}>
                <Text style={{ color: '#ff0000', textAlign: 'center', fontWeight: 'bold' }}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <ModalDeleteTask
        isVisible={showDeleteModal}
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        taskId={taskToDeleteId}
      />
    </View>
  );
}
