import toast from "react-hot-toast";

export const uploadCloudinary = async (file) => {
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  if (!file.type.startsWith("image/")) {
    toast.error("Please upload an image file");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    toast.error("Image must be less than 5MB");
    return;
  }

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await res.json();
console.log("data",data);

  return data.secure_url;
};
