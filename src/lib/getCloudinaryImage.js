export function getCloudinaryImage(url, width=400) {
  if (!url || !url.includes("/upload/")) return url || "";

  return url.replace(
    "/upload/",
    `/upload/f_auto,q_auto,w_${width}/`,
  );
}


// export function getCloudinaryImage(url, width = 500) {
//   if (!url) return "";

//   const parts = url.split("/upload/");
//   if (parts.length !== 2) return url;

//   return `${parts[0]}/upload/f_auto,q_auto,dpr_auto,w_${width}/${parts[1]}`;
// }