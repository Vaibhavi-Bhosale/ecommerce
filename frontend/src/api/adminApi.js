import api from './axios'

// Shared parser because backend responses can be {data: ...} or direct payload.
const unwrapData = (res) => res?.data?.data ?? res?.data ?? [];

// Admin: get all customer orders.
export const getAdminOrders = async () => {
  try {
    const res = await api.get("/orders/");

    console.log("Admin orders:", unwrapData(res));
    return { success: true, data: unwrapData(res) };
  } catch (error) {
    console.log(error.message);
    return {
      success: false,
      data: [],
      message: "Failed to load all users orders",
    };
  }
};

// Admin: list products (used by manage products page).
export const getAdminProducts = async () => {
  try {
    const res = await api.get("/products");
    return { success: true, data: unwrapData(res) };
  } catch (error) {
    console.log(error.message);
    return {
      success: false,
      data: [],
      message: "Failed to load products",
    };
  }
};

// Admin: create product.
export const createAdminProduct = async (payload) => {
  try {
    const res = await api.post("/admin/products", payload);
    return { success: true, data: unwrapData(res) };
  } catch (error) {
    console.log(error.message);
    return { success: false, message: "Failed to create product" };
  }
};

// Admin: update product by id.
export const updateAdminProduct = async (id, payload) => {
  try {
    const res = await api.put(`/admin/products/${id}`, payload);
    return { success: true, data: unwrapData(res) };
  } catch (error) {
    console.log(error.message);
    return { success: false, message: "Failed to update product" };
  }
};

// Admin: delete product by id.
export const deleteAdminProduct = async (id) => {
  try {
    await api.delete(`/admin/products/${id}`);
    return { success: true };
  } catch (error) {
    console.log(error.message);
    return { success: false, message: "Failed to delete product" };
  }
};