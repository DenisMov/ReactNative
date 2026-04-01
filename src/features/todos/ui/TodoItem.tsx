import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Todo } from '../model/types';
import { formatDisplayDate } from '../../../shared/utils/date';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => Promise<boolean>;
  onSave: (id: string, title: string) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
  disabled?: boolean;
};

export function TodoItem({
  todo,
  onToggle,
  onSave,
  onDelete,
  disabled = false,
}: TodoItemProps): React.JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(todo.title);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSave = async (): Promise<void> => {
    const trimmedTitle = draftTitle.trim();

    if (!trimmedTitle) {
      setLocalError('Title cannot be empty.');
      return;
    }

    const wasUpdated = await onSave(todo.id, trimmedTitle);

    if (wasUpdated) {
      setIsEditing(false);
      setLocalError(null);
    }
  };

  return (
    <View testID={`todo-item-${todo.id}`} style={styles.card}>
      <View style={styles.headerRow}>
        <View
          style={[
            styles.statusBadge,
            todo.completed ? styles.statusCompleted : styles.statusActive,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              todo.completed
                ? styles.statusCompletedText
                : styles.statusActiveText,
            ]}
          >
            {todo.completed ? 'Completed' : 'Active'}
          </Text>
        </View>

        <Text style={styles.dateText}>
          Updated {formatDisplayDate(todo.updatedAt)}
        </Text>
      </View>

      {isEditing ? (
        <View style={styles.editBlock}>
          <TextInput
            testID={`todo-edit-input-${todo.id}`}
            value={draftTitle}
            onChangeText={text => {
              setDraftTitle(text);
              if (localError) {
                setLocalError(null);
              }
            }}
            editable={!disabled}
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="sentences"
          />

          {localError ? (
            <Text style={styles.errorText}>{localError}</Text>
          ) : null}

          <View style={styles.actionsRow}>
            <Pressable
              testID={`todo-save-${todo.id}`}
              onPress={() => {
                void handleSave();
              }}
              disabled={disabled}
              style={({ pressed }) => [
                styles.primaryButton,
                disabled && styles.buttonDisabled,
                pressed && !disabled && styles.buttonPressed,
              ]}
            >
              <Text style={styles.primaryButtonText}>Save</Text>
            </Pressable>

            <Pressable
              testID={`todo-cancel-${todo.id}`}
              onPress={() => {
                setDraftTitle(todo.title);
                setLocalError(null);
                setIsEditing(false);
              }}
              disabled={disabled}
              style={({ pressed }) => [
                styles.secondaryButton,
                disabled && styles.buttonDisabled,
                pressed && !disabled && styles.buttonPressed,
              ]}
            >
              <Text style={styles.secondaryButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <>
          <Text style={[styles.title, todo.completed && styles.completedTitle]}>
            {todo.title}
          </Text>

          <View style={styles.actionsRow}>
            <Pressable
              testID={`todo-toggle-${todo.id}`}
              onPress={() => {
                void onToggle(todo.id);
              }}
              disabled={disabled}
              style={({ pressed }) => [
                styles.secondaryButton,
                disabled && styles.buttonDisabled,
                pressed && !disabled && styles.buttonPressed,
              ]}
            >
              <Text style={styles.secondaryButtonText}>
                {todo.completed ? 'Mark active' : 'Mark done'}
              </Text>
            </Pressable>

            <Pressable
              testID={`todo-edit-${todo.id}`}
              onPress={() => {
                setDraftTitle(todo.title);
                setLocalError(null);
                setIsEditing(true);
              }}
              disabled={disabled}
              style={({ pressed }) => [
                styles.secondaryButton,
                disabled && styles.buttonDisabled,
                pressed && !disabled && styles.buttonPressed,
              ]}
            >
              <Text style={styles.secondaryButtonText}>Edit</Text>
            </Pressable>

            <Pressable
              testID={`todo-delete-${todo.id}`}
              onPress={() => {
                void onDelete(todo.id);
              }}
              disabled={disabled}
              style={({ pressed }) => [
                styles.dangerButton,
                disabled && styles.buttonDisabled,
                pressed && !disabled && styles.buttonPressed,
              ]}
            >
              <Text style={styles.dangerButtonText}>Delete</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    gap: 12,
  },
  headerRow: {
    gap: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusActive: {
    backgroundColor: '#DBEAFE',
  },
  statusCompleted: {
    backgroundColor: '#DCFCE7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statusActiveText: {
    color: '#1D4ED8',
  },
  statusCompletedText: {
    color: '#15803D',
  },
  dateText: {
    fontSize: 12,
    color: '#6B7280',
  },
  title: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
    lineHeight: 22,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#6B7280',
  },
  editBlock: {
    gap: 8,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    color: '#111827',
  },
  errorText: {
    fontSize: 13,
    color: '#B91C1C',
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  primaryButton: {
    borderRadius: 10,
    backgroundColor: '#111827',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryButton: {
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },
  dangerButton: {
    borderRadius: 10,
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  dangerButtonText: {
    color: '#B91C1C',
    fontSize: 14,
    fontWeight: '700',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonPressed: {
    opacity: 0.85,
  },
});
