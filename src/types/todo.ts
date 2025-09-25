// types/todo.ts
export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface TodoFormData {
  todo: string;
}

export interface TodoResponse {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  message?: string;
}

// types/components.ts
export type TodoStatusFilter = 'all' | 'completed' | 'pending';

export interface SearchFilterProps {
  searchTodo: string;
  todoStatusFilter: TodoStatusFilter;
}

export interface SearchFilterEmits {
  (e: 'update:searchTodo', value: string): void;
  (e: 'update:todoStatusFilter', value: TodoStatusFilter): void;
}

export interface AddTodoModalProps {
  isOpen?: boolean;
}

export interface AddTodoModalEmits {
  (e: 'close'): void;
}

export interface MyTodoListProps {
  searchTodo: string;
  todoStatusFilter: TodoStatusFilter;
  currentPage: number;
}

export interface MyTodoListEmits {
  (e: 'update:currentPage', value: number): void;
}

export interface EditTodoModalProps {
  todo: Todo;
}

export interface EditTodoModalEmits {
  (e: 'close'): void;
}