export function getCloudinaryImage(url, width=400) {
  if (!url || !url.includes("/upload/")) return url || "";

  return url.replace(
    "/upload/",
    `/upload/f_auto,q_auto,w_${width}/`,
  );
}

