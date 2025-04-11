// 'use client';
import { useEffect, useState } from 'react';
import useUsers from '../services/APIUsers';
import { User, FormErrors } from '../types/index';

import {

  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,

} from '@tremor/react';
import ModalEdit from './ModalEdit';


export default function ListOfUsers() {

  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [users, setUsers, error] = useUsers();
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const [modalNewUser, setModalNewUser] = useState<boolean>(false)
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
  function createUser(newUser: User) {

    const errors: FormErrors = {};

    if (!newUser.name || newUser.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters long.";
    }

    if (!newUser.username) {
      errors.username = "Username is required.";
    }

    if (!newUser.email || !/\S+@\S+\.\S+/.test(newUser.email)) {
      errors.email = "A valid email is required.";
    }

    if (!newUser.website) {
      errors.website = "Website is required.";
    }

    if (!newUser.company.name) {
      errors.company = "Company name is required.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return; // don't continue if there are validation errors
    }

    setUsers([...users, newUser]);
    // Add new user to users list
    setModalNewUser(false);
    setNewUser({
      id: Date.now(),
      name: '',
      username: '',
      email: '',
      website: '',
      company: { name: '' }
    })

    setFormErrors({})
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

        <button className='bg-blue-700 hover:bg-blue-600 text-white' onClick={() => { setModalNewUser(true); }} >Add new user</button>
      </div>

      {modalEdit && editingUser && (
      <ModalEdit    
      editingUser={editingUser}
      setEditingUser={setEditingUser}
      setModalEdit={() => setModalEdit(false)}
      SaveUser={() => SaveUser(editingUser)}></ModalEdit>
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
                  onChange={(e) => {


                    setNewUser({ ...newUser, name: e.target.value })


                  }
                  }
                  id='name'
                  placeholder="Name"
                  required
                />
                {formErrors?.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
              </label>
              <label htmlFor='name' className='flex items-center gap-3 text-gray-600'>Username
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  type="text"
                  value={newUser?.username}
                  onChange={(e) => {
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                  }
                  id='username'
                  placeholder="username"
                  required
                />
                {formErrors?.username && <p className="text-red-500 text-sm">{formErrors.username}</p>}
              </label>
              <label htmlFor='email' className='flex items-center gap-3 text-gray-600'>Email
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  type="email"
                  value={newUser?.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  id='email'
                  placeholder="email"
                  required
                />
                {formErrors?.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
              </label>
              <label htmlFor='website' className='flex items-center gap-3 text-gray-600'>Website
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  type="text"
                  value={newUser?.website}
                  onChange={(e) =>
                    setNewUser({ ...newUser, website: e.target.value })
                  }
                  id='website'
                  placeholder="website"
                  required
                />
                {formErrors?.website && <p className="text-red-500 text-sm">{formErrors.website}</p>}
              </label>
              <label htmlFor='Company' className='flex items-center gap-3 text-gray-600'>Company
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  type="text"
                  value={newUser?.company.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, company: { ...newUser.company, name: e.target.value } })
                  }
                  id='Company'
                  placeholder="Company"
                  required
                />
                {formErrors?.company && <p className="text-red-500 text-sm">{formErrors.company}</p>}
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
                className={`px-4 py-2 rounded ${newUser.name.length <= 3 || /\S+@\S+\.\S+/.test(newUser.email) === false
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 text-white"
                  }`}
                disabled={newUser.name.length <= 3 || /\S+@\S+\.\S+/.test(newUser.email) === false}
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