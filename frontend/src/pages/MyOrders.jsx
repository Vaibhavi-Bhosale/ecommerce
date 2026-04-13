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
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            {/* Top Section */}
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="font-semibold">
                  Order ID: {order._id}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                {order.status}
              </span>
            </div>

            {/* Items */}
            <div className="border-t border-b py-2 my-2 space-y-1">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {item.product?.name || "Product"}
                  </span>
                  <span>x{item.quantity}</span>
                  <span>₹{item.price || 0}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="text-right font-semibold">
              Total: ₹{order.totalAmount}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
}

