import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type TodoFormProps = {
  onSubmit: (title: string) => Promise<boolean>;
  disabled?: boolean;
};

export function TodoForm({
  onSubmit,
  disabled = false,
}: TodoFormProps): React.JSX.Element {
  const [value, setValue] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (): Promise<void> => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      setLocalError('Title cannot be empty.');
      return;
    }

    const wasCreated = await onSubmit(trimmedValue);

    if (wasCreated) {
      setValue('');
      setLocalError(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>New task</Text>

      <TextInput
        testID="todo-form-input"
        value={value}
        onChangeText={text => {
          setValue(text);
          if (localError) {
            setLocalError(null);
          }
        }}
        placeholder="Add a new task"
        editable={!disabled}
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="sentences"
        returnKeyType="done"
        onSubmitEditing={() => {
          void handleSubmit();
        }}
      />

      {localError ? <Text style={styles.errorText}>{localError}</Text> : null}

      <Pressable
        testID="todo-form-submit"
        onPress={() => {
          void handleSubmit();
        }}
        disabled={disabled}
        style={({ pressed }) => [
          styles.button,
          disabled && styles.buttonDisabled,
          pressed && !disabled && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
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
  button: {
    minHeight: 48,
    borderRadius: 12,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
