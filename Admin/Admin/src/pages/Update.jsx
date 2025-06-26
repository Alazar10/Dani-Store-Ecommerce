import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'
import { assets } from '../assets/assets'

const Update = ({ token }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [images, setImages] = useState([null, null, null, null])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [customCategory, setCustomCategory] = useState("")
  const [sizes, setSizes] = useState([{ label: "", price: "", stock: "" }])
  const [quantity, setQuantity] = useState("")

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/product/single`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        })
        const data = await res.json()
        if (data.success) {
          const prod = data.product
          setProduct(prod)
          setName(prod.name)
          setDescription(prod.description)
          setPrice(prod.price)
          setCategory(prod.category)
          setQuantity(prod.quantity)
          setSizes(Array.isArray(prod.sizes) ? prod.sizes : [])
        } else {
          toast.error("Product not found")
        }
      } catch {
        toast.error("Failed to load product")
      }
    }

    fetchProduct()
  }, [id])

  const handleImageChange = (e, index) => {
    const files = [...images]
    files[index] = e.target.files[0]
    setImages(files)
  }

  const handleSizeChange = (index, field, value) => {
    const updated = [...sizes]
    updated[index][field] = value
    setSizes(updated)
  }

  const addSizeField = () => {
    setSizes([...sizes, { label: "", price: "", stock: "" }])
  }

  const removeSizeField = (index) => {
    setSizes(sizes.filter((_, i) => i !== index))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("id", id)
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category === "Other" ? customCategory : category)
      formData.append("quantity", quantity)
      formData.append("sizes", JSON.stringify(sizes.filter(s => s.label && s.price && s.stock)))

      images.forEach((img, index) => {
        if (img) formData.append(`image${index + 1}`, img)
      })

      const response = await fetch(`${backendUrl}/api/product/update`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      })

      const result = await response.json()
      if (result.success) {
        toast.success("Product updated successfully!")
        navigate("/list")
      } else {
        toast.error(result.message || "Update failed")
      }
    } catch {
      toast.error("Something went wrong while updating the product")
    }
  }

  if (!product) return <div className="p-6">Loading product...</div>
  return (
    <div className="p-6">
      <form onSubmit={onSubmitHandler}>
        <p className="text-lg font-semibold mb-2">Update Images</p>
        <div className="flex flex-wrap gap-4">
          {[0, 1, 2, 3].map((i) => (
            <label key={i} htmlFor={`image${i}`} className="cursor-pointer">
              <img
                src={
                  images[i]
                    ? URL.createObjectURL(images[i])
                    : product.image?.[i] || assets.upload1
                }
                alt={`Upload ${i + 1}`}
                className="w-32 h-32 object-cover rounded-md border border-gray-300 hover:opacity-80 transition"
              />
              <input
                type="file"
                id={`image${i}`}
                hidden
                accept="image/*"
                onChange={(e) => handleImageChange(e, i)}
              />
            </label>
          ))}
        </div>

        <div className="mt-4">
          <p className="my-2">Product Name</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mt-4">
          <p className="my-2">Product Description</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-4">
          <div className="flex-1">
            <p className="mb-2">Category</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">-- Select Category --</option>
              <option value="Supplements">Supplements</option>
              <option value="Wears">Wears</option>
              <option value="Belts">Belts</option>
              <option value="Plates">Plates</option>
              <option value="Dumbbells">Dumbbells</option>
              <option value="Gloves">Gloves</option>
              <option value="Shakers">Shakers</option>
              <option value="Bottles">Bottles</option>
              <option value="Other">Other</option>
            </select>
            {category === "Other" && (
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Custom category"
                className="mt-3 w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            )}
          </div>

          <div className="flex-1">
            <p className="mb-2">Base Price (optional)</p>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex-1">
            <p className="mb-2">Total Stock (optional)</p>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Size Variants */}
        <div className="mt-6">
          <p className="font-semibold mb-2">Size Variants</p>
          {sizes.map((item, index) => (
            <div key={index} className="flex flex-wrap gap-4 mb-3">
              <input
                type="text"
                placeholder="Size"
                value={item.label}
                onChange={(e) => handleSizeChange(index, "label", e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleSizeChange(index, "price", e.target.value)}
                className="w-32 px-3 py-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="number"
                placeholder="Stock"
                value={item.stock}
                onChange={(e) => handleSizeChange(index, "stock", e.target.value)}
                className="w-32 px-3 py-2 border border-gray-300 rounded-md"
                required
              />
              {sizes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSizeField(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addSizeField}
            className="mt-2 px-4 py-1 text-sm bg-gray-800 text-white rounded"
          >
            + Add Size
          </button>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="w-28 py-3 rounded-md bg-black text-white hover:bg-gray-800 active:scale-95 transition"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  )
}

export default Update
