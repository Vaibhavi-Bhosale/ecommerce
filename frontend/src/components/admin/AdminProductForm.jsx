import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  price: "",
  image: "",
  category: "",
  description: "",
};

export default function AdminProductForm({
  initialProduct,
  submitting,
  submitLabel = "Save Product",
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState(emptyForm);

  // Keep form synced when edit product changes.
  useEffect(() => {
    if (!initialProduct) {
      setForm(emptyForm);
      return;
    }

    setForm({
      name: initialProduct.name || "",
      price: String(initialProduct.price ?? ""),
      image: initialProduct.image || "",
      category: initialProduct.category || "",
      description: initialProduct.description || "",
    });
  }, [initialProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      price: Number(form.price || 0),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 neo-card p-4 md:grid-cols-2">
      <div className="md:col-span-2">
        <h2 className="text-sm font-semibold text-[color:var(--text)] mb-2">
          {initialProduct ? "Edit product details" : "Add new product"}
        </h2>
      </div>

      <input
        name="name"
        placeholder="Product name"
        value={form.name}
        onChange={handleChange}
        required
        className="neo-input block w-full rounded-xl px-2 py-1.5 text-sm"
      />
      <input
        name="price"
        type="number"
        step="0.01"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
        className="neo-input block w-full rounded-xl px-2 py-1.5 text-sm"
      />
      <input
        name="image"
        placeholder="Image URL or file name"
        value={form.image}
        onChange={handleChange}
        className="neo-input block w-full rounded-xl px-2 py-1.5 text-sm"
      />
      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="neo-input block w-full rounded-xl px-2 py-1.5 text-sm"
      />
      <textarea
        name="description"
        rows={3}
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="neo-input md:col-span-2 block w-full rounded-xl px-2 py-1.5 text-sm"
      />

      <div className="md:col-span-2 flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-full bg-[color:var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? "Saving..." : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--text)_14%,transparent)] px-4 py-2 text-sm font-semibold text-[color:var(--text)] hover:bg-[color:color-mix(in_srgb,var(--surface-2)_45%,transparent)]"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
