export type CartItem = {
  productId: string;
  quantity: number;
};

const STORAGE_KEY = "ds-embalagens-cart";
const EMPTY: CartItem[] = [];

let snapshot: CartItem[] = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function readFromStorage(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function writeToStorage(items: CartItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage indisponível (modo privado, quota excedida, etc.) — segue sem persistir
  }
}

export const cartStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot(): CartItem[] {
    if (!hydrated) {
      snapshot = readFromStorage();
      hydrated = true;
    }
    return snapshot;
  },
  getServerSnapshot(): CartItem[] {
    return EMPTY;
  },
  setItems(next: CartItem[]) {
    snapshot = next;
    hydrated = true;
    writeToStorage(next);
    listeners.forEach((listener) => listener());
  },
};
