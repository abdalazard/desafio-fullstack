import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'; 
import useTarefaStore from '@/hooks/store/task.store';
import styles from '@/app/style'; 

export default function CriaTarefa() {
    
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const { criaTarefa, isLoading } = useTarefaStore();

  const handleSalvar = async () => {
    if (!titulo.trim() || !descricao.trim()) {
        Alert.alert("Atenção", "Preencha todos os campos!");
        return;
    }

    await criaTarefa(titulo, descricao);

    setTitulo('');
    setDescricao('');
  };

  return (
    <View style={[styles.viewContainer, { padding: 20, backgroundColor: '#f9f9f9', borderRadius: 8, marginBottom: 20 }]}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Nova Tarefa</Text>

      <TextInput
        placeholder="Título da tarefa"
        value={titulo}
        onChangeText={setTitulo}
        style={{ 
            borderWidth: 1, 
            borderColor: '#ddd', 
            padding: 10, 
            borderRadius: 5, 
            marginBottom: 10,
            backgroundColor: '#fff'
        }}
      />

      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        multiline
        numberOfLines={3} 
        style={{ 
            borderWidth: 1, 
            borderColor: '#ddd', 
            padding: 10, 
            borderRadius: 5, 
            marginBottom: 15,
            backgroundColor: '#fff',
            textAlignVertical: 'top' 
        }}
      />

      <TouchableOpacity 
        onPress={handleSalvar} 
        disabled={isLoading}
        style={{
            backgroundColor: '#007BFF',
            padding: 12,
            borderRadius: 5,
            alignItems: 'center'
        }}
      >
        {isLoading ? (
            <ActivityIndicator color="#FFF" />
        ) : (
            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Adicionar Tarefa</Text>
        )}
      </TouchableOpacity>

    </View>
  );
}