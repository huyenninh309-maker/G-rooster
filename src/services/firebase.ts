import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  collection,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  Firestore,
} from 'firebase/firestore';
import { ProductOverride } from '../utils/productStore';
import { SavedOrder } from '../components/AdminOrderDashboard';

// Firebase Project Credentials provided by G-ROOSTER CO.,LTD
export const firebaseConfig = {
  apiKey: 'AIzaSyDmSoa_du9RdHmegifIEIYmAmk--qjrM1E',
  authDomain: 'g-rooster-official.firebaseapp.com',
  projectId: 'g-rooster-official',
  storageBucket: 'g-rooster-official.firebasestorage.app',
  messagingSenderId: '216447259354',
  appId: '1:216447259354:web:38b45736764b85a15a8be3',
};

// Initialize Firebase App singleton safely
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
export const db: Firestore = getFirestore(app);

// Firestore Collection & Document keys
export const FIRESTORE_SETTINGS_COLLECTION = 'grooster_settings';
export const FIRESTORE_PRODUCTS_DOC = 'products';
export const FIRESTORE_ORDERS_COLLECTION = 'grooster_orders';

/**
 * Save product overrides (prices, images, wholesale packages, stock) & costs directly to Firebase Firestore
 * This permanently commits the data to Google Cloud Firestore.
 */
export async function saveProductsToFirestore(
  overrides: Record<string, ProductOverride>,
  costs: Record<string, number>,
  stocks?: Record<string, number>
): Promise<{ success: boolean; message: string }> {
  try {
    const productsDocRef = doc(db, FIRESTORE_SETTINGS_COLLECTION, FIRESTORE_PRODUCTS_DOC);
    await setDoc(
      productsDocRef,
      {
        overrides,
        costs,
        stocks: stocks || {},
        updatedAt: new Date().toISOString(),
        productCount: Object.keys(overrides).length,
      },
      { merge: true }
    );
    return {
      success: true,
      message: 'Đã lưu vĩnh viễn dữ liệu vào Firebase Firestore!',
    };
  } catch (err: any) {
    console.error('Lỗi lưu Firebase Firestore:', err);
    return {
      success: false,
      message: err?.message || 'Không thể kết nối Firebase Firestore.',
    };
  }
}

/**
 * Fetch product overrides, costs, and stocks from Firestore once
 */
export async function getProductsFromFirestore(): Promise<{
  overrides: Record<string, ProductOverride>;
  costs: Record<string, number>;
  stocks: Record<string, number>;
} | null> {
  try {
    const productsDocRef = doc(db, FIRESTORE_SETTINGS_COLLECTION, FIRESTORE_PRODUCTS_DOC);
    const snap = await getDoc(productsDocRef);
    if (snap.exists()) {
      const data = snap.data();
      return {
        overrides: (data.overrides || {}) as Record<string, ProductOverride>,
        costs: (data.costs || {}) as Record<string, number>,
        stocks: (data.stocks || {}) as Record<string, number>,
      };
    }
    return null;
  } catch (err) {
    console.warn('Không thể đọc dữ liệu từ Firebase Firestore lúc này:', err);
    return null;
  }
}

/**
 * Real-time listener for Product data changes in Firestore.
 * Ensures that whenever Admin updates prices/images/stocks, all devices (mobile, desktop, tablet)
 * update instantaneously via Firestore onSnapshot.
 */
export function subscribeToFirestoreProducts(
  onUpdate: (data: {
    overrides: Record<string, ProductOverride>;
    costs: Record<string, number>;
    stocks: Record<string, number>;
  }) => void
): () => void {
  try {
    const productsDocRef = doc(db, FIRESTORE_SETTINGS_COLLECTION, FIRESTORE_PRODUCTS_DOC);
    const unsubscribe = onSnapshot(
      productsDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          onUpdate({
            overrides: (data.overrides || {}) as Record<string, ProductOverride>,
            costs: (data.costs || {}) as Record<string, number>,
            stocks: (data.stocks || {}) as Record<string, number>,
          });
        }
      },
      (error) => {
        console.warn('Lỗi lắng nghe Firebase onSnapshot sản phẩm:', error);
      }
    );
    return unsubscribe;
  } catch (err) {
    console.warn('Lỗi thiết lập onSnapshot Firestore:', err);
    return () => {};
  }
}

/**
 * Save new customer Order directly to Firestore
 */
export async function saveOrderToFirestore(order: SavedOrder): Promise<boolean> {
  try {
    const orderDocRef = doc(db, FIRESTORE_ORDERS_COLLECTION, order.id);
    await setDoc(orderDocRef, {
      ...order,
      storedAt: new Date().toISOString(),
    });
    return true;
  } catch (err) {
    console.error('Lỗi lưu đơn hàng vào Firebase Firestore:', err);
    return false;
  }
}

/**
 * Real-time listener for Orders in Firestore
 * Orders table in Admin updates immediately when any new order arrives.
 */
export function subscribeToFirestoreOrders(
  onOrdersChange: (orders: SavedOrder[]) => void
): () => void {
  try {
    const ordersCol = collection(db, FIRESTORE_ORDERS_COLLECTION);
    const q = query(ordersCol, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const ordersList: SavedOrder[] = [];
        querySnapshot.forEach((docSnap) => {
          ordersList.push(docSnap.data() as SavedOrder);
        });
        onOrdersChange(ordersList);
      },
      (error) => {
        console.warn('Lỗi lắng nghe Firebase onSnapshot đơn hàng:', error);
      }
    );
    return unsubscribe;
  } catch (err) {
    console.warn('Lỗi kết nối Firebase orders listener:', err);
    return () => {};
  }
}

/**
 * Update Order status in Firestore
 */
export async function updateOrderStatusInFirestore(
  orderId: string,
  status: SavedOrder['status']
): Promise<boolean> {
  try {
    const orderDocRef = doc(db, FIRESTORE_ORDERS_COLLECTION, orderId);
    await updateDoc(orderDocRef, {
      status,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (err) {
    console.error('Lỗi cập nhật trạng thái đơn hàng trên Firestore:', err);
    return false;
  }
}

/**
 * Delete Order from Firestore
 */
export async function deleteOrderFromFirestore(orderId: string): Promise<boolean> {
  try {
    const orderDocRef = doc(db, FIRESTORE_ORDERS_COLLECTION, orderId);
    await deleteDoc(orderDocRef);
    return true;
  } catch (err) {
    console.error('Lỗi xóa đơn hàng khỏi Firestore:', err);
    return false;
  }
}
