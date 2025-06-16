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
  const [sizes, setSizes] = useState("")
  const [quantity, setQuantity] = useState("")

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/product/single`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
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
          setSizes(prod.sizes)
          setQuantity(prod.quantity)
        } else {
          toast.error("Product not found")
        }
      } catch (error) {
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

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("id", id)
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category === "Other" ? customCategory : category)
      formData.append("sizes", sizes)
      formData.append("quantity", quantity)

      images.forEach((img, index) => {
        if (img) {
          formData.append(`image${index + 1}`, img)
        }
      })

      const response = await fetch(`${backendUrl}/api/product/update`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })

      const result = await response.json()
      if (result.success) {
        toast.success("Product updated successfully!")
        navigate("/list")
      } else {
        toast.error(result.message || "Update failed")
      }
    } catch (err) {
      toast.error("Something went wrong while updating the product")
    }
  }

  if (!product) return <div className='p-6'>Loading product...</div>

  return (
    <div className='p-6'>
      <form onSubmit={onSubmitHandler}>
        <div>
          <p className='text-lg font-semibold mb-2'>Update Images</p>
          <div className='flex flex-wrap gap-4'>
            {[1, 2, 3, 4].map((num) => (
              <label key={num} htmlFor={`image${num}`} className='cursor-pointer'>
                <img
                  src={
                    images[num - 1]
                      ? URL.createObjectURL(images[num - 1])
                      : product.image?.[num - 1] || assets.upload1
                  }
                  alt={`Upload ${num}`}
                  className='w-32 h-32 object-cover rounded-md border border-gray-300 hover:opacity-80 transition'
                />
                <input
                  type='file'
                  id={`image${num}`}
                  hidden
                  accept='image/*'
                  onChange={(e) => handleImageChange(e, num - 1)}
                />
              </label>
            ))}
          </div>
        </div>

        <div className='w-full mt-4'>
          <p className='my-2'>Product Name</p>
          <input
            className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className='w-full mt-4'>
          <p className='my-2'>Product Description</p>
          <textarea
            className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className='flex flex-col sm:flex-row gap-4 sm:gap-8 mt-4'>
          <div className='flex-1'>
            <p className='mb-2'>Product Category</p>
            <select
              className='w-full px-3 py-2 border border-gray-300 rounded-md'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value=''>-- Select Category --</option>
              <option value='Supplements'>Supplements</option>
              <option value='Wears'>Wears</option>
              <option value='Belts'>Belts</option>
              <option value='Plates'>Plates</option>
              <option value='Dumbbells'>Dumbbells</option>
              <option value='Gloves'>Gloves</option>
              <option value='Shakers'>Shakers</option>
              <option value='Bottles'>Bottles</option>
              <option value='Other'>Other</option>
            </select>
            {category === "Other" && (
              <input
                type='text'
                className='mt-3 w-full px-3 py-2 border border-gray-300 rounded-md'
                placeholder='Enter custom category'
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
              />
            )}
          </div>

          <div className='flex-1'>
            <p className='mb-2'>Price</p>
            <input
              className='w-full px-3 py-2 border border-gray-300 rounded-md'
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className='flex-1'>
            <p className='mb-2'>Size</p>
            <input
              className='w-full px-3 py-2 border border-gray-300 rounded-md'
              type='text'
              value={sizes}
              onChange={(e) => setSizes(e.target.value)}
              required
            />
          </div>

          <div className='flex-1'>
            <p className='mb-2'>Quantity</p>
            <input
              className='w-full px-3 py-2 border border-gray-300 rounded-md'
              type='number'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
        </div>

        <div className='flex justify-center mt-6'>
          <button
            type='submit'
            className='w-28 py-3 rounded-md bg-black text-white transition duration-200 hover:bg-gray-800 active:scale-95'
          >
            Update
          </button>
        </div>
      </form>
    </div>
  )
}

export default Update
