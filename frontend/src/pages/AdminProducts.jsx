import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  deleteAdminProduct,
  getAdminProducts,
  updateAdminProduct,
} from "../api/adminApi";
import AdminProductForm from "../components/admin/AdminProductForm";

export default function AdminProducts() {
  // Products state for admin management list.
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch and refresh list whenever needed.
  const loadProducts = async () => {
    setLoading(true);
    const result = await getAdminProducts();

    if (!result.success) {
      toast.error(result.message || "Failed to load products");
      setProducts([]);
      setLoading(false);
      return;
    }

    setProducts(Array.isArray(result.data) ? result.data : []);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Save edited product.
  const handleUpdate = async (payload) => {
    if (!editingProduct) return;
    setSubmitting(true);
    const result = await updateAdminProduct(
      editingProduct._id || editingProduct.id,
      payload
    );

    if (!result.success) {
      toast.error(result.message || "Failed to update product");
      setSubmitting(false);
      return;
    }

    toast.success("Product updated");
    setEditingProduct(null);
    await loadProducts();
    setSubmitting(false);
  };

  // Open edit form with selected product details.
  const handleEdit = (product) => {
    const id = product._id || product.id;
    if (!id) return;
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete product and refresh list immediately.
  const handleDelete = async (product) => {
    const id = product._id || product.id;
    if (!id || !window.confirm("Delete this product?")) return;

    setSubmitting(true);
    const result = await deleteAdminProduct(id);
    if (!result.success) {
      toast.error(result.message || "Failed to delete product");
      setSubmitting(false);
      return;
    }

    toast.success("Product deleted");
    await loadProducts();
    setSubmitting(false);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-black tracking-tight text-[color:var(--text)]">
          Manage Products
        </h1>
        <p className="text-sm text-[color:var(--text-muted)]">
          Edit and delete products here. Add new product from separate page.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <Link
          to="/admin/products/add"
          className="inline-flex items-center justify-center rounded-full bg-[color:var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          + Add New Product
        </Link>
        {editingProduct && (
          <button
            type="button"
            onClick={() => setEditingProduct(null)}
            className="inline-flex items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--text)_14%,transparent)] px-4 py-2 text-sm font-semibold text-[color:var(--text)] hover:bg-[color:color-mix(in_srgb,var(--surface-2)_45%,transparent)]"
          >
            Close Edit Mode
          </button>
        )}
      </div>

      {editingProduct && (
        <div className="mb-8">
          <AdminProductForm
            initialProduct={editingProduct}
            submitting={submitting}
            submitLabel="Update Product"
            onSubmit={handleUpdate}
            onCancel={() => setEditingProduct(null)}
          />
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-10">
          <span className="text-gray-600">Loading products...</span>
        </div>
      ) : products.length === 0 ? (
        <p className="text-[color:var(--text-muted)]">No products found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product._id || product.id} className="neo-card p-4 flex flex-col">
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
                    Rs. {Number(product.price || 0).toFixed(2)}
                  </p>
                </div>
              </div>

              <p className="text-xs text-[color:var(--text-muted)] line-clamp-3 mb-3">
                {product.description || "No description"}
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

