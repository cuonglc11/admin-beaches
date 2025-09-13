import React, { useEffect, useRef, useState } from "react";
import Hero from "../../components/Hero";
import { motion } from "framer-motion";
import Experience from "../../components/Experience";
import Testimonial from "../../components/Review";
import { FaHeart, FaRegComment, FaMapMarkerAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";
import {
  ImageBanner,
  favoritesAdd,
  favoritesCheck,
  favoritesDelete,
  listBeachesHome,
  url,
  visitAdd,
  visitTotal,
} from "../../api/function";
import { useNavigate } from "react-router-dom";

function Home() {
  const [beaches, setBeaches] = useState([]);
  const [imageBetifu, setImageBetifu] = useState([]);
  const navigate = useNavigate();
  const [favoritesState, setFavoritesState] = useState({});
  const [favoritesCount, setFavoritesCount] = useState({});
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [mapCoords, setMapCoords] = useState({ lat: null, lng: null });
  const visitedRef = useRef(false);
  const [stats, setStats] = useState({});
  useEffect(() => {
    if (!visitedRef.current) {
      visitAdds();
      fectDataImageBe();
      fectData();
      visit();
      abumImage();
      visitedRef.current = true;
    }
  }, [stats]);
  const visitAdds = async () => {
    if (sessionStorage.getItem("visited")) return;
    try {
      const rs = await visitAdd();
      console.log(rs);
      sessionStorage.setItem("visited", "true");
    } catch (error) {}
  };
  const abumImage = async () => {
    try {
      const rs = await ImageBanner(2);
      setImageBetifu(rs?.data?.data || []);
    } catch (error) {}
  };

  const visit = async () => {
    try {
      const rs = await visitTotal();
      console.log(rs?.data);
      setStats(rs?.data);
    } catch (error) {}
  };

  const fectData = async () => {
    try {
      const rs = await listBeachesHome();
      const list = rs.data?.data || [];
      setBeaches(list);

      const favState = {};
      const favCount = {};

      for (let b of list) {
        favCount[b.id] = b.favorites_count;

        if (localStorage.getItem("token") && localStorage.getItem("user")) {
          try {
            const res = await favoritesCheck(b.id);
            favState[b.id] = res?.data?.message ? true : false;
          } catch (error) {
            favState[b.id] = false;
          }
        } else {
          favState[b.id] = false;
        }
      }

      setFavoritesState(favState);
      setFavoritesCount(favCount);
    } catch (error) {}
  };

  const fectDataImageBe = async () => {
    try {
      const rs = await ImageBanner(2);
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

    const isFavorite = favoritesState[id];
    const newFavoritesState = { ...favoritesState };
    const newFavoritesCount = { ...favoritesCount };

    if (!isFavorite) {
      newFavoritesState[id] = true;
      newFavoritesCount[id] = favoritesCount[id] + 1;
    } else {
      newFavoritesState[id] = false;
      newFavoritesCount[id] = favoritesCount[id] - 1;
    }

    setFavoritesState(newFavoritesState);
    setFavoritesCount(newFavoritesCount);

    try {
      if (!isFavorite) {
        await favoritesAdd(id);
      } else {
        await favoritesDelete(id);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, rollback!");
      setFavoritesState(favoritesState);
      setFavoritesCount(favoritesCount);
    }
  };

  const detailBeaches = (value, beaches) => {
    navigate("/detail-beaches/" + beaches.id);
  };

  // Mở modal map
  const openMapModal = (lat, lng) => {
    setMapCoords({ lat, lng });
    setMapModalOpen(true);
  };
  const truncateHTML = (html, maxLength = 100) => {
    const text = new DOMParser().parseFromString(html, "text/html").body
      .textContent;
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  return (
    <>
      <Hero />
      <section className="py-8 bg-gray-100 text-center">
        <h2 className="text-2xl font-bold mb-4">📊 Visit statistics</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-white rounded-2xl shadow p-4 w-40">
            <p className="text-gray-500">Today</p>
            <p className="text-xl font-bold">{stats.today}</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-4 w-40">
            <p className="text-gray-500">Week</p>
            <p className="text-xl font-bold">{stats.week}</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-4 w-40">
            <p className="text-gray-500">Month</p>
            <p className="text-xl font-bold">{stats.month}</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-4 w-40">
            <p className="text-gray-500">Online</p>
            <p className="text-xl font-bold">{stats.online}</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-4 w-40">
            <p className="text-gray-500">Total</p>
            <p className="text-xl font-bold">{stats.total}</p>
          </div>
        </div>
      </section>

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
                  <div onClick={() => detailBeaches(b.id, b)}>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {b.name}
                    </h3>
                    <div
                      className="text-gray-600 text-sm mb-4"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          truncateHTML(b.description, 20)
                        ),
                      }}
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
                            color={favoritesState[b.id] ? "red" : ""}
                            className="text-lg"
                          />
                          <span>{favoritesCount[b.id]}</span>
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
                    {b.latitude && b.longitude && (
                      <button
                        onClick={() => openMapModal(b.latitude, b.longitude)}
                        className="flex items-center gap-2 text-green-600 hover:text-green-800 transition"
                      >
                        <FaMapMarkerAlt />
                        <span>Map</span>
                      </button>
                    )}
                    <button
                      className="flex items-center gap-2 hover:text-blue-500 transition"
                      onClick={() => detailBeaches(b.id, b)}
                    >
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
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6">🌴Beach Photo Album</h2>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
          We are dedicated to bringing you the most beautiful beaches and travel
          experiences. Whether you're looking for relaxation, adventure, or
          culture – we’ve got you covered.
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
          {imageBetifu.map((b, i) => (
            <SwiperSlide key={i}>
              <div className="h-60 overflow-hidden rounded-2xl">
                <img
                  src={url + "" + b.img}
                  alt={`slide-${i}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className="py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">
          ✨ Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <h3 className="font-bold text-xl mb-3">🏖️ Beach Guides</h3>
            <p className="text-gray-600">
              Explore detailed guides of the most stunning beaches around the
              world.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <h3 className="font-bold text-xl mb-3">📍 Interactive Maps</h3>
            <p className="text-gray-600">
              Find locations easily with our built-in maps and travel
              suggestions.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <h3 className="font-bold text-xl mb-3">💬 Reviews & Community</h3>
            <p className="text-gray-600">
              Read real reviews and connect with travelers sharing experiences.
            </p>
          </div>
        </div>
      </section>

      <Testimonial />

      {/* Modal Map */}
      {mapModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-11/12 md:w-3/4 lg:w-1/2 relative">
            <button
              onClick={() => setMapModalOpen(false)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-3 py-1 text-sm"
            >
              ✕
            </button>
            <div className="p-4">
              <iframe
                src={`https://www.google.com/maps?q=${mapCoords.lat},${mapCoords.lng}&hl=es;z=14&output=embed`}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
