import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
    id: string;
    title: string;
    price: number;
    image: string;
    author: string;
    quantity: number;
};

type CartState = {
    items: CartItem[];
    isOpen: boolean;
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string, removeAll?: boolean) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    total: () => number;
};

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (newItem) => set((state) => {
                try {
                    const existingItem = state.items.find(item => item.id === newItem.id);
                    if (existingItem) {
                        return {
                            items: state.items.map(item =>
                                item.id === newItem.id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            )
                        };
                    }
                    return { items: [...state.items, { ...newItem, quantity: 1 }] };
                } catch (error) {
                    console.error('Error adding item to cart:', error);
                    return state;
                }
            }),

            removeItem: (id, removeAll = false) => set((state) => {
                try {
                    if (removeAll) {
                        return { items: state.items.filter(item => item.id !== id) };
                    }

                    return {
                        items: state.items.map(item => {
                            if (item.id === id) {
                                return { ...item, quantity: item.quantity - 1 };
                            }
                            return item;
                        }).filter(item => item.quantity > 0)
                    };
                } catch (error) {
                    console.error('Error removing item from cart:', error);
                    return state;
                }
            }),

            updateQuantity: (id, quantity) => set((state) => {
                try {
                    return {
                        items: state.items.map(item =>
                            item.id === id ? { ...item, quantity } : item
                        ).filter(item => item.quantity > 0)
                    };
                } catch (error) {
                    console.error('Error updating item quantity:', error);
                    return state;
                }
            }),

            clearCart: () => set({ items: [] }),
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),

            total: () => {
                try {
                    const state = get();
                    return state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                } catch (error) {
                    console.error('Error calculating total:', error);
                    return 0;
                }
            }
        }),
        {
            name: 'tricrest-cart-storage',
            // Only persist items, not the open/close state
            partialize: (state) => ({ items: state.items, isOpen: state.isOpen }),
            onRehydrateStorage: () => (state) => {
                console.log('Cart hydrated:', state?.items?.length || 0, 'items');
                return state;
            },
            version: 1,
            migrate: (persistedState: any, version: number) => {
                // Migration logic for future versions
                if (version === 0) {
                    // Migrate from version 0 to 1
                    return {
                        items: persistedState?.items || [],
                        isOpen: false
                    };
                }
                
                // For current version, ensure the state has correct structure
                return {
                    items: Array.isArray(persistedState?.items) ? persistedState.items : [],
                    isOpen: persistedState?.isOpen || false
                };
            },
        }
    )
);
