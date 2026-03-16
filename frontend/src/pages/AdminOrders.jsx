import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/orders");
        setOrders(res.data || []);
      } catch (err) {
        setError("Failed to load all orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">All Orders</h1>
        <p className="text-sm text-gray-600">
          Admin view of all customer orders.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-10">
          <span className="text-gray-600">Loading orders...</span>
        </div>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id || order.id}
              className="rounded-lg border border-gray-200 bg-white p-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Order #{order._id || order.id}
                  </p>
                  {order.user && (
                    <p className="text-xs text-gray-500">
                      User:{" "}
                      {order.user.email ||
                        order.user.name ||
                        order.user._id ||
                        "Unknown"}
                    </p>
                  )}
                  {order.createdAt && (
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  )}
                </div>
                {order.status && (
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    {order.status}
                  </span>
                )}
              </div>

              {Array.isArray(order.items) && order.items.length > 0 && (
                <ul className="mb-2 space-y-1 text-sm text-gray-700">
                  {order.items.map((item) => (
                    <li key={item._id || item.id}>
                      {item.product?.name || "Product"} &times;{" "}
                      {item.quantity || 1}
                    </li>
                  ))}
                </ul>
              )}

              {order.total && (
                <p className="text-sm font-semibold text-emerald-600">
                  Total: ${Number(order.total).toFixed(2)}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

