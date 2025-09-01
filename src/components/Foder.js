function Footer() {
  return (
    <footer className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Giới thiệu */}
        <div>
          <h2 className="text-2xl font-bold mb-3">SeaTravel</h2>
          <p className="text-gray-100">
            Khám phá những bãi biển đẹp nhất Việt Nam và thế giới. Trải nghiệm
            du lịch trọn vẹn cùng chúng tôi.
          </p>
        </div>

        {/* Liên kết nhanh */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Liên kết</h3>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="hover:underline">
                Trang chủ
              </a>
            </li>
            <li>
              <a href="#destinations" className="hover:underline">
                Điểm đến
              </a>
            </li>
            <li>
              <a href="#gallery" className="hover:underline">
                Thư viện ảnh
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">
                Liên hệ
              </a>
            </li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Liên hệ</h3>
          <p>Email: support@seatravel.com</p>
          <p>Hotline: +84 123 456 789</p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-gray-200">
              🌐
            </a>
            <a href="#" className="hover:text-gray-200">
              📘
            </a>
            <a href="#" className="hover:text-gray-200">
              📷
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-white/20 pt-4 text-center text-sm text-gray-200">
        © 2025 SeaTravel. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
