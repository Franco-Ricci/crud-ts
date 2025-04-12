// 'use client';
import { useEffect, useState } from 'react';
import useUsers from '../services/APIUsers';
import { User } from '../types/index';
import {

  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,

} from '@tremor/react';
import ModalEdit from './ModalEdit';
import { ModalNewUser } from './ModalNewUser';


export default function ListOfUsers() {

  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [users, setUsers, error] = useUsers();
  const [editingUser, setEditingUser] = useState<User | null>(null)



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
        <ModalNewUser
          newUser={newUser}
          setNewUser={setNewUser}
          setModalNewUser={() => setModalNewUser(false)}
          setUsers={setUsers}
          users={users}


        ></ModalNewUser >
      }
    </>
  );
}