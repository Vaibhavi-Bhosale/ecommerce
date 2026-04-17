import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import AdminProductForm from "../components/admin/AdminProductForm";
import { createAdminProduct } from "../api/adminApi";

export default function AdminAddProduct() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // Create product and redirect to manage page for live reflected list.
  const handleCreate = async (payload) => {
    setSubmitting(true);
    const result = await createAdminProduct(payload);

    if (!result.success) {
      toast.error(result.message || "Failed to add product");
      setSubmitting(false);
      return;
    }

    toast.success("Product added successfully");
    navigate("/admin/products");
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[color:var(--text)]">
            Add Product
          </h1>
          <p className="text-sm text-[color:var(--text-muted)]">
            Create a new product for your store.
          </p>
        </div>
        <Link
          to="/admin/products"
          className="inline-flex items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--text)_14%,transparent)] px-4 py-2 text-sm font-semibold text-[color:var(--text)] hover:bg-[color:color-mix(in_srgb,var(--surface-2)_45%,transparent)]"
        >
          Back to Manage Products
        </Link>
      </div>

      <AdminProductForm
        submitting={submitting}
        submitLabel="Add Product"
        onSubmit={handleCreate}
      />
    </div>
  );
}
