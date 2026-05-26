import React, { useState, useEffect } from 'react';
import './App.css';

import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Suppliers from './components/Suppliers';
import Menus from './components/Menus';

const NAV_ITEMS = [
  { id: 'dashboard', label: '🏠 ראשי' },
  { id: 'inventory', label: '📦 מלאי ומחסן' },
  { id: 'suppliers', label: '🚚 ספקים' },
  { id: 'menus', label: '🍳 תפריטים ומנות' },
];

const DEFAULT_SUPPLIERS = [
  { id: 'sup_dairy', name: 'מחלבות הר תבור בע"מ', contact: 'דני', phone: '050-1112233' },
  { id: 'sup_meat', name: 'בשרי שער הנגב בע"מ', contact: 'אלי', phone: '050-2223344' },
  { id: 'sup_dry', name: 'סוגת בע"מ', contact: 'רונית', phone: '050-3334455' },
  { id: 'sup_veg', name: 'ירקות הגליל בע"מ', contact: 'אבי', phone: '052-4445566' },
  { id: 'sup_bakery', name: 'מאפיית האחים לוי', contact: 'משה', phone: '054-5556677' },
  { id: 'sup_fruit', name: 'פירות הגליל בע"מ', contact: 'נועה', phone: '053-6667788' },
  { id: 'sup_oil', name: 'כרמי זית הדרום', contact: 'יוסי', phone: '050-7778899' },
];

const DEFAULT_INVENTORY = [
  // === מוצרי חלב ===
  { id: 101, name: 'ביצים', quantity: 120, unit: 'יחידות', minQuantity: 36, category: 'dairy', supplierId: 'sup_dairy' },
  { id: 102, name: 'גבינה בולגרית', quantity: 8, unit: "ק''ג", minQuantity: 3, category: 'dairy', supplierId: 'sup_dairy' },
  { id: 103, name: 'חמאה', quantity: 6, unit: "ק''ג", minQuantity: 2, category: 'dairy', supplierId: 'sup_dairy' },
  { id: 104, name: 'יוגורט יווני', quantity: 30, unit: 'יחידות', minQuantity: 10, category: 'dairy', supplierId: 'sup_dairy' },

  // === בשר ===
  { id: 201, name: 'חזה עוף', quantity: 15, unit: "ק''ג", minQuantity: 5, category: 'meat', supplierId: 'sup_meat' },
  { id: 202, name: 'בקר טחון', quantity: 12, unit: "ק''ג", minQuantity: 4, category: 'meat', supplierId: 'sup_meat' },

  // === יבשים ומזווה ===
  { id: 301, name: 'אורז בסמטי', quantity: 25, unit: "ק''ג", minQuantity: 8, category: 'dry', supplierId: 'sup_dry' },
  { id: 302, name: 'רסק עגבניות', quantity: 10, unit: "ק''ג", minQuantity: 3, category: 'dry', supplierId: 'sup_dry' },
  { id: 303, name: 'פפריקה מתוקה', quantity: 2, unit: "ק''ג", minQuantity: 0.5, category: 'dry', supplierId: 'sup_dry' },
  { id: 304, name: 'פפריקה', quantity: 2, unit: "ק''ג", minQuantity: 0.5, category: 'dry', supplierId: 'sup_dry' },
  { id: 305, name: 'כמון', quantity: 1, unit: "ק''ג", minQuantity: 0.3, category: 'dry', supplierId: 'sup_dry' },
  { id: 306, name: 'מלח', quantity: 10, unit: "ק''ג", minQuantity: 3, category: 'dry', supplierId: 'sup_dry' },
  { id: 307, name: 'פלפל שחור', quantity: 2, unit: "ק''ג", minQuantity: 0.5, category: 'dry', supplierId: 'sup_dry' },
  { id: 308, name: 'פירורי לחם', quantity: 5, unit: "ק''ג", minQuantity: 2, category: 'dry', supplierId: 'sup_dry' },
  { id: 309, name: 'גרנולה', quantity: 8, unit: "ק''ג", minQuantity: 3, category: 'dry', supplierId: 'sup_dry' },
  { id: 310, name: 'דבש', quantity: 6, unit: "ק''ג", minQuantity: 2, category: 'dry', supplierId: 'sup_dry' },
  { id: 311, name: 'קינמון', quantity: 0.5, unit: "ק''ג", minQuantity: 0.2, category: 'dry', supplierId: 'sup_dry' },
  { id: 312, name: 'סוכר', quantity: 15, unit: "ק''ג", minQuantity: 5, category: 'dry', supplierId: 'sup_dry' },
  { id: 313, name: 'אגוזים', quantity: 3, unit: "ק''ג", minQuantity: 1, category: 'dry', supplierId: 'sup_dry' },
  { id: 314, name: 'קמח לבן', quantity: 15, unit: "ק''ג", minQuantity: 5, category: 'dry', supplierId: 'sup_dry' },

  // === ירקות ופירות ===
  { id: 401, name: 'עגבניות', quantity: 20, unit: "ק''ג", minQuantity: 8, category: 'veg', supplierId: 'sup_veg' },
  { id: 402, name: 'עגבניות מרוסקות', quantity: 12, unit: "ק''ג", minQuantity: 4, category: 'veg', supplierId: 'sup_veg' },
  { id: 403, name: 'פלפל אדום', quantity: 10, unit: "ק''ג", minQuantity: 4, category: 'veg', supplierId: 'sup_veg' },
  { id: 404, name: 'שום', quantity: 3, unit: "ק''ג", minQuantity: 1, category: 'veg', supplierId: 'sup_veg' },
  { id: 405, name: 'מלפפון', quantity: 15, unit: "ק''ג", minQuantity: 5, category: 'veg', supplierId: 'sup_veg' },
  { id: 406, name: 'עגבנייה', quantity: 10, unit: "ק''ג", minQuantity: 4, category: 'veg', supplierId: 'sup_veg' },
  { id: 407, name: 'בצל סגול', quantity: 12, unit: "ק''ג", minQuantity: 5, category: 'veg', supplierId: 'sup_veg' },
  { id: 408, name: 'בצל', quantity: 10, unit: "ק''ג", minQuantity: 4, category: 'veg', supplierId: 'sup_veg' },
  { id: 409, name: 'פטרוזיליה', quantity: 2, unit: "ק''ג", minQuantity: 0.5, category: 'veg', supplierId: 'sup_veg' },
  { id: 410, name: 'כרוב לבן', quantity: 8, unit: "ק''ג", minQuantity: 3, category: 'veg', supplierId: 'sup_veg' },
  { id: 411, name: 'גזר', quantity: 15, unit: "ק''ג", minQuantity: 5, category: 'veg', supplierId: 'sup_veg' },
  { id: 412, name: 'אפונה', quantity: 5, unit: "ק''ג", minQuantity: 2, category: 'veg', supplierId: 'sup_veg' },
  { id: 413, name: 'תירס', quantity: 5, unit: "ק''ג", minQuantity: 2, category: 'veg', supplierId: 'sup_veg' },
  { id: 414, name: 'תפוחי אדמה', quantity: 25, unit: "ק''ג", minQuantity: 10, category: 'veg', supplierId: 'sup_veg' },
  { id: 415, name: 'שעועית ירוקה', quantity: 8, unit: "ק''ג", minQuantity: 3, category: 'veg', supplierId: 'sup_veg' },
  { id: 416, name: 'נענע', quantity: 1, unit: "ק''ג", minQuantity: 0.3, category: 'veg', supplierId: 'sup_veg' },
  { id: 417, name: 'תפוחים', quantity: 10, unit: "ק''ג", minQuantity: 4, category: 'veg', supplierId: 'sup_fruit' },
  { id: 418, name: 'פירות יער', quantity: 4, unit: "ק''ג", minQuantity: 2, category: 'veg', supplierId: 'sup_fruit' },
  { id: 419, name: 'בננה', quantity: 5, unit: "ק''ג", minQuantity: 2, category: 'veg', supplierId: 'sup_fruit' },
  { id: 420, name: 'מיץ לימון', quantity: 5, unit: 'ליטר', minQuantity: 2, category: 'drinks', supplierId: 'sup_fruit' },

  // === מאפייה ===
  { id: 501, name: 'לחם מחמצת', quantity: 20, unit: 'יחידות', minQuantity: 8, category: 'dry', supplierId: 'sup_bakery' },

  // === שמנים ===
  { id: 601, name: 'שמן זית', quantity: 10, unit: 'ליטר', minQuantity: 3, category: 'other', supplierId: 'sup_oil' },
  { id: 602, name: 'שמן', quantity: 5, unit: 'ליטר', minQuantity: 2, category: 'other', supplierId: 'sup_oil' },
];

// seed version כדי לטעון את הדאטה החדש אוטומטית פעם אחת
const DATA_VERSION = 'seed-v2';

function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [suppliers, setSuppliers] = useState([]);
  const [inventory, setInventory] = useState([]);

  // אתחול אוטומטי חכם: אם גרסה השתנתה -> טוען דיפולטים חדשים
  useEffect(() => {
    const savedVersion = localStorage.getItem('kitchen_data_version');

    if (savedVersion !== DATA_VERSION) {
      setSuppliers(DEFAULT_SUPPLIERS);
      setInventory(DEFAULT_INVENTORY);
      localStorage.setItem('kitchen_suppliers', JSON.stringify(DEFAULT_SUPPLIERS));
      localStorage.setItem('kitchen_inventory', JSON.stringify(DEFAULT_INVENTORY));
      localStorage.setItem('kitchen_data_version', DATA_VERSION);
      return;
    }

    const savedSuppliers = localStorage.getItem('kitchen_suppliers');
    const savedInventory = localStorage.getItem('kitchen_inventory');

    setSuppliers(savedSuppliers ? JSON.parse(savedSuppliers) : DEFAULT_SUPPLIERS);
    setInventory(savedInventory ? JSON.parse(savedInventory) : DEFAULT_INVENTORY);
  }, []);

  useEffect(() => {
    if (suppliers.length > 0) {
      localStorage.setItem('kitchen_suppliers', JSON.stringify(suppliers));
    }
  }, [suppliers]);

  useEffect(() => {
    if (inventory.length > 0) {
      localStorage.setItem('kitchen_inventory', JSON.stringify(inventory));
    }
  }, [inventory]);

  const updateQuantity = (id, amount) => {
    setInventory(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + amount);
          return { ...item, quantity: Number(newQty.toFixed(2)) };
        }
        return item;
      })
    );
  };

  const lowStockCount = inventory.filter(item => item.quantity <= item.minQuantity).length;

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>FoodManage 🍰 - מערכת ניהול מטבח</h1>

          <nav className="app-nav" aria-label="ניווט ראשי">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`app-nav-btn ${currentScreen === item.id ? 'active' : ''}`}
                onClick={() => setCurrentScreen(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {currentScreen === 'dashboard' && (
        <Dashboard setCurrentScreen={setCurrentScreen} lowStockCount={lowStockCount} />
      )}

      {currentScreen === 'inventory' && (
        <Inventory
          inventory={inventory}
          setInventory={setInventory}
          suppliers={suppliers}
          updateQuantity={updateQuantity}
        />
      )}

      {currentScreen === 'suppliers' && (
        <Suppliers suppliers={suppliers} setSuppliers={setSuppliers} inventory={inventory} />
      )}

      {currentScreen === 'menus' && <Menus />}
    </div>
  );
}

export default App;