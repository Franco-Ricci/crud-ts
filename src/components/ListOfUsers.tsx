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
import Modal from './Modal';

  
  export default function ListOfUsers() {
    const [edit, setEdit] = useState<boolean>(false);
    const [users, setUsers] = useState<User[]>(() => {
      // Get from localStorage once, on initial load
      const stored = localStorage.getItem("ListOfUsers");
      return stored ? JSON.parse(stored) : [];
    });
  
    // Sync changes to localStorage
    useEffect(() => {
      localStorage.setItem("ListOfUsers", JSON.stringify(users));
    }, [users]);
  
    function removeUser(id: number) {
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers); // This updates state and triggers re-render
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
          <button
            onClick={() => {
              setEdit(!edit);
            }}
            type="button"
            className="mt-4 w-full bg-blue-600 text-white hover:text-blue-900 whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis sm:mt-0 sm:w-fit"
          >
            {edit ? "Save" : "Edit"}
          </button>
        </div>
  
        {!edit ? (
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
                    <button className="text-blue-600">E</button>
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
        ) : (
          <Modal />
        )}
      </>
    );
  }