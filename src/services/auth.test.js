import test from 'node:test';
import assert from 'node:assert/strict';

import {
  authenticateDemoUser,
  clearStoredSession,
  getStoredSession,
  getUserRole,
  canUseFirebaseAuth
} from './auth.js';
import { getStoredTheme, setStoredTheme } from './theme.js';

test('authenticateDemoUser accepts known demo credentials', () => {
  clearStoredSession();

  const session = authenticateDemoUser('buyer@example.com', 'buyer123');

  assert.equal(session.ok, true);
  assert.equal(session.user.role, 'buyer');
});

test('getStoredSession returns null when no session is saved', () => {
  clearStoredSession();

  assert.equal(getStoredSession(), null);
});

test('getUserRole maps known demo emails to the right dashboard role', () => {
  assert.equal(getUserRole('buyer@example.com'), 'buyer');
  assert.equal(getUserRole('seller@example.com'), 'seller');
  assert.equal(getUserRole('admin@example.com'), 'admin');
});

test('canUseFirebaseAuth reflects whether Firebase env values are available', () => {
  assert.equal(typeof canUseFirebaseAuth(), 'boolean');
});

test('theme preference persists and can be read back', () => {
  setStoredTheme('neon');

  assert.equal(getStoredTheme(), 'neon');

  setStoredTheme('dark');
});
