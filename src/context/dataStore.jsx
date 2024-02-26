import React, { useState } from 'react';
import { DataContext } from './dataContext';

function DataStore({ children }) {
  const [user, setUser] = useState({
    fullName: '',
    dob: '',
    email: '',
    password: '',
  });

  const [selectedEvent, setSelectedEvent] = useState({
    id: 0,
    title: '',
    category: '',
    date: '',
    venue:'',
    description: '',
    imageUrl: '',
    priceInRupees: 0,
  });

  const [bookevent,setbookevent] = useState({
    email:'',
    title:'',
    date:'',
    venue:'',
    tickets:0,
    cost:0
  })
  return (
    <DataContext.Provider value={{ user, setUser, selectedEvent, setSelectedEvent ,bookevent,setbookevent}}>
      {children}
    </DataContext.Provider>
  );
}

export default DataStore;
