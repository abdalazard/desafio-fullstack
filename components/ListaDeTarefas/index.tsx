import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'; 
import useTarefaStore from '@/hooks/store/task.store';
import { useEffect } from 'react';
import styles from '@/app/style';

export default function ListaDeTarefas({ onEdit }: { onEdit: (item: any) => void }) {
  
  const { fetchTarefas, tasks, isLoading } = useTarefaStore();

  useEffect(() => {
    fetchTarefas();
  }, []);

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
      <Text style={{ fontSize: 20, marginBottom: 10, textAlign:'center' }}>Lista de Tarefas</Text>

      {!isLoading && tasks.length === 0 && (
        <Text style={{color: '#555', textAlign: 'center', marginTop: '50%'}}>Nenhuma tarefa encontrada no servidor...</Text>
      )}

      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)} 
        renderItem={({ item }) => (
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>
              <Text style={{ color: '#555' }}>{item.description}</Text>
            </View>
            <TouchableOpacity onPress={() => onEdit(item)} style={{ padding: 5, backgroundColor: '#eee', borderRadius: 5 }}>
                <Text style={{ color: '#007BFF' }}>Editar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
