import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
} from 'react-native';
import FormularioTarefa from '../FormularioTarefa';

export default function CriaTarefa() {
    
  const [modalVisible, setModalVisible] = useState(false); 

  const FormularioTarefaUnificado = () => (
    <FormularioTarefa onClose={() => setModalVisible(false)} />
  );

  return (
    <View>
      <TouchableOpacity 
          onPress={() => setModalVisible(true)}
          style={{ backgroundColor: '#000', padding: 15, borderRadius: 50, marginBottom: 30,  alignSelf: 'flex-end', margin: 10 }}
        >
          <Text style={{ color: '#FFF', fontWeight: 'bold', textAlign: 'center' }}>+ Nova Tarefa</Text>
        </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={false} 
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} 
      >
        <FormularioTarefaUnificado />
      </Modal>
    </View>
  );
}