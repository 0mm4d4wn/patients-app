import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const username = 'apiuser';
    const password = 'apiuser';
    const basicAuth = 'Basic ' + btoa(`${username}:${password}`);

    setTimeout(() => {
      fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': basicAuth
        },
      })
      .then(res => {
        if (!res.ok) {
          throw Error('Could not fetch the data for that resource');
        }
        return res.json();
      })
      .then(response => {
        if (response.result && Array.isArray(response.result)) {
          setData(response.result);
          setError(null);
        } else {
          throw new Error('Data fetched is not an array');
        }
        setIsPending(false);
      })
      .catch(err => {
        setIsPending(false);
        setError(err.message);
      });
    }, 1000);
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
