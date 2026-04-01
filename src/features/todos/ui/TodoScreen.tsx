import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTodos } from '../hooks/useTodos';
import { TodoItem } from './TodoItem';
import { TodoForm } from './TodoForm';
import { Screen } from '../../../shared/ui/Screen';

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

  const isDisabled = isLoading || isMutating;

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.headerBlock}>
          <Text style={styles.title}>Secured Todo App</Text>
          <Text style={styles.subtitle}>
            Authentication is required before add, update, and delete actions.
          </Text>
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
                <Text style={styles.errorActionText}>Dismiss</Text>
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
                <Text style={styles.errorActionText}>Reload</Text>
              </Pressable>
            </View>
          </View>
        ) : null}

        <TodoForm onSubmit={addTodo} disabled={isDisabled} />

        {isMutating ? (
          <View style={styles.statusRow}>
            <ActivityIndicator size="small" />
            <Text style={styles.statusText}>
              Waiting for biometric confirmation...
            </Text>
          </View>
        ) : null}

        {isLoading ? (
          <View style={styles.centerState}>
            <ActivityIndicator size="large" />
            <Text style={styles.stateText}>Loading saved tasks...</Text>
          </View>
        ) : items.length === 0 ? (
          <View style={styles.centerState}>
            <Text style={styles.emptyTitle}>No tasks yet</Text>
            <Text style={styles.stateText}>
              Add your first secured TODO using the form above.
            </Text>
          </View>
        ) : (
          <FlatList
            data={items}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
  },
  headerBlock: {
    gap: 6,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4B5563',
  },
  errorBanner: {
    borderRadius: 14,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    padding: 14,
    gap: 10,
  },
  errorBannerText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#991B1B',
    fontWeight: '500',
  },
  errorActions: {
    flexDirection: 'row',
    gap: 8,
  },
  errorActionButton: {
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  errorActionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#991B1B',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusText: {
    fontSize: 14,
    color: '#374151',
  },
  centerState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  stateText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6B7280',
    textAlign: 'center',
  },
  listContent: {
    gap: 12,
    paddingBottom: 24,
  },
  buttonPressed: {
    opacity: 0.85,
  },
});
