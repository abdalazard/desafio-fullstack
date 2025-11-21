import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import styles from '../../style';
import { useRouter, useLocalSearchParams } from 'expo-router';
import useTarefaStore from '@/hooks/store/task.store';
import TarefasConcluidas from '@/components/TarefasConcluidas';

export default function Index() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { toggleConcluirTarefa, fetchTarefasConcluidas, obtemTarefa, task } = useTarefaStore();
  const { id } = params;

  useEffect(() => {
    if (id) {
      obtemTarefa(Number(id));
    }
  }, [id]);

  useEffect(() => {
    fetchTarefasConcluidas();
  }, [fetchTarefasConcluidas]);

  const handleToggle = async (item: any) => {
    await toggleConcluirTarefa(item);
    if (item.id) {
      await obtemTarefa(item.id);
    }
  };

  const handleBack = () => {
    router.replace("/");
  };

  if (id) {
    return (
      <View style={styles.container}>
        <View style={styles.viewContainer}>
          <Text style={styles.topView}>Detalhes da Tarefa</Text>

          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' }}>
              {task?.title}
            </Text>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 20,
              alignItems: 'center',
              width: '100%',
              padding: 15,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: task?.isCompleted ? "#4CAF50" : "#F44336",
              backgroundColor: task?.isCompleted ? "#e8f5e9" : "#ffebee"
            }}>

              <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: task?.isCompleted ? "#2E7D32" : "#C62828",
              }}>
                {task?.isCompleted ? "Concluída" : "Pendente"}
              </Text>

              <Switch
                value={!!task?.isCompleted}
                onValueChange={() => handleToggle(task)}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={task?.isCompleted ? "#f5dd4b" : "#f4f3f4"}
              />
            </View>
          </View>

          <TouchableOpacity onPress={handleBack}>
            <Text style={{ backgroundColor: '#000', color: '#fff', padding: 15, borderRadius: 5, textAlign: 'center', marginTop: 20 }}>
              Voltar para a Lista
            </Text>
          </TouchableOpacity>
        </View>
      </View >
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.viewContainer]}>
        <Text style={[styles.topView]}>Tarefas Concluídas</Text>
        <TarefasConcluidas />
      </View>
    </View>
  );
}