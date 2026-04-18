import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  price: "",
  image: null,
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
  const { name, value, files } = e.target;

  if (name === "image") {
    setForm((prev) => ({
      ...prev,
      image: files[0],
    }));
  } else {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

 const handleSubmit = (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append("name", form.name);
  data.append("price", form.price);
  data.append("category", form.category);
  data.append("description", form.description);
  data.append("image", form.image);

  console.log("Submitting product form with data:", {
    name: form.name,
    price: form.price,    category: form.category,
    description: form.description,
    image: form.image,
  }); 
  onSubmit(data);
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
  type="file"
  name="image"
  accept="image/*"
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
