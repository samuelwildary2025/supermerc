

const API_BASE_URL = '/api'; // Using relative path for proxying

const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

const api = async <T,>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});

  // Only set Content-Type if it's not already set in the options
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'An unknown error occurred' }));
      throw new Error(errorData.detail || 'Request failed');
    }
    if (response.status === 204) { // No Content
        return null as T;
    }
    return response.json();
  } catch (error) {
    console.error(`API call to ${endpoint} failed:`, error);
    throw error;
  }
};

export default api;