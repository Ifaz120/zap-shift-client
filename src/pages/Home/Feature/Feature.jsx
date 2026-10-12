import React, { useEffect, useState } from 'react';
import liveTrack from '../../../assets/live-tracking.png';
import safeDelivery from '../../../assets/safe-delivery.png';


const Feature = () => {

    const featuresData = [
    {
      id: 1,
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      image: liveTrack,
    },
    {
      id: 2,
      title: "100% Safe Delivery",
      description:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      image: safeDelivery,
    },
    {
      id: 3,
      title: "24/7 Call Center Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      image: safeDelivery,
    },
  ];
    return (
        <section className="py-16 mt-12 px-4 sm:px-6 lg:px-8 bg-base-200">
      <div className="max-w-5xl mx-auto space-y-6">
        {featuresData.map((item) => (
          <div
            key={item.id}
            className="card bg-base-100 shadow-sm rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8"
          >
            {/* Left Column: Image */}
            <div className="w-full md:w-5/12 flex justify-center items-center">
              <img
                src={item.image}
                alt={item.title}
                className="max-h-40 sm:max-h-48 object-contain"
              />
            </div>

            {/* Responsive Divider: Dashed vertical line on desktop, horizontal on mobile */}
            <div className="hidden md:block divider divider-vertical lg:divider-horizontal before:border-dashed after:border-dashed h-32 m-0"></div>

            {/* Right Column: Content */}
            <div className="w-full md:w-7/12 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-neutral mb-3">
                {item.title}
              </h3>
              <p className="text-base-content/70 text-sm sm:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
    );
};

export default Feature;