import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Switch } from 'react-native';
import useTarefaStore from '@/hooks/store/task.store';
import { useEffect } from 'react';
import styles from '@/app/style';
import { router } from 'expo-router';

export default function TarefasConcluidas() {

  const { toggleConcluirTarefa, fetchTarefasConcluidas, tasksconcluidas, isLoading } = useTarefaStore();

  useEffect(() => {
    fetchTarefasConcluidas();
  }, [fetchTarefasConcluidas]);

  const handleOpenTaskScreen = (task: { id: number; title: string }) => {
    router.push({
      pathname: '/(tabs)/(tarefas)',
      params: { id: task.id, title: task.title },
    });
  };

  const handleToggle = async (item: any) => {
    await toggleConcluirTarefa(item);
  };

  if (isLoading) {
    return (
      <View style={[styles.viewContainer, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando histórico...</Text>
      </View>
    );
  }

  return (
    <View>
      {!isLoading && tasksconcluidas.length === 0 && (
        <Text style={{ color: '#555', textAlign: 'center', marginTop: '50%' }}>Nenhuma tarefa concluída ainda.</Text>
      )}

      <FlatList
        data={tasksconcluidas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              padding: 15,
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
              opacity: 0.8
            }}
          >
            <TouchableOpacity
              onPress={() => handleOpenTaskScreen(item)}
              style={{ flex: 1, marginRight: 10 }}
            >
              <Text style={{
                fontWeight: 'bold',
                fontSize: 16,
                textDecorationLine: 'line-through',
                color: '#888'
              }}>
                {item.title}
              </Text>
              <Text style={{ color: '#aaa' }}>{item.description}</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

              <Switch
                value={!!item.isCompleted}
                onValueChange={() => handleToggle(item)}
                trackColor={{ false: "#767577", true: "#4CAF50" }}
                thumbColor={item.isCompleted ? "#8BC34A" : "#f4f3f4"}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}