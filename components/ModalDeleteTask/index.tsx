import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './style';

interface ConfirmDeleteModalProps {
    isVisible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    taskId?: number | null;
}

export default function ModalDeleteTask({ isVisible, onConfirm, onCancel, taskId }: ConfirmDeleteModalProps) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onCancel}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
                    <Text style={styles.modalText}>
                        Tem certeza que deseja excluir a tarefa "{taskId || 'esta tarefa'}"?
                    </Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonCancel]}
                            onPress={onCancel}
                        >
                            <Text style={styles.textStyle}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonConfirm]}
                            onPress={onConfirm}
                        >
                            <Text style={styles.textStyle}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
