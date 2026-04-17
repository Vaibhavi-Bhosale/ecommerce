import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAdminOrders } from "../api/adminApi";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const result = await getAdminOrders();

      if (!result.success) {
        toast.error(result.message || "Failed to load orders");
        setOrders([]);
        setLoading(false);
        return;
      }

      setOrders(Array.isArray(result.data) ? result.data : []);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[color:var(--text)]">
          Orders
        </h1>
        <p className="text-sm text-[color:var(--text-muted)]">
          Manage all customer orders
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading orders...
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500">
          No orders found
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-xl p-5 shadow-sm bg-white"
            >
              {/* Top Section */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Order #{order.id.slice(-6)}
                  </p>

                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>

                  <p className="text-xs text-gray-600 mt-1">
                    {order.customerEmail}
                  </p>
                </div>

                <span className="text-xs px-3 py-1 rounded-full bg-gray-100 font-medium">
                  {order.status}
                </span>
              </div>

              {/* Items */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Items
                </p>

                <div className="space-y-1 text-sm text-gray-600">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>× {item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex justify-between items-center border-t pt-3">
                <p className="font-semibold text-lg text-black">
                  ₹{order.total}
                </p>

                <button className="text-sm px-4 py-2 rounded-md bg-black text-white hover:opacity-90">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}