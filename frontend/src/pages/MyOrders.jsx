import { useEffect, useState } from "react";
import {getOrdersApi} from "../api/orderApi"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()
   

  useEffect(() => {
    const fetchOrders = async () => {
         const res = await getOrdersApi();

         console.log('THIS IS FROM ORDER PAGE ',res.success)

         if(!res.success)
         {
             console.log("yat jatach nhiyee suceess block of order")
            toast.error("failed to load your order. plz try again");
             navigate('/')
         }
         else{
             console.log(res.data)
             setOrders(res.data)
             setLoading(false)
         }
    };

    fetchOrders();
  }, []);

  return (
  <div className="max-w-3xl mx-auto p-4">
    {/* Header */}
    <div className="mb-6">
      <h1 className="text-3xl font-bold">My Orders</h1>
      <p className="text-sm text-gray-500">
        View all orders placed with your account.
      </p>
    </div>

    {/* Loading */}
    {loading ? (
      <div className="text-center py-10 text-gray-500">
        Loading orders...
      </div>
    ) : orders.length === 0 ? (
      <p className="text-gray-500">You have not placed any orders yet.</p>
    ) : (
      <div className="space-y-5">
        {orders.map((order) => (
          <div
  key={order._id}
  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
>
  {/* Top Section */}
  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
    
    {/* Order Info */}
    <div className="min-w-0">
      <p className="truncate text-sm font-semibold text-gray-900 sm:text-base">
        Order ID: {order._id}
      </p>
      <p className="mt-1 text-xs text-gray-500 sm:text-sm">
        {new Date(order.createdAt).toLocaleString()}
      </p>
    </div>

    {/* Status */}
    <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
      {order.status}
    </span>
  </div>

  {/* Items */}
  <div className="my-4 space-y-2 border-y border-gray-100 py-3">
    {order.items.map((item, index) => (
      <div
        key={index}
        className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3 sm:items-center"
      >
        {/* Product Name */}
        <span className="col-span-2 truncate text-gray-800 sm:col-span-1">
          {item.product?.name || "Product"}
        </span>

        {/* Quantity */}
        <span className="text-gray-500 sm:text-center">
          Qty: {item.quantity}
        </span>

        {/* Price */}
        <span className="text-right font-medium text-gray-900">
          ₹{item.price || 0}
        </span>
      </div>
    ))}
  </div>

  {/* Total */}
  <div className="flex items-center justify-between">
    <span className="text-sm text-gray-500">Total</span>
    <span className="text-lg font-bold text-[color:var(--primary)]">
      ₹{order.totalAmount}
    </span>
  </div>
</div>
        ))}
      </div>
    )}
  </div>
);
}

