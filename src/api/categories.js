
import client from "./client";
import { transformWooCategories } from "../utils/product";

const MOCK_CATEGORIES = [
  { id: 1, name: "Watch", slug: "watch" },
  { id: 2, name: "Work", slug: "work" },
  { id: 3, name: "Joy", slug: "joy" },
  { id: 4, name: "AI Subscriptions", slug: "ai-subscriptions" }
];

const HAS_WP = Boolean(
  import.meta.env.VITE_WP_URL &&
  import.meta.env.VITE_WC_KEY &&
  import.meta.env.VITE_WC_SECRET
);

export async function getCategories() {
    if (!HAS_WP) {
        await new Promise(r => setTimeout(r, 300));
        return transformWooCategories(MOCK_CATEGORIES);
    }

    try {
        const response = await client.get("/wc/v3/products/categories", {
            auth: {
                username: import.meta.env.VITE_WC_KEY,
                password: import.meta.env.VITE_WC_SECRET
            },
            params: {
                per_page: 100,
                hide_empty: true
            }
        });
        
        if (!Array.isArray(response.data)) {
            return transformWooCategories(MOCK_CATEGORIES);
        }
        
        return transformWooCategories(response.data);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return transformWooCategories(MOCK_CATEGORIES);
    }
}
