import React, { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";


const Reviews = ({ reviewPromise }) => {
  const reviews = use(reviewPromise);
  console.log(reviews);

  return (
    <div className="py-12">
      <div className="text-center max-w-2xl mx-auto px-4 mb-8">
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-3">
          Review
        </h3>
        <p className="text-gray-600 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
          praesentium sequi nobis molestias sapiente culpa dolor, voluptates
          corporis laboriosam reprehenderit veniam distinctio porro optio
          quibusdam repellat reiciendis enim, totam quae!
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <Swiper
          loop={true}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 2000,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide
              key={review.id}
              className="w-[320px] sm:w-[380px] md:w-[420px] h-auto"
            >
              <ReviewCard review={review}></ReviewCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
