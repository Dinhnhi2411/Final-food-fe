
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../app/config";
import axios from "axios";

export const cloudinaryUpload = async (image) => {
  if (!image) return "";
  try {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    // formData.append("api_secret", CLOUDINARY_API_SECRET);
    // formData.append("api_key", CLOUDINARY_API_KEY);

    const response = await axios({
      url: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    const imageUrl = response.data.secure_url;
    return imageUrl;
  } catch (error) {
    throw error;
  }
};