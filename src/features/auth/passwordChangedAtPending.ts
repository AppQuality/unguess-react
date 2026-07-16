const DEFAULT_PENDING_KEY = 'ug_psw_changed_at_pending';
const DEFAULT_PENDING_TTL_MS = 24 * 60 * 60 * 1000;

type PendingStateOptions = {
  key?: string;
  ttlMs?: number;
};

const readPendingExpiresAt = (storage: Storage, key: string): number | null => {
  const raw = storage.getItem(key);
  if (!raw) return null;

  const parsed = JSON.parse(raw) as { expiresAt?: number };
  if (typeof parsed.expiresAt !== 'number' || parsed.expiresAt <= Date.now()) {
    storage.removeItem(key);
    return null;
  }

  return parsed.expiresAt;
};

export const createPasswordChangedAtPendingState = (
  options: PendingStateOptions = {}
) => {
  const key = options.key ?? DEFAULT_PENDING_KEY;
  const ttlMs = options.ttlMs ?? DEFAULT_PENDING_TTL_MS;
  let memoryExpiresAt: number | null = null;

  return {
    setPending: () => {
      if (typeof window === 'undefined') return;

      const expiresAt = Date.now() + ttlMs;
      const payload = JSON.stringify({ expiresAt });

      memoryExpiresAt = expiresAt;

      try {
        sessionStorage.setItem(key, payload);
        localStorage.removeItem(key);
        return;
      } catch {
        // Ignore session storage errors and fallback to localStorage.
      }

      try {
        localStorage.setItem(key, payload);
      } catch {
        // Ignore storage errors.
      }
    },
    clearPending: () => {
      memoryExpiresAt = null;
      if (typeof window === 'undefined') return;

      try {
        sessionStorage.removeItem(key);
        localStorage.removeItem(key);
      } catch {
        // Ignore storage errors.
      }
    },
    isPending: () => {
      if (memoryExpiresAt && memoryExpiresAt > Date.now()) {
        return true;
      }

      memoryExpiresAt = null;

      if (typeof window === 'undefined') return false;

      try {
        const sessionExpiresAt = readPendingExpiresAt(sessionStorage, key);
        if (sessionExpiresAt) {
          memoryExpiresAt = sessionExpiresAt;
          return true;
        }
      } catch {
        // Ignore session storage errors and fallback to localStorage.
      }

      try {
        const localExpiresAt = readPendingExpiresAt(localStorage, key);
        if (localExpiresAt) {
          memoryExpiresAt = localExpiresAt;
          return true;
        }
      } catch {
        // Ignore storage errors.
      }

      return false;
    },
  };
};
