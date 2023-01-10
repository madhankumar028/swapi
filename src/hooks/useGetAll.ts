import { useEffect, useState } from "react";

const useGetAll = (data, arrayName) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data?.[arrayName].length > 0) {
      setLoading(true);
      Promise.all(
        data[arrayName].map(item =>
          fetch(item)
            .then(res => res.json())
            .catch(err => console.error(err))
        )
      )
      .then(results => setResults(results))
      .finally(() => setLoading(false));
    }
  }, [data?.[arrayName], arrayName, data]);

  return [results, loading];
};

export default useGetAll;
