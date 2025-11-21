import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import useTarefaStore from '@/hooks/store/task.store';
import styles from '@/app/style';
import { X } from 'phosphor-react-native';
import Toast from 'react-native-toast-message';
import { Task } from '@/hooks/store/types/task.type';

export default function FormularioTarefa({ onClose, tarefa }: { onClose: () => void, tarefa: Task | null }) {

    const [titulo, setTitulo] = useState(tarefa?.title || '');
    const [descricao, setDescricao] = useState(tarefa?.description || '');

    const { updateTarefa, criaTarefa, isLoading, error } = useTarefaStore();

    useEffect(() => {
        setTitulo(tarefa?.title || '');
        setDescricao(tarefa?.description || '');
    }, [tarefa]);

    const handleSalvar = async () => {
        if (!titulo.trim() || !descricao.trim()) {
            Alert.alert("Atenção", "Preencha todos os campos!");
            return;
        }

        try {
            if (tarefa) {
                await updateTarefa(tarefa.id, titulo, descricao);
                Toast.show({
                    type: 'success',
                    text1: 'Sucesso!',
                    text2: `A tarefa '${titulo}' foi atualizada.`,
                    position: 'bottom',
                });
            } else {
                await criaTarefa(titulo, descricao);
                Toast.show({
                    type: 'success',
                    text1: 'Sucesso!',
                    text2: `A tarefa '${titulo}' foi criada.`,
                    position: 'bottom',
                });
            }

            setTitulo('');
            setDescricao('');
            onClose();

        } catch (e) {
            if (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Erro na Operação',
                    text2: error,
                    position: 'bottom',
                });
            }
        }
    };

    const isEditing = !!tarefa;
    const buttonText = isEditing ? 'Salvar Alterações' : 'Criar Tarefa';
    const modalTitle = isEditing ? 'Editar Tarefa' : 'Criar Nova Tarefa';


    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{modalTitle}</Text>
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
                        backgroundColor: isEditing ? '#FFA500' : '#000',
                        padding: 15,
                        borderRadius: 5,
                        alignItems: 'center'
                    }}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{buttonText}</Text>
                    )}
                </TouchableOpacity>
            </View>

        </View>
    );
}
