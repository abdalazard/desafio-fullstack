import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import FormularioTarefa from '../FormularioTarefa';
import { Task } from '@/hooks/store/types/task.type';

export default function CriaTarefa({
  modalVisible,
  onOpen,
  onClose,
  tarefa
}: {
  modalVisible: boolean,
  onOpen: (tarefa?: Task) => void,
  onClose: () => void,
  tarefa: Task | null
}) {


  const FormularioTarefaUnificado = () => (
    <FormularioTarefa onClose={onClose} tarefa={tarefa} />
  );

  return (
    <View>
      <TouchableOpacity
        onPress={() => onOpen()}
        style={{ backgroundColor: '#000', padding: 15, borderRadius: 50, marginBottom: 30, alignSelf: 'flex-end', margin: 10 }}
      >
        <Text style={{ color: '#FFF', fontWeight: 'bold', textAlign: 'center' }}>+ Nova Tarefa</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={onClose}
      >
        <FormularioTarefaUnificado />
      </Modal>
    </View>
  );
}