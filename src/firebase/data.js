import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

const YourComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = [];
    firebase.database().ref().on('value', (snapshot) => {
      fetchData.push(snapshot.val());
      setData({ fetchData });
    });
  }, []);

  // Rest of your component logic...
};
