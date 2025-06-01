import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link 
      className="text-gray-700 cursor-pointer transition-transform duration-300 hover:scale-105 hover:rotate-1 hover:shadow-lg hover:shadow-gray-300"
      to={`/product/${id}`}
    >
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-b from-gray-50 to-white border border-gray-700 p-4 flex flex-col items-center shadow-md">

        <div className="w-full aspect-[3/2] bg-gray-50 rounded-md overflow-hidden">
          <img
            className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-90"
            src={Array.isArray(image) ? image[0] : image}
            alt={name}
          />
        </div>
      </div>
      <p className="pt-3 pb-1 text-sm font-bold text-center text-gray-700">{name}</p>
    </Link>
  );
};

export default ProductItem;
