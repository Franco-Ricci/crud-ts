// 'use client';
import { useEffect, useState } from 'react';
import useUsers from '../services/APIUsers';

import {

  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,

} from '@tremor/react';

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  website: string,
  company: {
    name: string
  }
}


export default function ListOfUsers() {

  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [users, setUsers, error] = useUsers();
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const [newUser, setNewUser] = useState<User>({
    id: Date.now(),
    name: '',
    username: '',
    email: '',
    website: '',
    company: {
      name: '',
    },
  
  })
  const [modalNewUser, setModalNewUser] = useState<boolean>(false)

  // Sync changes to localStorage
  useEffect(() => {
    if (users.length >= 0) {

      localStorage.setItem("ListOfUsers", JSON.stringify(users));
    }
  }, [users]);

  function removeUser(id: number) {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers); // This updates state and triggers re-render
  }

  function EditUser(user: User) {
    console.log(user)
    setEditingUser(user);  // Save the selected user
    setModalEdit(true);
    console.log(editingUser)
  }

  function SaveUser(user: User) {
    const updatedUsers = users.map((e) => {
      if (e.id === user.id) {
        return user;
      }
      return e;
    });

    setUsers(updatedUsers);
    setModalEdit(false)
  }
  function createUser(newUser: User){
    setModalNewUser(true);   
    if(newUser.name.length > 3 && newUser.email !== ""){

      setUsers([...users, newUser]);
    // Add new user to users list
    setModalNewUser(false); 
      setNewUser({
        id: Date.now(),
        name: '',
        username: '',
        email: '',
        website: '',
        company: { name: '' }})
    }
    
    }
  return (
    <>
      <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
        <div>
          <h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Workspaces
          </h3>
          <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
            Overview of all registered workspaces within your organization.
          </p>
        </div>

      </div>


      <Table className="mt-8">
        <TableHead>
          <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Username</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Website</TableHeaderCell>
            <TableHeaderCell>Company</TableHeaderCell>
            <TableHeaderCell>Edit</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: User) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.website}</TableCell>
              <TableCell>{user.company?.name}</TableCell>
              <TableCell>
                <button className="text-blue-600" onClick={() => EditUser(user)}>E</button>
                <button
                  className="text-red-600 ml-2"
                  onClick={() => removeUser(user.id)}
                >
                  X
                </button>
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
        <div>

          <button className='bg-blue-700 hover:bg-blue-600 text-white' onClick={() => {createUser(newUser)}} >Add new user</button>
        </div>

      {modalEdit && editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Edit User</h2>
            <div className="space-y-4">
              <label htmlFor='name' className='flex items-center gap-3 text-gray-600'>Name
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  type="text"
                  value={editingUser.name}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, name: e.target.value })
                  }
                  placeholder="Name"
                />
              </label>
              <label htmlFor='name' className='flex items-center gap-3 text-gray-600'>Username
              <input
                className="w-full border border-gray-300 rounded px-3 py-2"
                type="text"
                value={editingUser.username}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, username: e.target.value })
                }
                placeholder="username"
              />
              </label>
              <label htmlFor='email' className='flex items-center gap-3 text-gray-600'>Email
              <input
                className="w-full border border-gray-300 rounded px-3 py-2"
                type="email"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
                placeholder="email"
              />
              </label>
              <label htmlFor='website' className='flex items-center gap-3 text-gray-600'>Website
              <input
                className="w-full border border-gray-300 rounded px-3 py-2"
                type="text"
                value={editingUser.website}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, website: e.target.value })
                }
                placeholder="website"
              />
               </label>
               <label htmlFor='Company' className='flex items-center gap-3 text-gray-600'>Company
              <input
                className="w-full border border-gray-300 rounded px-3 py-2"
                type="text"
                value={editingUser.company.name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, company: { ...editingUser.company, name: e.target.value } })
                }
                placeholder="Company"
              />
               </label>

            </div>

            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-300 rounded mr-2"
                onClick={() => setModalEdit(false)}
              >
                Cancel
              </button>
              <button
                 className={`px-4 py-2 rounded ${
                  editingUser.name.length <= 3 || !editingUser.email
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 text-white"
                }`}
                disabled={editingUser.name.length <= 3 || editingUser.email === ""}
                onClick={() => {
                  
                  SaveUser(editingUser);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {modalNewUser && 
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
     <div className="bg-white p-6 rounded shadow-lg w-[400px]">
       <h2 className="text-lg font-semibold mb-4">Edit User</h2>
       <div className="space-y-4">
         <label htmlFor='name' className='flex items-center gap-3 text-gray-600'>Name
           <input
             className="w-full border border-gray-300 rounded px-3 py-2"
             type="text"
             value={newUser?.name}
             onChange={(e) =>
              setNewUser({ ...newUser, name: e.target.value })
             }
             placeholder="Name"
             required
           />
         </label>
         <label htmlFor='name' className='flex items-center gap-3 text-gray-600'>Username
         <input
           className="w-full border border-gray-300 rounded px-3 py-2"
           type="text"
           value={newUser?.username}
           onChange={(e) =>
            setNewUser({ ...newUser, username: e.target.value })
           }
           placeholder="username"
         />
         </label>
         <label htmlFor='email' className='flex items-center gap-3 text-gray-600'>Email
         <input
           className="w-full border border-gray-300 rounded px-3 py-2"
           type="email"
           value={newUser?.email}
           onChange={(e) =>
            setNewUser({ ...newUser, email: e.target.value })
           }
           placeholder="email"
           required
         />
         </label>
         <label htmlFor='website' className='flex items-center gap-3 text-gray-600'>Website
         <input
           className="w-full border border-gray-300 rounded px-3 py-2"
           type="text"
           value={newUser?.website}
           onChange={(e) =>
            setNewUser({ ...newUser, website: e.target.value })
           }
           placeholder="website"
           required
         />
          </label>
          <label htmlFor='Company' className='flex items-center gap-3 text-gray-600'>Company
         <input
           className="w-full border border-gray-300 rounded px-3 py-2"
           type="text"
           value={newUser?.company.name}
           onChange={(e) =>
            setNewUser({ ...newUser, company: { ...newUser.company, name: e.target.value } })
           }
           placeholder="Company"
           required
         />
          </label>

       </div>

       <div className="mt-4 flex justify-end">
         <button
           className="px-4 py-2 bg-gray-300 rounded mr-2"
           onClick={() => setModalNewUser(false)}
         >
           Cancel
         </button>
         <button
           className={`px-4 py-2 rounded ${
            newUser.name.length <= 3 || !newUser.email
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 text-white"
          }`}
           disabled={newUser.name.length <= 3 || newUser.email === ""}
           onClick={() => {
             
             createUser(newUser);
           }}
         >
           Save
         </button>
       </div>
     </div>
   </div>
      }
    </>
  );
}