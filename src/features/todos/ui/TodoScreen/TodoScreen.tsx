import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useTodos } from '../../hooks/useTodos';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodoForm } from '../TodoForm/TodoForm';
import { useI18n } from '../../../../shared/i18n/useI18n';
import { styles } from './TodoScreen.styles';
import { Screen } from '../../../../shared/ui/Screen/Screen';

export function TodoScreen(): React.JSX.Element {
  const {
    items,
    isLoading,
    isMutating,
    error,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    clearError,
    reload,
  } = useTodos();
  const { t } = useI18n();
  const isDisabled = isLoading || isMutating;

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.headerBlock}>
          <Text style={styles.title}>{t('screen.appTitle')}</Text>
          <Text style={styles.subtitle}>{t('screen.appSubtitle')}</Text>
        </View>

        {error ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>{error}</Text>

            <View style={styles.errorActions}>
              <Pressable
                onPress={clearError}
                style={({ pressed }) => [
                  styles.errorActionButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.errorActionText}>
                  {t('actions.dismiss')}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  void reload();
                }}
                style={({ pressed }) => [
                  styles.errorActionButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.errorActionText}>
                  {t('actions.reload')}
                </Text>
              </Pressable>
            </View>
          </View>
        ) : null}

        <TodoForm onSubmit={addTodo} disabled={isDisabled} />

        {isMutating ? (
          <View style={styles.statusRow}>
            <ActivityIndicator size="small" />
            <Text style={styles.statusText}>
              {t('screen.waitingBiometric')}
            </Text>
          </View>
        ) : null}

        {isLoading ? (
          <View style={styles.centerState}>
            <ActivityIndicator size="large" />
            <Text style={styles.stateText}>{t('screen.loadingTasks')}</Text>
          </View>
        ) : items.length === 0 ? (
          <View style={styles.centerState}>
            <Text style={styles.emptyTitle}>{t('screen.noTasksTitle')}</Text>
            <Text style={styles.stateText}>
              {t('screen.noTasksDescription')}
            </Text>
          </View>
        ) : (
          <FlatList
            style={styles.list}
            data={items}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TodoItem
                todo={item}
                onToggle={toggleTodo}
                onSave={updateTodo}
                onDelete={deleteTodo}
                disabled={isDisabled}
              />
            )}
          />
        )}
      </View>
    </Screen>
  );
}
