import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useI18n } from '../../../../shared/i18n/useI18n';
import { styles } from './TodoForm.styles';

type TodoFormProps = {
  onSubmit: (title: string) => Promise<boolean>;
  disabled?: boolean;
};

export function TodoForm({
  onSubmit,
  disabled = false,
}: TodoFormProps): React.JSX.Element {
  const { t } = useI18n();
  const [value, setValue] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (): Promise<void> => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      setLocalError(t('errors.emptyTitle'));
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
      <Text style={styles.label}>{t('screen.newTask')}</Text>

      <TextInput
        testID="todo-form-input"
        value={value}
        onChangeText={text => {
          setValue(text);
          if (localError) {
            setLocalError(null);
          }
        }}
        placeholder={t('screen.placeholder')}
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
        <Text style={styles.buttonText}>{t('actions.add')}</Text>
      </Pressable>
    </View>
  );
}
