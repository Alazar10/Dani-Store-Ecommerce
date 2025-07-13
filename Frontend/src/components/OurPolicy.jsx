import React from 'react';
import { RiExchangeFundsFill } from "react-icons/ri";
import { MdOutlineSupportAgent, MdEmail, MdPhone } from "react-icons/md";

const OurPolicy = () => {
  const getEmailProvider = (email) => {
    if (email.includes("@gmail.com")) {
      return "https://mail.google.com/mail/?view=cm&fs=1&to=support@danistore.com&su=Inquiry&body=Hello, I need assistance...";
    }
    if (email.includes("@outlook.com") || email.includes("@hotmail.com")) {
      return "https://outlook.live.com/mail/deeplink/compose?to=support@danistore.com&subject=Inquiry&body=Hello, I need assistance...";
    }
    if (email.includes("@yahoo.com")) {
      return "https://compose.mail.yahoo.com/?to=support@danistore.com&subject=Inquiry&body=Hello, I need assistance...";
    }
    return "mailto:support@danistore.com?subject=Inquiry&body=Hello, I need assistance...";
  };

  const openEmailApp = () => {
    const userEmail = "user@example.com";
    const emailURL = getEmailProvider(userEmail);
    window.open(emailURL, "_blank");
  };

  return (
    <div className="flex flex-col items-center text-center py-20 px-6 bg-[#F9F9F9] text-[#333333]">
      {/* Policy Section */}
      <div className="w-full max-w-6xl p-10 border border-[#333333] rounded-lg shadow-md bg-white">
        <div className="w-20 h-20 flex items-center justify-center mx-auto bg-[#FFF3E5] rounded-full mb-6 shadow-md">
          <RiExchangeFundsFill className="text-4xl text-[#FF8C00]" />
        </div>
        <h2 className="text-3xl font-bold text-[#333333]">Easy Exchange Policy</h2>
        <p className="text-[#555555] mt-4 text-lg">
          At Dani Store, we want you to love your purchase! If you're not completely satisfied, you can exchange your item hassle-free.
        </p>

        {/* Exchange Process */}
        <div className="mt-8 text-left">
          <h3 className="font-semibold text-xl text-[#FF8C00]">📌 How Exchanges Work</h3>
          <ul className="text-[#333333] text-lg space-y-3 mt-4">
            <li>✔️ <strong>Exchange Window:</strong> Request within <span className="text-[#FF8C00]">30 days</span> of receiving your order.</li>
            <li>✔️ <strong>Condition:</strong> Items must be unused, unwashed, and in original packaging.</li>
            <li>✔️ <strong>Exchange Method:</strong> Swap for a different size, color, or product.</li>
            <li>✔️ <strong>Shipping:</strong> Free for defective/incorrect items. Customer pays for other returns.</li>
          </ul>
        </div>

        {/* Request Steps + Restrictions */}
        <div className="mt-8 text-left space-y-8">
          <div>
            <h3 className="font-semibold text-xl text-[#FF8C00]">🔄 How to Request an Exchange</h3>
            <p className="text-[#555555] text-lg mt-4 leading-relaxed">
              Contact support at <strong>support@danistore.com</strong> or via live chat.<br />
              Provide your <strong>order number</strong> and item details.<br />
              Ship the item back using provided instructions.<br />
              Your replacement will be sent after the return is received.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl text-red-500">⚠️ Items Not Eligible for Exchange</h3>
            <p className="text-[#555555] text-lg mt-4">
              ❌ Final-sale items<br />
              ❌ Worn or damaged products (unless defective on arrival)<br />
              ❌ Customized or personalized items
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="w-full max-w-6xl p-8 border border-[#333333] rounded-lg shadow-md bg-white mt-12">
        <h3 className="font-semibold text-2xl text-[#FF8C00]">📞 Need Help? Contact Our Support Team</h3>
        <p className="text-[#555555] text-lg mt-4">
          Questions about your order or exchange? We’re here to help!
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-lg text-center">
          <div className="bg-[#F3F3F3] p-6 rounded-lg shadow-md flex flex-col items-center">
            <MdEmail className="text-3xl text-[#FF8C00] mb-2" />
            <p className="font-medium text-[#333333]">📧 Email Us</p>
            <button
              onClick={openEmailApp}
              className="text-[#FF8C00] hover:underline cursor-pointer bg-transparent border-none p-0"
            >
              support@danistore.com
            </button>
          </div>

          <div className="bg-[#F3F3F3] p-6 rounded-lg shadow-md flex flex-col items-center">
            <MdPhone className="text-3xl text-[#FF8C00] mb-2" />
            <p className="font-medium text-[#333333]">📞 Call Us</p>
            <p className="text-[#FF8C00]">+251-XXX-XXX-XXX</p>
          </div>

          <div className="bg-[#F3F3F3] p-6 rounded-lg shadow-md flex flex-col items-center">
            <MdOutlineSupportAgent className="text-3xl text-[#FF8C00] mb-2" />
            <p className="font-medium text-[#333333]">💬 Live Chat</p>
            <p className="text-[#FF8C00]">Available 9 AM – 6 PM (EAT)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;
