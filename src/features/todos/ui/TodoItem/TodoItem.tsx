import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Todo } from '../../model/types';
import { formatDisplayDate } from '../../../../shared/utils/date';
import { getTodoDisplayMeta } from '../../../../shared/utils/todoMeta';
import { useI18n } from '../../../../shared/i18n/useI18n';
import { styles } from './TodoItem.styles';

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
  const { t } = useI18n();
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(todo.title);
  const [localError, setLocalError] = useState<string | null>(null);
  const meta = getTodoDisplayMeta(todo);

  const handleSave = async (): Promise<void> => {
    const trimmedTitle = draftTitle.trim();

    if (!trimmedTitle) {
      setLocalError(t('emptyTitleError'));
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
            {todo.completed ? t('status.completed') : t('status.active')}
          </Text>
        </View>

        <Text style={styles.dateText}>
          {t(`status.${meta.labelKey}`)} {formatDisplayDate(meta.date)}
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
              <Text style={styles.primaryButtonText}>{t('actions.save')}</Text>
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
              <Text style={styles.secondaryButtonText}>
                {' '}
                {t('actions.cancel')}
              </Text>
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
                {todo.completed
                  ? t('actions.markActive')
                  : t('actions.markDone')}
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
              <Text style={styles.secondaryButtonText}>
                {t('actions.edit')}
              </Text>
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
              <Text style={styles.dangerButtonText}>{t('actions.delete')}</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}
