import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      to={`/product/${id}`}
      className="text-[#333333] cursor-pointer transition-transform duration-300 hover:scale-105 hover:rotate-1 hover:shadow-lg hover:shadow-[#FF8C00]/30"
    >
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-b from-[#FFF3E5] to-white border border-[#333333] p-4 flex flex-col items-center shadow-md">
        <div className="w-full aspect-[3/2] bg-[#F9F9F9] rounded-md overflow-hidden">
          <img
            className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-90"
            src={Array.isArray(image) ? image[0] : image}
            alt={name}
          />
        </div>
      </div>

      <p className="pt-3 pb-1 text-sm font-bold text-center text-[#333333]">{name}</p>
      <p className="pt-3 pb-1 text-sm font-bold text-center text-[#FF8C00]">
        {price} {currency}
      </p>
    </Link>
  );
};

export default ProductItem;
