import { useEffect, useState } from "react";
import { fetchWrapper } from "../utils/fetchWrapper";

export const useColors = () => {
  const [colors, setColors] = useState<Record<string, string>>({"dummyKey": ""});
  
  useEffect(() => {
    fetchWrapper.get("http://localhost:7088/colors")
      .then(({data}) => {
        setColors(data);
      })
      .catch((err) => { 
        console.log(err); 
      });
  }, []);
  return [colors, setColors] as const;
};
