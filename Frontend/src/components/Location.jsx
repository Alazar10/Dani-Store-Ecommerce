import React from "react";

const Location = () => {
  return (
    <div className="py-10 bg-[#F9F9F9] text-center text-[#333333]">
      {/* Find Us Section */}
      <div className="mb-6 px-4 sm:px-0">
        <h2 className="font-semibold text-[#FF8C00] text-2xl text-center">Find Us</h2>
        <p className="text-[#555555] text-lg mt-4 text-center">
          Visit us at our physical store in Awasa! We are located at Piazza, Hawassa Hayk Mall —
          conveniently accessible for all your gym equipment and supplement needs. Come explore our
          high-quality collections in person.
        </p>
      </div>

      {/* Map Section */}
      <div className="w-full max-w-4xl mx-auto shadow-md border border-[#333333] rounded-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d250.05028608074466!2d38.47379960914948!3d7.051347472093537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17b14570731e173f%3A0xf5936d4109f44c61!2s3F2F%2BGHW%2C%20Awasa!5e0!3m2!1sen!2set!4v1749581485243!5m2!1sen!2set"
          className="w-full h-[450px] border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default Location;
