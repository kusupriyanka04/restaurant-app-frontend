import { useEffect, useState } from "react";
import api from "../api/axios";
import OrderTracking from "../components/OrderTracking";
// import { useCart } from "../context/CartContext";
import CartSidebar from "../components/CartSidebar";
import { toast } from "react-toastify";

export default function Orders() {
  const [orders, setOrders] = useState([]);
//   const { cart } = useCart(); // optional, if you want to show cart count
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-6">
      {/* Cart Sidebar */}
      <CartSidebar />

      <h2 className="text-2xl font-bold mb-6">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow p-4 hover:shadow-xl transition"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-2">
                <p className="font-bold">Order #{order.id}</p>
                <p className="text-gray-500 text-sm">
                  Total: ₹{order.total}
                </p>
              </div>

              {/* Order Tracking */}
              <OrderTracking status={order.status} />

              {/* Items */}
              <ul className="text-gray-700 text-sm mt-3 space-y-1">
                {order.items?.map((item, idx) => (
                  <li key={idx}>
                    {item.name} × {item.quantity}
                  </li>
                ))}
              </ul>

              {/* Admin: Update Status */}
              {role === "admin" && (
                <select
                  value={order.status}
                  onChange={async (e) => {
                    const newStatus = e.target.value;
                    try {
                      await api.put(`/orders/${order.id}/status`, {
                        status: newStatus,
                      });
                      setOrders((prev) =>
                        prev.map((o) =>
                          o.id === order.id ? { ...o, status: newStatus } : o
                        )
                      );
                      toast.success("Status updated");
                    } catch (err) {
                      console.error(err);
                      toast.error("Failed to update status");
                    }
                  }}
                  className="mt-3 border rounded px-2 py-1 w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Delivered">Delivered</option>
                </select>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
