// src/components/SomeComponent.tsx
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const SomeComponent: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (authContext?.token) {
        const response = await axios.get('http://localhost:5000/api/some-endpoint', {
          headers: { Authorization: `Bearer ${authContext.token}` },
        });
        setData(response.data);
      }
    };

    fetchData();
  }, [authContext?.token]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Data from API</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default SomeComponent;
