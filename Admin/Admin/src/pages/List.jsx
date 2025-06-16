import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'




const List = ({ token }) => {
    const [list, setList] = useState([])
    const navigate = useNavigate()

    const fetchList = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`)
            console.log("List response:", response.data)

            const productList = Array.isArray(response.data?.product)
                ? response.data.product
                : []

            setList(productList)
            console.log("Set list to:", productList)

        } catch (error) {
            console.error(error)
            toast.error("Failed to load product list")
        }
    }

    const removeItem = async (id) => {
        try {
            const response = await axios.post(
                `${backendUrl}/api/product/remove`,
                { id },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (response.data.success) {
                toast.success("Product removed")
                fetchList()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error("Error removing product")
        }
    }

    useEffect(() => {
        fetchList()
    }, [])

    return (
        <div>
            <p className='mb-2 text-lg font-semibold'>All Products List</p>

            {Array.isArray(list) && list.length === 0 ? (
                <div className='text-center text-gray-500 mt-10'>
                    No products available.
                </div>
            ) : (
                <div className='flex flex-col gap-2'>
                    <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 bg-gray-100 border text-sm font-medium'>
                        <span>Image</span>
                        <span>Name</span>
                        <span>Category</span>
                        <span>Price</span>
                        <span className='text-center'>Action</span>
                    </div>

                    {list.map((item, index) => (
                        <div
                            key={index}
                            className='grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border rounded-md bg-white hover:shadow-sm transition'
                        >
                            <div className='w-14 h-14 overflow-hidden rounded'>
                                <img
                                    src={item.image?.[0]}
                                    alt={item.name}
                                    className='w-full h-full object-cover'
                                />
                            </div>
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{item.price} {currency}</p>
                            <div className='flex justify-center gap-2'>
                                <button
                                    onClick={() => removeItem(item._id)}
                                    className='text-sm text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition'
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => navigate(`/update/${item._id}`)}
                                    className='text-sm text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 transition'
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default List
