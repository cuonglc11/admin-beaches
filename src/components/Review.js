import { motion } from "framer-motion";

function Testimonial() {
  const reviews = [
    {
      name: "Lan Anh",
      text: "Kỳ nghỉ tuyệt vời, cảnh biển đẹp và dịch vụ rất chuyên nghiệp.",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      name: "Minh Quân",
      text: "Một trải nghiệm khó quên, từ ẩm thực đến hoạt động vui chơi.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Ngọc Huyền",
      text: "Resort sang trọng, view biển cực chill, sẽ quay lại lần nữa!",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-4">
        Cảm nhận từ du khách
      </h2>
      <p className="text-center max-w-2xl mx-auto text-gray-600 mb-12">
        Chia sẻ từ những người đã từng trải nghiệm.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
        {reviews.map((review, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="bg-gray-50 rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition"
          >
            <img
              src={review.avatar}
              alt={review.name}
              className="w-20 h-20 mx-auto rounded-full mb-4 border-4 border-cyan-500"
            />
            <p className="text-gray-700 mb-3 italic">“{review.text}”</p>
            <h4 className="font-semibold text-cyan-600">{review.name}</h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Testimonial;
