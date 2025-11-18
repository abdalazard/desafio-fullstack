import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'; 
import useTarefaStore from '@/hooks/store/task.store';
import styles from '@/app/style'; 
import { X } from 'phosphor-react-native'; // Importe um ícone para fechar (se estiver usando phosphor)

// Agora ele aceita uma prop onClose
export default function FormularioTarefa({ onClose }: any) { 
    
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const { criaTarefa, isLoading } = useTarefaStore();

  const handleSalvar = async () => {
    if (!titulo.trim() || !descricao.trim()) {
        Alert.alert("Atenção", "Preencha todos os campos!");
        return;
    }

    await criaTarefa(titulo, descricao);
    
    // Limpa os campos
    setTitulo('');
    setDescricao('');
    
    onClose(); 
  };

  return (
    <View style={styles.container}>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Criar Nova Tarefa</Text>
            <TouchableOpacity onPress={onClose} style={{ padding: 5 }}>
                <X size={24} color="#333" /> 
            </TouchableOpacity>
        </View>

        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Título da tarefa"
                value={titulo}
                onChangeText={setTitulo}
                style={[styles.input, { marginBottom: 10 }]}
            />

            <TextInput
                placeholder="Descrição"
                value={descricao}
                onChangeText={setDescricao}
                multiline
                numberOfLines={5} 
                style={[styles.input, { height: 120, marginBottom: 15, textAlignVertical: 'top' }]}
            />

            <TouchableOpacity 
                onPress={handleSalvar} 
                disabled={isLoading}
                style={{
                    backgroundColor: '#000',
                    padding: 15,
                    borderRadius: 5,
                    alignItems: 'center'
                }}
            >
                {isLoading ? (
                    <ActivityIndicator color="#FFF" />
                ) : (
                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Salvar Tarefa</Text>
                )}
            </TouchableOpacity>
        </View>
        
    </View>
  );
}
