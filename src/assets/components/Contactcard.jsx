import { HiOutlineUserCircle } from 'react-icons/hi'
import { IoMdTrash } from 'react-icons/io'
import { RiEditCircleLine } from 'react-icons/ri'
import { db } from '../../config/firebase'
import { deleteDoc, doc } from 'firebase/firestore'
import AddandUpdateContact from './AddandUpdateContact'
import useDisclose from '../../hooks/useDisclose'
import { toast } from 'react-toastify'

const Contactcard = ({contact}) => {
  const {isOpen,onOpen,onClose} = useDisclose(false);

const deleteContact = async (id) => {
  try {
    await deleteDoc(doc(db,"Contacts",id))
    toast.success("Contact Deleted Successfully!!")
  } catch (error) {
    console.log(error)
  }
}

  return (
    <>
    <div>
        <div key={contact.id} className="bg-yellow flex rounded-lg p-2 items-center justify-between">
              <div className='flex gap-2'>
              <HiOutlineUserCircle className="text-orange text-4xl" />
              <div className=''>
                <h2 className=''>{contact.name}</h2>
                <p className='text-sm'>{contact.email}</p>
              </div>
              </div>
              <div className='flex gap-2 text-3xl'>
              < RiEditCircleLine onClick={onOpen} className='text-orange cursor-pointer'/>
               <IoMdTrash className='cursor-pointer' onClick={()=>deleteContact(contact.id)} />
              </div>
            </div>
    </div>
    <AddandUpdateContact contact={contact} isUpdate isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default Contactcard