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
import {
  ImageBanner,
  favoritesAdd,
  favoritesCheck,
  favoritesDelete,
  listBeachesHome,
  url,
} from "../../api/function";
import { useNavigate } from "react-router-dom";

function Home() {
  const [beaches, setBeaches] = useState([]);
  const [imageBetifu, setImageBetifu] = useState([]);

  const navigate = useNavigate();
  const [favorites, setFavorites] = useState({});
  useEffect(() => {
    fectData();
    fectDataImageBe();
  }, []);
  const fectData = async () => {
    try {
      const rs = await listBeachesHome();
      const list = rs.data?.data || [];

      setBeaches(rs.data?.data);
      if (localStorage.getItem("token") && localStorage.getItem("user")) {
        const favStatus = {};
        for (let b of list) {
          try {
            const res = await favoritesCheck(b.id);
            console.log(res?.data?.message);
            favStatus[b.id] = res?.data?.message ? "red" : "";
          } catch (error) {
            favStatus[b.id] = "";
          }
        }
        setFavorites(favStatus);
      }
    } catch (error) {}
  };
  const fectDataImageBe = async () => {
    try {
      const rs = await ImageBanner(2);
      // console.log();
      setImageBetifu(rs?.data?.data);
    } catch (error) {}
  };
  const enventStatus = async (id) => {
    if (!localStorage.getItem("token")) {
      toast.error("You are not logged in as a member.");
      return;
    }
    if (localStorage.getItem("role") != 2) {
      toast.error("you are not account.");
      return;
    }
    if (!favorites[id]) {
      try {
        const rs = await favoritesAdd(id);
        fectData();
        setFavorites({ ...favorites, [id]: "red" });
      } catch (error) {}
    } else {
      try {
        const rs = await favoritesDelete(id);
        fectData();
        setFavorites({ ...favorites, [id]: "red" });
      } catch (error) {}
    }
  };
  const detailBeaches = (value , beaches) => {
    navigate("/detail-beaches", { state: { beaches: beaches } });
  };
  return (
    <>
      <Hero />
      <section className="py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Discover Featured Destinations
        </h2>
        <p className="max-w-2xl mx-auto mb-10 text-gray-600">
          From crystal-clear beaches and soft white sands to ideal resort spots
          – embark on an unforgettable travel journey.
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
              <div className="h-full bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer">
                <div className="h-60 overflow-hidden">
                  <img
                    src={url + "" + b.images[0].img_link}
                    alt={b.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div onClick={() => detailBeaches(b.id , b)}>
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
                      onClick={() => enventStatus(b.id)}
                      className="flex items-center gap-2 hover:text-red-500 transition"
                    >
                      {localStorage.getItem("token") &&
                      localStorage.getItem("role") == 2 ? (
                        <>
                          <FaHeart
                            color={favorites[b.id] || ""}
                            className="text-lg"
                          />
                          <span>{b.favorites_count}</span>
                        </>
                      ) : (
                        <>
                          <FaHeart
                            color={b.favorites_count !== 0 ? "red" : ""}
                            className="text-lg"
                          />
                          <span>{b.favorites_count}</span>
                        </>
                      )}
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
          Beautiful Beaches{" "}
        </h2>
        <p className="text-center max-w-2xl mx-auto text-gray-600 mb-10">
          A collection of images for you to experience the beauty of nature.{" "}
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
          {imageBetifu.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="overflow-hidden rounded-2xl shadow-lg hover:scale-105 transition">
                <img
                  src={url + "" + item.img}
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
          Outstanding highlight{" "}
        </h2>
        <p className="text-center max-w-2xl mx-auto text-gray-600 mb-12">
          Experience exciting activities and special services only available
          here.{" "}
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
            <h3 className="text-xl font-semibold mb-2">Marine activities</h3>
            <p>scuba diving, kayaking, and wave games.</p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-2">Cuisine</h3>
            <p>Enjoy fresh seafood and regional specialties.</p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-2">Rest</h3>
            <p>Luxury resort with high-class service and beautiful sea view.</p>
          </motion.div>
        </div>
      </section>
      <Experience />
      <Testimonial />
    </>
  );
}

export default Home;
