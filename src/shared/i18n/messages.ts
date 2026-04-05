export const messages = {
  en: {
    screen: {
      appTitle: 'Secured Todo App',
      appSubtitle:
        'Authentication is required before add, update, and delete actions.',
      loadingTasks: 'Loading saved tasks...',
      noTasksTitle: 'No tasks yet',
      noTasksDescription: 'Add your first secured TODO using the form above.',
      waitingBiometric: 'Waiting for biometric confirmation...',
      newTask: 'New task',
      placeholder: 'Add a new task',
    },
    actions: {
      dismiss: 'Dismiss',
      reload: 'Reload',
      add: 'Add',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      markDone: 'Mark done',
      markActive: 'Mark active',
    },
    status: {
      created: 'Created',
      updated: 'Updated',
      completed: 'Completed',
      active: 'Active',
    },
    errors: {
      emptyTitle: 'Title cannot be empty.',
    },
  },
  ua: {
    screen: {
      appTitle: 'Захищений список справ',
      appSubtitle:
        'Для додавання, оновлення та видалення потрібна автентифікація.',
      loadingTasks: 'Завантаження збережених задач...',
      noTasksTitle: 'Поки немає задач',
      noTasksDescription: 'Додайте першу захищену задачу через форму вище.',
      waitingBiometric: 'Очікування біометричного підтвердження...',
    },
    actions: {
      dismiss: 'Закрити',
      reload: 'Оновити',
      edit: 'Редагувати',
      delete: 'Видалити',
      save: 'Зберегти',
      cancel: 'Скасувати',
      markDone: 'Позначити виконаною',
      markActive: 'Позначити активною',
    },
    status: {
      created: 'Створено',
      updated: 'Оновлено',
      completed: 'Виконано',
      active: 'Активна',
    },
    errors: {
      emptyTitle: 'Назва не може бути порожньою.',
    },
  },
} as const;

export type Locale = keyof typeof messages;
