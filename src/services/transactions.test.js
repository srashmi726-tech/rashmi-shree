import test from 'node:test';
import assert from 'node:assert/strict';

import { clearBankTransactions, createBankTransaction, getBankTransactions } from './transactions.js';

test('createBankTransaction stores a real purchase record in session storage', () => {
  clearBankTransactions();

  const transaction = createBankTransaction({
    product: 'Aurora Dress',
    amount: 1499,
    paymentMethod: 'Bank Transfer'
  });

  assert.equal(transaction.ok, true);
  assert.equal(transaction.transactionId.length > 0, true);
  assert.equal(getBankTransactions().length, 1);
  assert.equal(getBankTransactions()[0].product, 'Aurora Dress');
});
