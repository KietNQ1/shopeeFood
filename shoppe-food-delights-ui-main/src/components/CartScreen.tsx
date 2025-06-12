
import React from 'react';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { Screen, CartItem } from '../pages/Index';

interface CartScreenProps {
  cartItems: CartItem[];
  onUpdateItem: (id: string, quantity: number) => void;
  onNavigate: (screen: Screen) => void;
  totalPrice: number;
}

const CartScreen: React.FC<CartScreenProps> = ({
  cartItems,
  onUpdateItem,
  onNavigate,
  totalPrice
}) => {
  const deliveryFee = 15000;
  const finalTotal = totalPrice + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('main')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Giỏ hàng</h1>
            <span className="text-sm text-gray-500">({cartItems.length} món)</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Giỏ hàng trống</h2>
            <p className="text-gray-600 mb-6">Hãy thêm món ăn vào giỏ hàng để tiếp tục</p>
            <button
              onClick={() => onNavigate('main')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Khám phá món ăn
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm border p-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.restaurantName}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-semibold text-blue-500">
                          {item.price.toLocaleString('vi-VN')}đ
                        </span>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => onUpdateItem(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-medium min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateItem(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
                <h3 className="font-semibold text-gray-900 mb-4">Tóm tắt đơn hàng</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tạm tính ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} món)</span>
                    <span className="font-medium">{totalPrice.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Phí giao hàng</span>
                    <span className="font-medium">{deliveryFee.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <span className="font-semibold">Tổng cộng</span>
                    <span className="font-semibold text-red-500 text-lg">
                      {finalTotal.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => onNavigate('checkout')}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Tiến hành thanh toán
                  </button>
                  <button
                    onClick={() => onNavigate('main')}
                    className="w-full border border-orange-500 text-orange-500 hover:bg-orange-50 py-3 rounded-lg font-medium transition-colors"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartScreen;
