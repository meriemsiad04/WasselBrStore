
import axios from "axios";

const client = axios.create({
  baseURL: `${import.meta.env.VITE_WP_URL}/wp-json`,
});

export default client;
