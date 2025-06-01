import React from 'react';

const Newsletter = () => {

    const onSubmitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <div className="text-center">
            <p className="text-2xl font-medium text-gray-800">Subscribe now & get free delivery</p>
            <p className="text-gray-400 mt-3">
                Unlock the first free delivery, early access to new fitness gear, and expert workout tips—straight to your inbox! Stay ahead in your fitness journey.
            </p>
            <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
                <input className="w-full sm:flex-1 outline-none" type="email" placeholder="Enter your email" />
                <button type="submit" className="bg-black text-white text-xs px-10 py-4 cursor-pointer">SUBSCRIBE</button>
            </form>
        </div>
    );
};

export default Newsletter;
