export function getPostgresClient() {
  return {
    mode: 'neon-postgres-placeholder',
    note: 'Configure connection string via env vars in production.'
  };
}
