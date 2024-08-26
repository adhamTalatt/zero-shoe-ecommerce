"use client";
import style from "./loading.module.css";
const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-full h-20 w-20 bg-[#3b82f6] animate-ping"></div>
    </div>
  );
};

export default loading;
