import React, { useEffect, useState } from "react";
import LoginForm from "../components/loginForm"
import LandingImage from "../images/landing.png"


const Home = () => {

    return (
        <div id="home">

            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="flex bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl">
                    {/* Left */}
                    <div className="w-1/2 p-8 flex flex-col justify-center">
                    <img
                        src={LandingImage}
                        alt="landing image"
                        className="mb-8"
                    />
                    <h2 className="text-2xl font-bold mb-2">Fast, Efficient and Productive</h2>
                    <p className="text-gray-600 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis eros id mauris dignissim feugiat. Nunc feugiat mauris at libero aliquet interdum. In hac habitasse platea dictumst. Curabitur eu lorem ac mauris laoreet faucibus pharetra non justo.
                    </p>
                    </div>
                    {/* Right */}
                    <LoginForm />
                 </div>
             </div>

        </div>
    );
};

export default Home;
