import { AuthState } from './types';

export const state: AuthState = {
  username: localStorage.getItem('user-name') || '',
  token: localStorage.getItem('user-token') || ''
}