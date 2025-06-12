
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { Screen } from '../pages/Index';

interface PaymentScreenProps {
  totalPrice: number;
  onNavigate: (screen: Screen) => void;
  onOrderComplete: () => void;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({
  totalPrice,
  onNavigate,
  onOrderComplete
}) => {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const deliveryFee = 15000;
  const finalTotal = totalPrice + deliveryFee;

  useEffect(() => {
    if (isSuccess && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isSuccess && countdown === 0) {
      onOrderComplete();
      onNavigate('main');
    }
  }, [isSuccess, countdown, onOrderComplete, onNavigate]);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  const paymentMethods = [
    {
      id: 'cod',
      name: 'Thanh toán khi nhận hàng (COD)',
      icon: '💵',
      description: 'Thanh toán bằng tiền mặt khi nhận hàng'
    },
    {
      id: 'momo',
      name: 'Ví MoMo',
      icon: '🔴',
      description: 'Thanh toán qua ví điện tử MoMo'
    },
    {
      id: 'banking',
      name: 'Chuyển khoản ngân hàng',
      icon: '🏦',
      description: 'Chuyển khoản qua Internet Banking'
    },
    {
      id: 'card',
      name: 'Thẻ tín dụng/ghi nợ',
      icon: '💳',
      description: 'Visa, Mastercard, JCB'
    }
  ];

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Đặt hàng thành công!</h1>
          <p className="text-gray-600 mb-6">
            Cảm ơn bạn đã đặt hàng. Món ăn sẽ được giao trong 25-35 phút.
          </p>
          <div className="bg-white rounded-lg border p-4 mb-6">
            <div className="text-sm text-gray-600 space-y-1">
              <div>Mã đơn hàng: <span className="font-medium">#SP{Date.now().toString().slice(-6)}</span></div>
              <div>Tổng tiền: <span className="font-medium text-red-500">{finalTotal.toLocaleString('vi-VN')}đ</span></div>
              <div>Thời gian giao dự kiến: <span className="font-medium">25-35 phút</span></div>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Tự động chuyển về trang chủ sau {countdown} giây...
          </p>
          <button
            onClick={() => {
              onOrderComplete();
              onNavigate('main');
            }}
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Về trang chủ ngay
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('checkout')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Thanh toán</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-4">💳 Phương thức thanh toán</h3>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === method.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-orange-500 focus:ring-orange-500"
                    />
                    <div className="text-2xl">{method.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{method.name}</div>
                      <div className="text-sm text-gray-600">{method.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {paymentMethod === 'card' && (
              <div className="bg-white rounded-lg shadow-sm border p-6 mt-4">
                <h4 className="font-medium text-gray-900 mb-4">Thông tin thẻ</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số thẻ
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        MM/YY
                      </label>
                      <input
                        type="text"
                        placeholder="12/25"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Payment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">📋 Tóm tắt đơn hàng</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tạm tính</span>
                  <span className="font-medium">{totalPrice.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Phí giao hàng</span>
                  <span className="font-medium">{deliveryFee.toLocaleString('vi-VN')}đ</span>
                </div>
                <hr />
                <div className="flex justify-between">
                  <span className="font-semibold">Tổng thanh toán</span>
                  <span className="font-semibold text-red-500 text-lg">
                    {finalTotal.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <div className="text-sm text-blue-800">
                  <div className="font-medium mb-1">🛡️ Bảo mật thanh toán</div>
                  <div>Thông tin thanh toán được mã hóa và bảo mật tuyệt đối</div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  isProcessing
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Đang xử lý...</span>
                  </div>
                ) : (
                  `Thanh toán ${finalTotal.toLocaleString('vi-VN')}đ`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
