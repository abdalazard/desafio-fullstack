import React, { useState } from 'react'; 
import { View, Text, TouchableOpacity, Modal } from 'react-native'; 
import styles from '../../style';
import ListaDeTarefas from '@/components/ListaDeTarefas';
import FormularioTarefa from '@/components/FormularioTarefa'; 

export default function Index() {
    
  const [modalVisible, setModalVisible] = useState(false); 

  return (
    <View style={styles.container}>
      <View style={[styles.viewContainer, { flexDirection: 'row', justifyContent: 'space-between'}]}>
        <Text style={[styles.topView]}>Projeto - Teste</Text> 
      </View>

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
        <FormularioTarefa 
          onClose={() => setModalVisible(false)}
        />
      </Modal>
      <ListaDeTarefas />      
    </View>
  );
}