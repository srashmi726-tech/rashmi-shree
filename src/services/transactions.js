const TRANSACTION_KEY = 'rashmi-shree-bank-transactions';
const memoryStore = {};

function getStorage() {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }

  return {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(memoryStore, key) ? memoryStore[key] : null;
    },
    setItem(key, value) {
      memoryStore[key] = String(value);
    },
    removeItem(key) {
      delete memoryStore[key];
    }
  };
}

export function getBankTransactions() {
  const storage = getStorage();
  const raw = storage.getItem(TRANSACTION_KEY);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw);
  } catch {
    storage.removeItem(TRANSACTION_KEY);
    return [];
  }
}

export function clearBankTransactions() {
  getStorage().removeItem(TRANSACTION_KEY);
}

export function createBankTransaction({ product, amount, paymentMethod = 'Bank Transfer' }) {
  const storage = getStorage();
  const transaction = {
    id: `BANK-${Date.now()}`,
    product,
    amount,
    paymentMethod,
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  };

  const existing = getBankTransactions();
  const next = [transaction, ...existing].slice(0, 25);

  storage.setItem(TRANSACTION_KEY, JSON.stringify(next));

  return {
    ok: true,
    transactionId: transaction.id,
    status: transaction.status,
    transaction
  };
}
