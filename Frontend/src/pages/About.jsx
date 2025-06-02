import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import Newsletter from '../components/Newsletter';

const About = () => {
  return (
    <div>
    <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'}/>
    </div>

    <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={assets.about} alt="About Us"/>
        
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
            <p>
                Welcome to **Dani Store**, your go-to destination for premium fitness products designed to **elevate performance, enhance endurance, and empower your journey to greatness**. Whether you're a seasoned athlete or just starting your fitness journey, we've got the perfect gear to support your goals.
            </p>
            <p>
                At Dani Store, we believe **fitness is a lifestyle**, not just a routine. Our products are crafted with **quality, innovation, and functionality in mind**, ensuring you train smarter, recover faster, and push your limits every day. Join us in creating a **community that values strength, resilience, and success**.
            </p>
            <p>
                We take pride in offering **carefully curated fitness equipment, apparel, and supplements** that meet the highest standards of durability and efficiency. Every product we provide is built with **precision, tested by professionals**, and designed to help you perform at your best.
            </p>
            <p>
                Beyond products, we focus on **educating and inspiring**. Our blog, newsletters, and expert insights help you stay **motivated, informed, and ahead of the game**. Whether it's advice on recovery techniques, workout strategies, or nutrition, we provide knowledge that supports your progress.
            </p>
            <p>
                Our customer-first approach ensures that **your satisfaction comes first**. From **easy exchanges** to **responsive customer support**, we make sure every step of your shopping experience is smooth and rewarding. We’re more than a store—we’re a **partner in your fitness journey**.
            </p>

            {/* Mission Statement */}
            <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold text-blue-600">🚀 Our Mission</h3>
                <p>
                    To **empower every individual** to become the strongest version of themselves by providing top-tier fitness products, expert knowledge, and a community dedicated to growth and resilience. We believe **movement is power**, and every rep, step, and sweat brings you closer to excellence.
                </p>
            </div>

            {/* Brand Motto */}
            <div className="border-l-4 border-gray-500 pl-4 mt-4">
                <h3 className="text-xl font-semibold text-gray-700">🔥 Brand Motto</h3>
                <p>
                    **"Stronger Every Day."** It’s not just about lifting weights—it’s about lifting yourself. We push limits, break barriers, and redefine strength one day at a time.
                </p>
            </div>
        </div>
    </div>
    <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOUSE US'}/>
    </div>
    <div className="flex flex-col md:flex-row text-sm mb-20 gap-6">
    {/* Quality Assurance */}
    <div className="border border-gray-300 rounded-lg shadow-md px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 bg-white">
        <b className="text-lg text-gray-800">Quality Assurance:</b>
        <p className="text-gray-600">
            At Dani Store, quality isn't just a standard—it's our promise. Every product we offer undergoes rigorous testing for durability, performance, and user safety. From premium materials to precision engineering, we ensure that our fitness gear meets the highest industry benchmarks. Whether it's apparel designed for comfort and flexibility, or equipment built to withstand intense training sessions, our commitment to quality guarantees reliability, longevity, and peak performance. We partner with trusted manufacturers, implement strict quality control checks, and continuously refine our selection—so you can train with confidence and power, every single time.
        </p>
    </div>

    {/* Convenience */}
    <div className="border border-gray-300 rounded-lg shadow-md px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 bg-white">
        <b className="text-lg text-gray-800">Convenience:</b>
        <p className="text-gray-600">
            Shopping at Dani Store is designed to be effortless and efficient, ensuring a seamless experience from browsing to checkout. With intuitive navigation, secure payment options, and fast shipping, we prioritize accessibility and ease for every customer. Whether you're shopping from a desktop or mobile device, our optimized platform ensures smooth performance. Plus, with multiple delivery options, easy returns, and responsive customer support, you can shop confidently, knowing that we’ve got you covered. No hassle, no delays—just high-quality fitness essentials, delivered with convenience.
        </p>
    </div>

    {/* Exceptional Customer Service */}
    <div className="border border-gray-300 rounded-lg shadow-md px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 bg-white">
        <b className="text-lg text-gray-800">Exceptional Customer Service:</b>
        <p className="text-gray-600">
            At Dani Store, customer satisfaction is at the heart of everything we do. Our dedicated support team is always ready to assist you—whether you need help choosing the right fitness gear, tracking an order, or handling returns. We prioritize quick responses, personalized assistance, and hassle-free resolutions to make sure every interaction is smooth and stress-free. With 24/7 support, easy exchanges, and a commitment to excellence, we go above and beyond to create a shopping experience that’s not just convenient, but truly exceptional. Your journey matters to us, and we’re here to ensure it’s effortless, enjoyable, and empowering.
        </p>
    </div>
    </div>

    <Newsletter/>


    </div>
  );
};

export default About;
