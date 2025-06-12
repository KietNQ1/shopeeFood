import React from 'react';
import { ArrowLeft, ShoppingCart, Plus } from 'lucide-react';
import { Screen, CartItem } from '../pages/Index';

interface RestaurantMenuProps {
  restaurant: any;
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
  onNavigate: (screen: Screen) => void;
  cartItemsCount: number;
}

const RestaurantMenu: React.FC<RestaurantMenuProps> = ({
  restaurant,
  onAddToCart,
  onNavigate,
  cartItemsCount
}) => {
  const menuItems = [
    {
      id: '1',
      name: 'Nha dam hạt chia (chai)',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Nước giải khát tự nhiên'
    },
    {
      id: '2',
      name: 'Sữa chua uống (chai)',
      price: 20000,
      image: 'https://images.unsplash.com/photo-1571167187097-d3dc681bddec?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Sữa chua uống mát lạnh'
    },
    {
      id: '3',
      name: 'Gân bò chua cay (hũ)',
      price: 80000,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Gân bò tươi ngon chua cay'
    },
    {
      id: '4',
      name: 'Kem flan (hộp)',
      price: 10000,
      image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Kem flan thơm ngon mát lạnh'
    }
  ];

  const promotions = [
    {
      title: 'Nam A Bank giảm 100k',
      description: 'Áp dụng cho đơn hàng từ 200k',
      code: 'NAMA100'
    },
    {
      title: 'Nam A Bank giảm 40k',
      description: 'Áp dụng cho đơn hàng từ 100k',
      code: 'NAMA40'
    },
    {
      title: 'Home Credit giảm 50.000đ',
      description: 'Áp dụng cho đơn hàng từ 150k',
      code: 'HC50'
    },
    {
      title: 'Home Credit giảm 30.000đ',
      description: 'Áp dụng cho đơn hàng từ 80k',
      code: 'HC30'
    }
  ];

  const handleAddToCart = (item: any) => {
    onAddToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      restaurantName: restaurant?.name || 'Unknown Restaurant'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onNavigate('main')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="text-2xl font-bold text-orange-500">
                🍽️ ShopeeFood
              </div>
            </div>
            
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2 text-gray-600 hover:text-orange-500 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Promotions */}
          <div className="lg:col-span-2">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <h2 className="font-semibold text-gray-900 mb-4">🎯 Khuyến mãi</h2>
              <div className="space-y-3">
                {promotions.map((promo, index) => (
                  <div key={index} className="flex items-center justify-between bg-white border rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">🏷️</span>
                      </div>
                      <div>
                        <div className="font-medium text-sm">{promo.title}</div>
                        <div className="text-xs text-gray-600">{promo.description}</div>
                      </div>
                    </div>
                    <button className="text-xs text-blue-500 hover:text-blue-700 border border-blue-200 px-2 py-1 rounded">
                      Copy code 📋
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Menu */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">MENU</h2>
              <div className="space-y-4">
                {menuItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-semibold text-blue-500">
                          {item.price.toLocaleString('vi-VN')}đ
                        </span>
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-lg p-6 text-white text-center sticky top-24">
              <div className="bg-white p-4 rounded-lg mb-4">
                <div className="w-32 h-32 mx-auto bg-black"></div>
              </div>
              <h3 className="font-semibold mb-2">Quét mã để đặt món</h3>
              <p className="text-sm opacity-90">trên app Shopee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
