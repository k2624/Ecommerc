import React, { useState } from 'react'
import {FadeLoader} from "react-spinners";

const override = {
  display: "block",
  borderColor: "red",
};
export default function Loading() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("hsl(120, 89%, 36%)");
  return <>
      <div className="sweet-loading absolute left-1/2   -translate-x-1/2 top-1/2 ">
     
      <FadeLoader
        color={color}
        loading={loading}
        cssOverride={override}
        // size={5000}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  
  </>
}
