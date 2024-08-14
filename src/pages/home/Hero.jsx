import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination,Autoplay,Navigation } from "swiper/modules";

import Img1 from "../../assets/hero.webp"
import Img2 from "../../assets/changeLife.webp"

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

function Hero() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:gap-14 gap-8 ">
      <div className="md:w-1/2 w-full text-center">
        <h1 className="md:text-5xl text-3xl font-bold md:leading-tight">
          It happened on Medium: July 2024 roundup
        </h1>
        <p className="py-4">
          Our mission statement is pretty meaningful to me. We want to deepen
          readers’ understanding of the world and empower writers to share their
        </p>
      </div>

      <div className="md:w-1/2 w-full mx-auto ">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 50,
            },
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={Img1} alt="hero" className="w-full lg:h-[420px] sm:h-96 h-80"  />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Img2} alt="hero" className="w-full lg:h-[420px] sm:h-96 h-80"  />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Img1} alt="hero" className="w-full lg:h-[420px] sm:h-96 h-80"  />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Img2} alt="hero" className="w-full lg:h-[420px] sm:h-96 h-80"  />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Hero;
