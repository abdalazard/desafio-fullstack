import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from '../../style';
import CriaTarefa from '@/components/CriaTarefa';
import ListaDeTarefas from '@/components/ListaDeTarefas';
import { Task } from '@/hooks/store/types/task.type';

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState<Task | null>(null);

  const handleOpenModal = (tarefa?: Task) => {
    setTarefaEmEdicao(tarefa || null);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setTarefaEmEdicao(null);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.viewContainer]}>
        <Text style={[styles.topView]}>Projeto - Teste</Text>
      </View>
      <CriaTarefa
        modalVisible={modalVisible}
        onOpen={handleOpenModal}
        onClose={handleCloseModal}
        tarefa={tarefaEmEdicao}
      />
      <ListaDeTarefas onEdit={handleOpenModal} />
    </View>
  );
}