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
      loadTodos: 'Failed to load saved tasks.',
      updateTodos: 'Failed to update tasks.',
      notFound: 'Task was not found.',
      noHardware: 'Biometric authentication is not available on this device.',
      notEnrolled: 'No biometric credentials are enrolled on this device.',
      cancelled: 'Authentication was cancelled.',
      authFailed: 'Authentication failed. Please try again.',
      authError: 'Something went wrong while checking biometrics.',
    },
    auth: {
      add: 'Authenticate to add a task',
      update: 'Authenticate to update a task',
      delete: 'Authenticate to delete a task',
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
      loadTodos: 'Не вдалося завантажити збережені задачі.',
      updateTodos: 'Не вдалося оновити задачі.',
      notFound: 'Задачу не знайдено.',
      noHardware: 'Біометрична автентифікація недоступна на цьому пристрої.',
      notEnrolled: 'На цьому пристрої не налаштовано біометричні дані.',
      cancelled: 'Автентифікацію скасовано.',
      authFailed: 'Автентифікація не вдалася. Спробуйте ще раз.',
      authError: 'Під час перевірки біометрії сталася помилка.',
    },
    auth: {
      add: 'Підтвердіть дію для додавання задачі',
      update: 'Підтвердіть дію для оновлення задачі',
      delete: 'Підтвердіть дію для видалення задачі',
    },
  },
} as const;

export type Locale = keyof typeof messages;
