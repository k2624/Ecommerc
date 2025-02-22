import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  async function fetchOrders() {
    try {
      setLoading(true);
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/orders/user/6776c3bc2edf96cf9329ae0a');
      console.log(data); // <-- شوف شكل البيانات هنا
      setOrders(data); // تأكدي إن `data` فعلاً Array
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto py-8">
  <h2 className="text-3xl font-bold mb-6 text-center">All Orders</h2>
  {loading ? (
    <div className="text-center">
      <i className="fas fa-spin fa-spinner text-main text-4xl"></i>
    </div>
  ) : orders.length === 0 ? (
    <p className="text-center text-gray-600">No orders found.</p>
  ) : (
    <div >
      {orders.map((order) => (
        <div key={order.id} className="mb-9 border border-gray-200 rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Order ID: <span className="text-main">{order.id}</span></h3>
              <p className="text-sm text-gray-700">Payment Method: <span className="font-medium">{order.paymentMethodType}</span></p>
              <p className="text-sm text-gray-700">Address: <span className="font-medium">{order.shippingAddress.city}</span></p>
              <p className="text-sm text-gray-700">Phone: <span className="font-medium">{order.shippingAddress.phone}</span></p>
              <p className="text-sm text-gray-700">Total Price: <span className="font-bold">{order.totalOrderPrice} EGP</span></p>
              <p className="text-sm text-gray-700">Order Date: <span className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</span></p>
            </div>
            <div className="w-24 h-24 overflow-hidden rounded-lg shadow-sm">
              <img src={order.cartItems[0].product.imageCover} alt={order.cartItems[0].product.title} className="w-full h-full object-cover" />
            </div>
          <div className="pt-4">
            <h4 className="text-md font-semibold mb-2">Product Details:</h4>
            <p className="text-sm text-gray-700">Product Name: <span className="font-medium">{order.cartItems[0].product.title}</span></p>
            <p className="text-sm text-gray-700">Quantity: <span className="font-medium">{order.cartItems[0].count}</span></p>
          </div>
          </div>
          
        </div>
      ))}
    </div>
  )}
</div>

  );
}

