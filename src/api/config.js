export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://tasks-mgt.local/api',
  TIMEOUT: 30000,
};

export const ENDPOINTS = {
  // Auth
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_ME: '/auth/me',
  AUTH_REFRESH: '/auth/refresh',
  
  // Tasks
  TASKS: '/tasks',
  TASKS_FILTER: '/tasks/filter',
  TASKS_STATISTICS: '/tasks/statistics',
  TASKS_UPCOMING: '/tasks/upcoming',
  TASK_DETAIL: (id) => `/tasks/${id}`,
  TASK_STATUS: (id) => `/tasks/${id}/status`,
  TASKS_BULK_STATUS: '/tasks/bulk-status',
};