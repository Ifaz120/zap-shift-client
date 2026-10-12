import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import Services from '../Services/Services';
import Brands from '../Brands/Brands';
import Feature from '../Feature/Feature';
import Reviews from '../Reviews/Reviews';


const reviewPromise = fetch('/src/data/reviews.json').then(res=>res.json());

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Services></Services>
            <Brands></Brands>
            <Feature></Feature>
            <Reviews reviewPromise={reviewPromise}></Reviews>
        </div>
    );
};

export default Home;