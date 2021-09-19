import axios from "axios";

const apiUrl = "https://pixabay.com/api/";
const key = "22594439-4316377fda5f0b6c1b052f095";
const imageType = "photo";
const orientation = "horizontal";
const safesearch = "false";
export const perPage = 12;

export const api = axios.create({
  baseURL: apiUrl,
  responseType: "json",
  params: {
    key,
    image_type: imageType,
    orientation,
    safesearch,
    per_page: perPage,
  },
});
