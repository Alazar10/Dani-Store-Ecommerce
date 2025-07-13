import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import Newsletter from '../components/Newsletter';

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={assets.about} alt="About Us" />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-[#555555]">
          <p>
            Welcome to <b className="text-[#FF8C00]">Dani Store</b>, your go-to destination for premium fitness products designed to <b>elevate performance, enhance endurance, and empower your journey to greatness</b>. Whether you're a seasoned athlete or just starting your fitness journey, we've got the perfect gear to support your goals.
          </p>
          <p>
            At Dani Store, we believe <b>fitness is a lifestyle</b>, not just a routine. Our products are crafted with <b>quality, innovation, and functionality in mind</b>, ensuring you train smarter, recover faster, and push your limits every day. Join us in creating a <b>community that values strength, resilience, and success</b>.
          </p>
          <p>
            We take pride in offering <b>carefully curated fitness equipment, apparel, and supplements</b> that meet the highest standards of durability and efficiency. Every product we provide is built with <b>precision, tested by professionals</b>, and designed to help you perform at your best.
          </p>
          <p>
            Beyond products, we focus on <b>educating and inspiring</b>. Our blog, newsletters, and expert insights help you stay <b>motivated, informed, and ahead of the game</b>.
          </p>
          <p>
            Our customer-first approach ensures that <b>your satisfaction comes first</b>. From <b>easy exchanges</b> to <b>responsive customer support</b>, we make sure every step of your shopping experience is smooth and rewarding. We’re more than a store—we’re a <b>partner in your fitness journey</b>.
          </p>

          {/* Mission Statement */}
          <div className="border-l-4 border-[#FF8C00] pl-4">
            <h3 className="text-xl font-semibold text-[#FF8C00]">🚀 Our Mission</h3>
            <p>
              To <b>empower every individual</b> to become the strongest version of themselves by providing top-tier fitness products, expert knowledge, and a community dedicated to growth and resilience. We believe <b>movement is power</b>, and every rep, step, and sweat brings you closer to excellence.
            </p>
          </div>

          {/* Brand Motto */}
          <div className="border-l-4 border-[#333333] pl-4 mt-4">
            <h3 className="text-xl font-semibold text-[#333333]">🔥 Brand Motto</h3>
            <p>
              <b>"Stronger Every Day."</b> It’s not just about lifting weights—it’s about lifting yourself. We push limits, break barriers, and redefine strength one day at a time.
            </p>
          </div>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20 gap-6">
        {/* Quality Assurance */}
        <div className="border border-[#333333] rounded-lg shadow-md px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 bg-white">
          <b className="text-lg text-[#333333]">Quality Assurance:</b>
          <p className="text-[#555555]">
            At Dani Store, quality isn't just a standard—it's our promise. Every product we offer undergoes rigorous testing for durability, performance, and user safety. From premium materials to precision engineering, we ensure our fitness gear meets the highest benchmarks. Whether it's apparel designed for comfort and flexibility, or equipment built to withstand intense sessions, our commitment to quality guarantees reliability, longevity, and peak performance.
          </p>
        </div>

        {/* Convenience */}
        <div className="border border-[#333333] rounded-lg shadow-md px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 bg-white">
          <b className="text-lg text-[#333333]">Convenience:</b>
          <p className="text-[#555555]">
            Shopping at Dani Store is effortless and efficient—from browsing to checkout. With intuitive navigation, secure payment, fast shipping, and responsive support, we’ve made shopping seamless. Multiple delivery options, easy returns, and mobile-friendly design all come together to guarantee convenience.
          </p>
        </div>

        {/* Exceptional Customer Service */}
        <div className="border border-[#333333] rounded-lg shadow-md px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 bg-white">
          <b className="text-lg text-[#333333]">Exceptional Customer Service:</b>
          <p className="text-[#555555]">
            Our support team is ready to assist—whether it’s gear recommendations, order tracking, or returns. We value speed, empathy, and reliability in every interaction. With round-the-clock availability and hassle-free exchanges, we create an experience that’s effortless and empowering.
          </p>
        </div>
      </div>

      <Newsletter />
    </div>
  );
};

export default About;
