import React from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { Screen } from '../pages/Index';

interface MainScreenProps {
  onRestaurantSelect: (restaurant: any) => void;
  onNavigate: (screen: Screen) => void;
  cartItemsCount: number;
}

const MainScreen: React.FC<MainScreenProps> = ({ onRestaurantSelect, onNavigate, cartItemsCount }) => {
  const restaurants = [
    {
      id: 1,
      name: "Ăn Vặt RyTy - Shop Online",
      address: "161/3 Thành Thủy, P. Thành Bình",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      discount: "Mã giảm 100k",
      category: "Ăn vặt"
    },
    {
      id: 2,
      name: "Xuân Thu - Bún Măng Vịt & Cơm Tấm",
      address: "46A Phạm Văn Nghị, P. Thác Gián",
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      discount: "Mã giảm 100k",
      category: "Bún măng vịt"
    },
    {
      id: 3,
      name: "Tiệm Nước GoHi - Ghế Lá",
      address: "12 Ngô Văn Sở, P. Hòa Khánh Nam",
      image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      discount: "Mã giảm 100k",
      category: "Đồ uống"
    },
    {
      id: 4,
      name: "Ăn Vặt Trúc Vũ - Dinh Văn",
      address: "38 - 48 Đinh Văn Chấp, P. Hòa Xuân",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      discount: "Mã giảm 100k",
      category: "Ăn vặt"
    },
    {
      id: 5,
      name: "Bánh Mì Ba Già - Triều Nữ",
      address: "24 Triều Nữ Vương, Quận Hải Châu",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      discount: "Mã giảm 100k",
      category: "Bánh mì"
    },
    {
      id: 6,
      name: "Lẩu Nồng - Bánh Mướt & Bánh Căn",
      address: "43/5 Phan Tứ, P. Mỹ An, Quận Ngũ",
      image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      discount: "Mã giảm 100k",
      category: "Lẩu"
    }
  ];

  const categories = [
    { name: "Đồ ăn", active: true },
    { name: "Thức phẩm", active: false },
    { name: "Rượu bia", active: false },
    { name: "Hoa", active: false },
    { name: "Siêu thị", active: false },
    { name: "Thuốc", active: false },
    { name: "Thú cưng", active: false }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-orange-500">
                🍽️ ShopeeFood
              </div>
              <div className="flex items-center text-gray-600">
                <span className="text-sm">Đà Nẵng</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm món ăn, nhà hàng..."
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
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
              
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Categories */}
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-8">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  category.active
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border rounded-full text-sm hover:bg-gray-50">
                KHU VỰC ▼
              </button>
              <button className="px-3 py-1 border rounded-full text-sm hover:bg-gray-50">
                PHÂN LOẠI ▼
              </button>
            </div>
            <div className="text-sm text-gray-600">
              Phân loại: (1) ✕
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">16 Kết quả</span>
            <button className="px-3 py-1 border rounded-full text-sm hover:bg-gray-50">
              Đúng nhất ▼
            </button>
          </div>
        </div>
      </div>

      {/* Restaurant Grid */}
      <main className="max-w-6xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              onClick={() => onRestaurantSelect(restaurant)}
              className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
            >
              <div className="relative">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-medium">
                    ⭐
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
                  {restaurant.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-1">
                  {restaurant.address}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-500 text-sm font-medium">
                    🏷️ {restaurant.discount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MainScreen;
