import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import useCart from "../context/useCart";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {fetchCount} = useCart()

  const fetchCart = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/cart");
      setItems(res.data?.items || res.data || []);
    } catch (err) {
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (item) => {
    setSubmitting(true);
    setError("");
    try {
      await api.delete("/cart/removeFromCart", {
        data: { productId: item.productId || item._id || item.id },
      });
      await fetchCart();

      fetchCount()
    } catch (err) {
      setError("Failed to remove item");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClear = async () => {
    if (!window.confirm("Clear all items from cart?")) return;
    setSubmitting(true);
    setError("");
    try {
      await api.delete("/cart/clear");
      await fetchCart();
      fetchCount();
    } catch (err) {
      setError("Failed to clear cart");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (items.length === 0) return;
    setSubmitting(true);
    setError("");
    try {
      await api.post("/orders");
      await fetchCart();
      fetchCount()
      navigate("/orders/my");
    } catch (err) {
      setError("Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  const total = items.reduce((sum, item) => {
    const price = Number(item.price || item.product?.price || 0);
    const qty = Number(item.quantity || 1);
    return sum + price * qty;
  }, 0);

  return (
    <div className="bg-amber-300">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
          <p className="text-sm text-gray-600">
            Review items and place your order.
          </p>
        </div>

        {items.length > 0 && (
          <div className="text-right">
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-xl font-bold text-emerald-600">
              ${total.toFixed(2)}
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-10">
          <span className="text-gray-600">Loading cart...</span>
        </div>
      ) : items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-3 mb-6">
            {items.map((item) => {
              const product = item.product || item;
              const price = Number(product.price || item.price || 0);
              const qty = Number(item.quantity || 1);

              return (
                <div
                  key={item._id || item.id || item.productId}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-16 w-16 flex items-center justify-center rounded-md bg-gray-50 overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-contain p-1"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">No image</span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {product.name || "Product"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {qty} &middot; ${price.toFixed(2)} each
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <p className="text-sm font-semibold text-emerald-600">
                      ${(price * qty).toFixed(2)}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleRemove(item)}
                      disabled={submitting}
                      className="inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
            <button
              type="button"
              onClick={handleClear}
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Clear cart
            </button>
            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={submitting || items.length === 0}
              className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {submitting ? "Processing..." : "Place order"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
