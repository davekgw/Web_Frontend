import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(url).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, [url]);

  return { data, loading };
}
