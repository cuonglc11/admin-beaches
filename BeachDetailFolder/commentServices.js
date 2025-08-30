import axios from "axios";

export const getCommentsByBeachId = async (beachId) => {
  try {
    const res = await axios.get(`http://localhost/php_code/backend_beaches/comments.php?beachId=${beachId}`);
    return res.data; // [{ user, text, createdAt }]
  } catch (err) {
    console.error("Lỗi khi lấy bình luận:", err);
    return [];
  }
};

export const postComment = async (beachId, comment) => {
  try {
    await axios.post("http://localhost/php_code/backend_beaches/comments.php", { beachId, ...comment });
  } catch (err) {
    console.error("Lỗi khi gửi bình luận:", err);
  }
};
