import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../style';
import ListaDeTarefas from '@/components/ListaDeTarefas';
import { useRouter, useLocalSearchParams } from 'expo-router';
import useTarefaStore from '@/hooks/store/task.store';

export default function Index() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { obtemTarefa, task } = useTarefaStore();

  useEffect(() => {
    if (params.id) {
      obtemTarefa(Number(params.id));
    }
  }, [params.id]);

  const { id } = params;

  const handleEdit = (item: { id: number }) => {
    router.push({ pathname: "/", params: { id: item.id } });
  };

  const handleBack = () => {
    router.replace("/");
  };

  if (id) {
    return (
      <View style={styles.container}>
        <View style={styles.viewContainer}>
          <Text style={styles.topView}>Editando Tarefa ID: {task?.title}</Text>

          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{task?.title}</Text>
          </View>

          <TouchableOpacity onPress={handleBack}>
            <Text style={{ backgroundColor: '#000', color: '#fff', padding: 15, borderRadius: 5, textAlign: 'center', marginTop: 20 }}>
              Voltar para a Lista
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.viewContainer]}>
        <Text style={[styles.topView]}>Minhas Tarefas</Text>

        <ListaDeTarefas onEdit={handleEdit} />
      </View>
    </View>
  );
}