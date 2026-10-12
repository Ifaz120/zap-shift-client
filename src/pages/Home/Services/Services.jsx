import React from 'react';
import Service from '../../../assets/service.png'

const Services = () => {
    const services = [
    {
      title: "Express & Standard Delivery",
      description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off."
    },
    {
      title: "Nationwide Delivery",
      description: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours."
    },
    {
      title: "Fulfillment Solution",
      description: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support."
    },
    {
      title: "Cash on Home Delivery",
      description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product."
    },
    {
      title: "Corporate Service / Contract In Logistics",
      description: "Customized corporate services which includes warehouse and inventory management support."
    },
    {
      title: "Parcel Return",
      description: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants."
    }
  ];
    return (
        <section className="bg-[#0b2525] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Our Services
        </h2>
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="card bg-white shadow-md rounded-2xl p-6 text-center transition-all duration-300 ease-in-out hover:bg-[#a3e635] hover:text-[#0b2525] group cursor-pointer flex flex-col items-center justify-between"
          >
            <div className="card-body p-0 items-center w-full">
              {/* Icon Placeholder */}
              <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-white/40 border border-gray-200 transition-colors">
                <img src={Service} alt="" />
              </div>

              <h3 className="card-title text-lg font-bold text-[#0b2525] mb-3">
                {service.title}
              </h3>

              <p className="text-sm text-gray-600 group-hover:text-[#0b2525]/80 leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
    );
};

export default Services;