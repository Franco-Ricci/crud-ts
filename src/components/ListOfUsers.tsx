// 'use client';
import { useState } from 'react';
import useUsers from '../services/APIUsers';

import {
 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
  
  } from '@tremor/react';
import Modal from './Modal';


  const data = [
    {
      workspace: 'sales_by_day_api',
      owner: 'John Doe',
      status: 'live',
      costs: '$3,509.00',
      region: 'US-West 1',
      capacity: '99%',
      lastEdited: '23/09/2023 13:00',
    },
    {
      workspace: 'marketing_campaign',
      owner: 'Jane Smith',
      status: 'live',
      costs: '$5,720.00',
      region: 'US-East 2',
      capacity: '80%',
      lastEdited: '22/09/2023 10:45',
    },
    {
      workspace: 'sales_campaign',
      owner: 'Jane Smith',
      status: 'live',
      costs: '$5,720.00',
      region: 'US-East 2',
      capacity: '80%',
      lastEdited: '22/09/2023 10:45',
    },
    {
      workspace: 'development_env',
      owner: 'Mike Johnson',
      status: 'live',
      costs: '$4,200.00',
      region: 'EU-West 1',
      capacity: '60%',
      lastEdited: '21/09/2023 14:30',
    },
    {
      workspace: 'new_workspace_1',
      owner: 'Alice Brown',
      status: 'live',
      costs: '$2,100.00',
      region: 'US-West 2',
      capacity: '75%',
      lastEdited: '24/09/2023 09:15',
    },
    {
      workspace: 'test_environment',
      owner: 'David Clark',
      status: 'inactive',
      costs: '$800.00',
      region: 'EU-Central 1',
      capacity: '40%',
      lastEdited: '25/09/2023 16:20',
    },
  ];
  
  export default function ListOfUsers() {
 
      const [user, error] = useUsers()

      const [edit, setEdit] = useState<boolean>(false)
    
   
    const getListOfUsers = JSON.parse(localStorage.getItem("ListOfUsers")) || [];

    console.log(getListOfUsers)
 

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
            type="button"
            className="mt-4 w-full whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis sm:mt-0 sm:w-fit"
          >
            Add workspace
          </button>
        </div>
        {
          edit == false ? 
          <Table className="mt-8">
          <TableHead>
            <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Name
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Username
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Email
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Website
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Company
              </TableHeaderCell>
 
            </TableRow>
          </TableHead>
          <TableBody>
            {(user.map((user: User) => 
              <TableRow key={user.id}>
                <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {user.name}
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.website}</TableCell>
                <TableCell>{user.company.name}</TableCell>

                <td>

                <button onClick={() => {setEdit(!edit)}}
            type="button"
            className="mt-4 w-full bg-blue-600 text-white hover:text-blue-900 whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis sm:mt-0 sm:w-fit"
          >
            Edit
          </button>
          <button type="button" className="text-red-600 hover:text-red-900" >X</button>
                </td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
         : 
          <Modal></Modal>
          }
     
      </>
    );
  }