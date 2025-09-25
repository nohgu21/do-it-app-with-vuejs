import localforage from 'localforage';
import type { Todo } from '../types/todo';

// API response interface for the todos endpoint
interface FetchTodosApiResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

// Configuring my localforage by setting IndexedDB as the primary storage method 
// so it falls back to LocalStorage if IndexedDB isn't available.
localforage.config({
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
  name: 'DoItApp',
  version: 1.0,
  storeName: 'todos'
});

async function fetchMyTodos(): Promise<Todo[]> {
  try {
    const response = await fetch(`https://dummyjson.com/todos?limit=0&select=id,todo,completed`);
    if (!response.ok) throw new Error('Failed to fetch');
    const data: FetchTodosApiResponse = await response.json();
    return data.todos ?? [];
  } catch (error) {
    console.error('Network error, trying offline data:', error);
    throw error;
  }
}

// This function checks if the user is online. If offline, it tries to load cached data. 
// If online, it fetches fresh data, caches the response, and returns it. 
// If the network request fails, it attempts to retrieve cached data as a fallback
async function fetchCachedTodos(): Promise<Todo[]> {
  try {
    if (!navigator.onLine) {
      console.log('Offline mode: Loading from cache');
      const cached = await localforage.getItem<Todo[]>('all-todos');
      if (cached) return cached;
      throw new Error('No offline data available');
    }
    
    // Try to get the fresh data
    const response = await fetchMyTodos();
    
    // And then cache the response
    await localforage.setItem('all-todos', response);
    await localforage.setItem('todos-timestamp', Date.now());
    
    return response;
  } catch (error) {
    // So I'm setting here to say if the network fails, try caching it
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.log('Network failed, trying cache:', errorMessage);
    
    const cached = await localforage.getItem<Todo[]>('all-todos');
    if (cached) {
      console.log('Returning cached data');
      return cached;
    }
    throw error;
  }
}

export { fetchMyTodos, fetchCachedTodos };