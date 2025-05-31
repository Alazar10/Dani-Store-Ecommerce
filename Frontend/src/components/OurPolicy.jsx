import React from 'react';
import { RiExchangeFundsFill } from "react-icons/ri";
import { MdOutlineSupportAgent, MdEmail, MdPhone } from "react-icons/md";

const OurPolicy = () => {
  return (
    <div className="flex flex-col items-center text-center py-20 text-gray-700 px-6">
      {/* Policy Section */}
      <div className="w-full max-w-6xl p-10 border border-gray-200 rounded-lg shadow-md bg-white">
        <div className="w-20 h-20 flex items-center justify-center mx-auto bg-blue-100 rounded-full mb-6 shadow-md">
          <RiExchangeFundsFill className="text-4xl text-blue-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Easy Exchange Policy</h2>
        <p className="text-gray-500 mt-4 text-lg">
          At Dani Store, we want you to love your purchase! If you're not completely satisfied, you can exchange your item hassle-free.
        </p>

        <div className="mt-8 text-left">
          <h3 className="font-semibold text-gray-800 text-xl">📌 How Exchanges Work</h3>
          <ul className="text-gray-600 text-lg space-y-3 mt-4">
            <li>✔️ <strong>Exchange Window:</strong> Request an exchange within <span className="text-blue-500">30 days</span> of receiving your order.</li>
            <li>✔️ <strong>Condition:</strong> Items must be unused, unwashed, and in original packaging.</li>
            <li>✔️ <strong>Exchange Method:</strong> Swap for a different size, color, or product.</li>
            <li>✔️ <strong>Shipping:</strong> Free exchanges for defective or incorrect items. Customers cover return shipping for other cases.</li>
          </ul>
        </div>

        {/* Left-Aligned Sections in One Column */}
        <div className="mt-8 text-left space-y-8">
          {/* How to Request an Exchange */}
          <div>
            <h3 className="font-semibold text-gray-800 text-xl">🔄 How to Request an Exchange</h3>
            <p className="text-gray-500 text-lg mt-4 leading-relaxed">
              Contact our support team at **[Your Support Email]** or via **[Your Chat Support]**.<br />
              Provide your **order number** and item details.<br />
              Ship the item back with the provided instructions.<br />
              We’ll send your replacement once we receive the original item!
            </p>
          </div>

          {/* Items Not Eligible for Exchange (Now Beneath Request Section) */}
          <div>
            <h3 className="font-semibold text-red-500 text-xl">⚠️ Items Not Eligible for Exchange</h3>
            <p className="text-gray-500 text-lg mt-4">
              ❌ Final-sale items<br />
              ❌ Worn or damaged products (unless they arrived defective)<br />
              ❌ Customized or personalized items
            </p>
          </div>
        </div>

      </div>

      {/* Customer Support Section */}
      <div className="w-full max-w-6xl p-8 border border-gray-200 rounded-lg shadow-md bg-white mt-12">
        <h3 className="font-semibold text-blue-500 text-2xl text-center">📞 Need Help? Contact Our Support Team</h3>
        <p className="text-gray-500 text-lg mt-4 text-center">
          Have questions about your order or exchange? Our friendly support team is here for you!
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-lg text-center">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center">
            <MdEmail className="text-3xl text-blue-500 mb-2" />
            <p className="font-medium text-gray-800">📧 Email Us</p>
            <p className="text-blue-500">support@danistore.com</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center">
            <MdPhone className="text-3xl text-blue-500 mb-2" />
            <p className="font-medium text-gray-800">📞 Call Us</p>
            <p className="text-blue-500">+251-XXX-XXX-XXX</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center">
            <MdOutlineSupportAgent className="text-3xl text-blue-500 mb-2" />
            <p className="font-medium text-gray-800">💬 Live Chat</p>
            <p className="text-blue-500">Available 9 AM – 6 PM (EAT)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;
