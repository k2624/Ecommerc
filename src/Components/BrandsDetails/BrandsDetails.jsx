import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import { useParams } from "react-router-dom";

export default function BrandsDetails(productId) {
  const [brand, setBrand] = useState(null);
  let { _id } = useParams();
  const [loading, setLoading] = useState(true);
  async function getBrandDetails(brandId) {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`
      );
      setBrand(data?.data);
      toast.success("sucess" , {
        duration : 1000 , 
        position: 'top-right'
       });
      setLoading(false);
    } catch (err) {
      setLoading(true);
      toast.error(err.message , {
        duration : 1000 , 
        position: 'top-right'
       } );
    }
  }
  useEffect(() => {
    getBrandDetails(_id);
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
          <div className="container mx-auto py-5 mt-20">
            <div className="md:flex items-center">
              <div className="md:w-4/12 ">
                <div className=" shadow-2xl rounded-5 p-5  ">
                  <img
                    className=" w-full"
                    src={brand.image}
                    alt={brand.slug}
                  />
                </div>
              </div>
              <div className=" md:w-8/12 text-center">
                <h1 className=" text-main mt-5">{brand.name}</h1>
                <p className=" my-3">{brand.createdAt}</p>
                <p>{brand.updatedAt}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
