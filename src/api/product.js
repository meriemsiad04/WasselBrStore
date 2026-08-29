
import client from "./client";
import { transformWooProducts, transformWooProduct } from "../utils/product";

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Netflix Premium 1 Month",
    description: "<p>Enjoy Netflix Premium with 4K Ultra HD quality. Watch on 4 screens simultaneously. Instant delivery after purchase.</p>",
    price: "1200",
    regular_price: "1500",
    on_sale: true,
    images: [{ src: "/src/assets/products/netflix.jpg" }],
    stock_status: "instock",
    featured: true,
    categories: [{ name: "Watch" }],
    meta_data: [
      { key: "best_seller", value: "true" },
      { key: "badge", value: "Hot Sale" }
    ],
    acf: { best_seller: true }
  },
  {
    id: 2,
    name: "Spotify Premium 3 Months",
    description: "<p>Ad-free music listening with Spotify Premium. Download songs and listen offline. 3 months subscription.</p>",
    price: "1800",
    regular_price: "2200",
    on_sale: true,
    images: [{ src: "/src/assets/products/spotify.jpg" }],
    stock_status: "instock",
    featured: true,
    categories: [{ name: "Joy" }],
    meta_data: [
      { key: "best_seller", value: "true" },
      { key: "badge", value: "Best Value" }
    ],
    acf: { best_seller: true }
  },
  {
    id: 3,
    name: "ChatGPT Plus 1 Month",
    description: "<p>Access GPT-4 and advanced features. Unlimited messages. Fast response times. DALL-E image generation included.</p>",
    price: "2500",
    regular_price: "2800",
    on_sale: true,
    images: [{ src: "/src/assets/products/gpt.png" }],
    stock_status: "instock",
    featured: true,
    categories: [{ name: "AI Subscriptions" }],
    meta_data: [
      { key: "best_seller", value: "true" },
      { key: "badge", value: "Trending" }
    ],
    acf: { best_seller: true }
  },
  {
    id: 4,
    name: "Amazon Prime Video 1 Month",
    description: "<p>Stream thousands of movies and TV shows with Prime Video. Exclusive Amazon Originals. HD streaming.</p>",
    price: "900",
    regular_price: "1100",
    on_sale: true,
    images: [{ src: "/src/assets/products/prime.jpg" }],
    stock_status: "instock",
    featured: false,
    categories: [{ name: "Watch" }],
    meta_data: [{ key: "badge", value: "New" }]
  },
  {
    id: 5,
    name: "Crunchyroll Premium 1 Month",
    description: "<p>Watch the latest anime episodes in HD. No ads. Simulcasts straight from Japan.</p>",
    price: "850",
    regular_price: "1000",
    on_sale: true,
    images: [{ src: "/src/assets/products/Crunchyroll.png" }],
    stock_status: "instock",
    featured: false,
    categories: [{ name: "Watch" }],
    meta_data: [{ key: "badge", value: "Popular" }]
  },
  {
    id: 6,
    name: "Canva Pro 1 Month",
    description: "<p>Professional design tools with Canva Pro. Millions of templates, stock photos, and premium elements.</p>",
    price: "700",
    regular_price: "900",
    on_sale: true,
    images: [{ src: "/src/assets/products/canva.webp" }],
    stock_status: "instock",
    featured: false,
    categories: [{ name: "Work" }],
    meta_data: [{ key: "badge", value: "Pro" }]
  },
  {
    id: 7,
    name: "Microsoft 365 Personal 1 Year",
    description: "<p>Full Office suite with Word, Excel, PowerPoint. 1TB OneDrive cloud storage. Install on 5 devices.</p>",
    price: "4500",
    regular_price: "5500",
    on_sale: true,
    images: [{ src: "/src/assets/products/microsoft356.webp" }],
    stock_status: "instock",
    featured: true,
    categories: [{ name: "Work" }],
    meta_data: [{ key: "badge", value: "Save Big" }]
  },
  {
    id: 8,
    name: "Cupcat Pro Subscription",
    description: "<p>Advanced AI design assistant. Create stunning graphics effortlessly. Professional templates included.</p>",
    price: "1500",
    regular_price: "1800",
    on_sale: true,
    images: [{ src: "/src/assets/products/cupcatpro.jpg" }],
    stock_status: "instock",
    featured: false,
    categories: [{ name: "AI Subscriptions" }],
    meta_data: [{ key: "badge", value: "AI Powered" }]
  },
  {
    id: 9,
    name: "Claude AI Pro 1 Month",
    description: "<p>Anthropic's Claude Pro with extended context windows. Advanced reasoning and coding capabilities.</p>",
    price: "2200",
    regular_price: "2500",
    on_sale: true,
    images: [{ src: "/src/assets/products/calude.webp" }],
    stock_status: "instock",
    featured: false,
    categories: [{ name: "AI Subscriptions" }],
    meta_data: [{ key: "badge", value: "New AI" }]
  }
];

const HAS_WP = Boolean(
  import.meta.env.VITE_WP_URL &&
  import.meta.env.VITE_WC_KEY &&
  import.meta.env.VITE_WC_SECRET
);

export async function getProducts(params = {}) {
    if (!HAS_WP) {
        await new Promise(r => setTimeout(r, 400));
        return transformWooProducts(MOCK_PRODUCTS);
    }

    try {
        const response = await client.get("/wc/v3/products", {
            auth: {
                username: import.meta.env.VITE_WC_KEY,
                password: import.meta.env.VITE_WC_SECRET
            },
            params: {
                per_page: 100,
                ...params
            }
        });
        
        if (!Array.isArray(response.data)) {
            return transformWooProducts(MOCK_PRODUCTS);
        }
        
        return transformWooProducts(response.data);
    } catch (error) {
        console.error("Error fetching products:", error);
        return transformWooProducts(MOCK_PRODUCTS);
    }
}

export async function getProductById(id) {
    if (!HAS_WP) {
        await new Promise(r => setTimeout(r, 200));
        const mock = MOCK_PRODUCTS.find(p => p.id === Number(id));
        return mock ? transformWooProduct(mock) : null;
    }

    try {
        const response = await client.get(`/wc/v3/products/${id}`, {
            auth: {
                username: import.meta.env.VITE_WC_KEY,
                password: import.meta.env.VITE_WC_SECRET
            }
        });
        
        return transformWooProduct(response.data);
    } catch (error) {
        console.error("Error fetching product:", error);
        const mock = MOCK_PRODUCTS.find(p => p.id === Number(id));
        return mock ? transformWooProduct(mock) : null;
    }
}
