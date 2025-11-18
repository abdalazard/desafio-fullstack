import { View, Text, FlatList, ActivityIndicator } from 'react-native'; 
import useTarefaStore from '@/hooks/store/task.store';
import { useEffect } from 'react';
import styles from '@/app/style';

export default function ListaDeTarefas() {
    
  const { tasks, fetchTarefas, isLoading } = useTarefaStore();

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
          <View style={{width: '100%', padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>
              <Text style={{ color: '#555' }}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}
