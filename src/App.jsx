import React, { useEffect, useState } from 'react'
import Navbar from './assets/components/Navbar'
import { FiSearch} from "react-icons/fi";
import { FaCirclePlus } from "react-icons/fa6";
import {db} from "./config/firebase"
import {collection, getDocs, onSnapshot} from "firebase/firestore"
import Contactcard from './assets/components/Contactcard';
import AddandUpdateContact from './assets/components/AddandUpdateContact';
import useDisclose from './hooks/useDisclose';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './assets/components/NotFound';
const App = () => {

  const [contacts, setcontacts] = useState([]);
  const {isOpen,onOpen,onClose} = useDisclose(false);


 useEffect(() => {

  const getContacts = async () =>{
    try {
      const contactsRef = collection(db,"Contacts");
      onSnapshot(contactsRef,(snapshot)=>{
        const contactList = snapshot.docs.map((doc)=>{
          return{
            ...doc.data(),
            id: doc.id
          }
        })
        setcontacts(contactList)
        return contactList;
      })
    } catch (error) {
      console.log(error)
    }
  }
  getContacts();
 } ,[])
 const filterContacts = (e) => {
  const value = e.target.value;

  const contactsRef = collection(db, "Contacts");

  onSnapshot(contactsRef, (snapshot) => {
    const contactLists = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    const filteredContacts = contactLists.filter((contact) =>
      contact.name.toLowerCase().includes(value.toLowerCase())
    );

    setcontacts(filteredContacts);

    return filteredContacts;
  });
};
return (
    <>
    <div className='px-4 mx-auto max-w-[370px]'>
      <Navbar />
    <div className='flex gap-2'>
     <div className='relative flex items-center flex-grow'>
      <FiSearch className='text-white text-3xl absolute ml-1' />
        <input onChange={filterContacts} className='bg-transparent rounded-md border border-white h-10 flex-grow text-white pl-10' />
      </div>
      <FaCirclePlus onClick={onOpen} className='text-4xl cursor-pointer text-white' />
      </div>
      <div className='mt-4 flex gap-3 flex-col'>
        {
         contacts.length <= 0 ? <NotFound /> : contacts.map((contact)=>(
            <Contactcard key={contact.id} contact={contact}/>
          ))
        }
      </div>
      <AddandUpdateContact onClose={onClose} isOpen={isOpen} />
    </div>
    <ToastContainer position='bottom-center'/>
 </>
  )
      }

export default App