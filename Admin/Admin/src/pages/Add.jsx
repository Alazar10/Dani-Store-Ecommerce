import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'

const Add = ({ token }) => {
    const [images, setImages] = useState([null, null, null, null])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [customCategory, setCustomCategory] = useState("")
    const [size, setSize] = useState("")
    const [quantity, setQuantity] = useState("")

    const handleImageChange = (e, index) => {
        const files = [...images]
        files[index] = e.target.files[0]
        setImages(files)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("category", category === "Other" ? customCategory : category)
            formData.append("size", size)
            formData.append("quantity", quantity)

            images.forEach((img, index) => {
                if (img) {
                    formData.append(`image${index + 1}`, img)
                }
            })

            const response = await fetch(`${backendUrl}/api/product/add`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            })

            const result = await response.json()

            if (result.success) {
                toast.success("Product added successfully!")
                setName("")
                setDescription("")
                setPrice("")
                setCategory("")
                setCustomCategory("")
                setSize("")
                setQuantity("")
                setImages([null, null, null, null])
            } else {
                toast.error(result.message || "Failed to add product.")
            }
        } catch (error) {
            console.error("Error adding product:", error)
            toast.error("Something went wrong while submitting the product.")
        }
    }

    return (
        <div className='p-6'>
            <form onSubmit={onSubmitHandler}>
                {/* Image Upload */}
                <div>
                    <p className='text-lg font-semibold mb-2'>Upload Images</p>
                    <div className='flex flex-wrap gap-4'>
                        {[1, 2, 3, 4].map((num) => (
                            <label key={num} htmlFor={`image${num}`} className='cursor-pointer inline-block'>
                                <img
                                    src={images[num - 1] ? URL.createObjectURL(images[num - 1]) : assets.upload1}
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

                {/* Product Name */}
                <div className='w-full mt-4'>
                    <p className='my-2'>Product Name</p>
                    <input
                        className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md'
                        type='text'
                        placeholder='Type here'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                {/* Description */}
                <div className='w-full mt-4'>
                    <p className='my-2'>Product Description</p>
                    <textarea
                        className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md'
                        placeholder='Type content here'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                {/* Category, Price, Size, Quantity */}
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
                                required
                            />
                        )}
                    </div>

                    <div className='flex-1'>
                        <p className='mb-2'>Product Price</p>
                        <input
                            className='w-full px-3 py-2 border border-gray-300 rounded-md'
                            type='number'
                            placeholder='1500'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>

                    <div className='flex-1'>
                        <p className='mb-2'>Product Size</p>
                        <input
                            className='w-full px-3 py-2 border border-gray-300 rounded-md'
                            type='text'
                            placeholder='XL, 2.27kg,...'
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            required
                        />
                    </div>

                    <div className='flex-1'>
                        <p className='mb-2'>Quantity In Stock</p>
                        <input
                            className='w-full px-3 py-2 border border-gray-300 rounded-md'
                            type='number'
                            placeholder='e.g. 10'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className='flex justify-center mt-6'>
                    <button
                        type='submit'
                        className='w-28 py-3 rounded-md bg-black text-white transition duration-200 hover:bg-gray-800 active:scale-95 cursor-pointer'
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Add
