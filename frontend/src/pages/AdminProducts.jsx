import { useEffect, useState } from "react";
import api from "../api/axios";

const emptyProduct = {
  name: "",
  price: "",
  image: "",
  category: "",
  description: "",
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/products");
      setProducts(res.data || []);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyProduct);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const payload = {
      ...form,
      price: Number(form.price),
    };

    try {
      if (editingId) {
        await api.put(`/admin/products/${editingId}`, payload);
      } else {
        await api.post("/admin/products", payload);
      }
      resetForm();
      await fetchProducts();
    } catch (err) {
      setError("Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id || product.id);
    setForm({
      name: product.name || "",
      price: String(product.price ?? ""),
      image: product.image || "",
      category: product.category || "",
      description: product.description || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (product) => {
    const id = product._id || product.id;
    if (!id) return;
    if (!window.confirm("Delete this product?")) return;

    setSubmitting(true);
    setError("");
    try {
      await api.delete(`/admin/products/${id}`);
      await fetchProducts();
    } catch (err) {
      setError("Failed to delete product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-black tracking-tight text-[color:var(--text)]">
          Manage Products
        </h1>
        <p className="text-sm text-[color:var(--text-muted)]">
          Create, update, and delete products.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mb-8 grid gap-4 neo-card p-4 md:grid-cols-2"
      >
        <div className="md:col-span-2">
          <h2 className="text-sm font-semibold text-[color:var(--text)] mb-2">
            {editingId ? "Edit product" : "Add new product"}
          </h2>
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-xs font-medium text-[color:var(--text)] mb-1"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="neo-input block w-full rounded-xl px-2 py-1.5 text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-xs font-medium text-[color:var(--text)] mb-1"
          >
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            required
            value={form.price}
            onChange={handleChange}
            className="neo-input block w-full rounded-xl px-2 py-1.5 text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-xs font-medium text-[color:var(--text)] mb-1"
          >
            Image URL
          </label>
          <input
            id="image"
            name="image"
            type="url"
            value={form.image}
            onChange={handleChange}
            className="neo-input block w-full rounded-xl px-2 py-1.5 text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-xs font-medium text-[color:var(--text)] mb-1"
          >
            Category
          </label>
          <input
            id="category"
            name="category"
            type="text"
            value={form.category}
            onChange={handleChange}
            className="neo-input block w-full rounded-xl px-2 py-1.5 text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="block text-xs font-medium text-[color:var(--text)] mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={form.description}
            onChange={handleChange}
            className="neo-input block w-full rounded-xl px-2 py-1.5 text-sm"
          />
        </div>

        <div className="md:col-span-2 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-full bg-[color:var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {submitting
              ? "Saving..."
              : editingId
              ? "Update product"
              : "Add product"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--text)_14%,transparent)] px-4 py-2 text-sm font-semibold text-[color:var(--text)] hover:bg-[color:color-mix(in_srgb,var(--surface-2)_45%,transparent)]"
            >
              Cancel edit
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center py-10">
          <span className="text-gray-600">Loading products...</span>
        </div>
      ) : products.length === 0 ? (
        <p className="text-[color:var(--text-muted)]">No products found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols=3">
          {products.map((product) => (
            <div
              key={product._id || product.id}
              className="neo-card p-4 flex flex-col"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="h-16 w-16 flex items-center justify-center rounded-xl bg-[color:color-mix(in_srgb,var(--bg-soft)_70%,transparent)] overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain p-1"
                    />
                  ) : (
                    <span className="text-xs text-[color:var(--text-muted)]">No image</span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[color:var(--text)]">
                    {product.name}
                  </p>
                  <p className="text-xs text-[color:var(--text-muted)]">
                    {product.category || "No category"}
                  </p>
                  <p className="text-sm font-black text-[color:var(--primary-strong)]">
                    ${product.price}
                  </p>
                </div>
              </div>

              <p className="text-xs text-[color:var(--text-muted)] line-clamp-3 mb-3">
                {product.description}
              </p>

              <div className="mt-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(product)}
                  className="flex-1 inline-flex items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--text)_14%,transparent)] px-3 py-1.5 text-xs font-semibold text-[color:var(--text)] hover:bg-[color:color-mix(in_srgb,var(--surface-2)_45%,transparent)]"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(product)}
                  disabled={submitting}
                  className="flex-1 inline-flex items-center justify-center rounded-full bg-[color:var(--primary-strong)] px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

