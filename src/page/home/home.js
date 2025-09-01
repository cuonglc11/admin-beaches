import React, { useEffect, useState } from "react";
import Hero from "../../components/Hero";
import { motion } from "framer-motion";
import Experience from "../../components/Experience";
import Testimonial from "../../components/Review";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { toast } from "react-toastify";
import { listBeachesHome, url } from "../../api/function";
import { useNavigate } from "react-router-dom";

function Home() {
  const [beaches, setBeaches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fectData();
  }, []);
  const fectData = async () => {
    try {
      const rs = await listBeachesHome();
      setBeaches(rs.data?.data);
    } catch (error) {}
  };
  const enventStatus = () => {
    if (!localStorage.getItem("token")) {
      toast.error("You are not logged in as a member.");
      return;
    }
    if (localStorage.getItem("role") != 2) {
      toast.error("you are not account.");
      return;
    }
  };
  const detailBeaches = (value) => {
    navigate("/detail-beaches", { state: { id: value } });
  };
  return (
    <>
      <Hero />
      <section className="py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Khám phá điểm đến nổi bật</h2>
        <p className="max-w-2xl mx-auto mb-10 text-gray-600">
          Từ bãi biển trong xanh, cát trắng mịn đến những địa điểm nghỉ dưỡng lý
          tưởng – hãy cùng trải nghiệm hành trình du lịch tuyệt vời.
        </p>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="my-8"
        >
          {beaches.map((b, i) => (
            <SwiperSlide key={i}>
              <div
                className="h-full bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer"
                onClick={() => detailBeaches(b.id)}
              >
                <div className="h-60 overflow-hidden">
                  <img
                    src={url + "" + b.images[0].img_link}
                    alt={b.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {b.name}
                    </h3>
                    <div
                      className="text-gray-600 text-sm mb-4"
                      dangerouslySetInnerHTML={{ __html: b.description }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-gray-500 pt-2 border-t">
                    <button
                      onClick={() => enventStatus()}
                      className="flex items-center gap-2 hover:text-red-500 transition"
                    >
                      <FaHeart className="text-lg" />
                      <span>{b.favorites_count}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-blue-500 transition">
                      <FaRegComment className="text-lg" />
                      <span>{b.comments_count}</span>
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className="py-12 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-4">
          Những bãi biển tuyệt đẹp
        </h2>
        <p className="text-center max-w-2xl mx-auto text-gray-600 mb-10">
          Bộ sưu tập hình ảnh để bạn cảm nhận vẻ đẹp thiên nhiên.
        </p>

        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="my-6"
        >
          {[1, 2, 3, 4].map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="overflow-hidden rounded-2xl shadow-lg hover:scale-105 transition">
                <img
                  src="https://media.istockphoto.com/id/1360554439/vi/anh/%C4%91%E1%BA%A3o-nhi%E1%BB%87t-%C4%91%E1%BB%9Bi-maldives.jpg?s=612x612&w=0&k=20&c=pqWxvBFhn0_mJQF-oNyiDS56iahHule2vZmmVbjc_TA="
                  alt={`Bãi biển ${idx + 1}`}
                  className="w-full h-60 object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-4">
          Điểm nhấn nổi bật
        </h2>
        <p className="text-center max-w-2xl mx-auto text-gray-600 mb-12">
          Trải nghiệm những hoạt động thú vị và dịch vụ đặc biệt chỉ có tại đây.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-2">Hoạt động biển</h3>
            <p>L lặn biển, chèo thuyền kayak, và các trò chơi trên sóng.</p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-2">Ẩm thực</h3>
            <p>Thưởng thức hải sản tươi ngon và đặc sản vùng miền.</p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-2">Nghỉ dưỡng</h3>
            <p>Resort sang trọng với dịch vụ cao cấp và view biển tuyệt đẹp.</p>
          </motion.div>
        </div>
      </section>
      <Experience />
      <Testimonial />
    </>
  );
}

export default Home;
