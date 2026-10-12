import React from 'react';
import BookingIcon from '../../../assets/bookingIcon.png';
const HowItWorks = () => {

    const steps = [
    {
      title: "Booking Pick & Drop",
      description: "From personal packages to business shipments — we deliver on time, every time."
    },
    {
      title: "Cash On Delivery",
      description: "From personal packages to business shipments — we deliver on time, every time."
    },
    {
      title: "Delivery Hub",
      description: "From personal packages to business shipments — we deliver on time, every time."
    },
    {
      title: "Booking SME & Corporate",
      description: "From personal packages to business shipments — we deliver on time, every time."
    }
  ];
    
    return (
        <section className="bg-base-200 text-secondary   py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl  sm:text-3xl font-bold text-secondary mb-8">
          How It Works
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="card bg-base-150 bg-white shadow-sm rounded-2xl p-6"
            >
              <div className="card-body p-0">
                {/* Icon Placeholder */}
                <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-lg text-secondary">
                  <img src={BookingIcon} alt="" />
                </div>

                <h3 className="card-title text-lg font-bold text-secondary mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-base-content/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    );
};

export default HowItWorks;