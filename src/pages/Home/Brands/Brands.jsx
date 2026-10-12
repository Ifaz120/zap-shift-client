import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import amazon_vector from "../../../assets/brands/amazon_vector.png";
import amazon from "../../../assets/brands/amazon.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import start_people from "../../../assets/brands/start_people.png";
import { Autoplay } from "swiper/modules";

const Brands = () => {
  const brandLogos = [
    amazon,
    amazon_vector,
    casio,
    moonstar,
    randstad,
    start_people,
    star,
  ];
  return (
    <div className="flex flex-col">
        <h2 className="text-2xl text-secondary font-bold py-10 mx-auto">We've helped thousands of sales teams</h2>
        <div>
            <Swiper
            loop={true}
            slidesPerView={4}
            centeredSlides={true}
            spaceBetween={30}
            grabCursor={true}
            modules={[Autoplay]}
            autoplay={{
                delay: 1000,
                disableOnInteraction: false,
            }}
            >
            {brandLogos.map((logo, index) => (
                <SwiperSlide key={index}>
                <img src={logo} alt="" />
                </SwiperSlide>
            ))}
            </Swiper>

        </div>


    </div>
  );
};

export default Brands;
