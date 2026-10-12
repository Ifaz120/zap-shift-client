import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';


const ReviewCard = ({review}) => {
    const {userName, review: testimonial,user_photoURL} = review;
    return (
        <div className="max-w-md mx-auto p-4">
      <div className="card bg-white shadow-md rounded-3xl p-8 border border-gray-100 flex flex-col justify-between ">
        
        {/* Top Section: Quote Icon and Testimonial Text */}
        <div>
          <div className="text-[#a2d2df] mb-4">
            <FaQuoteLeft size={36} />
          </div>

          <p className="text-gray-600 text-base leading-relaxed mb-6">
            {testimonial}
          </p>
        </div>

        {/* Dashed Divider */}
        <div className="border-t border-dashed border-gray-300 my-4"></div>

        {/* Bottom Section: Author Details */}
        <div className="flex items-center gap-4 mt-2">
          {/* Avatar / Profile Initial Placeholder (Can be replaced with an <img /> tag) */}
          <div className="w-12 h-12 rounded-full bg-[#0b2525] flex items-center justify-center text-white font-bold shrink-0">
            <img src={user_photoURL} alt="" />
          </div>

          <div>
            <h4 className="font-bold text-[#0b2525] text-lg">
              {userName}
            </h4>
            <p className="text-sm text-gray-500">
              Senior Product Designer
            </p>
          </div>
        </div>

      </div>
    </div>
    );
};

export default ReviewCard;