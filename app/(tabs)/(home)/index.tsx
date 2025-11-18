import React from 'react'; 
import { View, Text } from 'react-native'; 
import styles from '../../style';
import CriaTarefa from '@/components/CriaTarefa';
import ListaDeTarefas from '@/components/ListaDeTarefas';

export default function Index() {
    
  return (
    <View style={styles.container}>
      <View style={[styles.viewContainer, { flexDirection: 'row', justifyContent: 'space-between'}]}>
        <Text style={[styles.topView]}>Projeto - Teste</Text> 
      </View>
      <CriaTarefa />
      <ListaDeTarefas />
    </View>
  );
}