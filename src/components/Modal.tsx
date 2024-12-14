import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
  
  } from '@tremor/react';
  import useUsers from '../services/APIUsers';

export default function Modal(){
    const [user ] = useUsers()

    return(
        <div>
            <h1>Modal</h1>
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

                <button onClick={() => {console.log("hola")}}
            type="button"
            className="mt-4 w-full bg-blue-600 text-white hover:text-blue-900 whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis sm:mt-0 sm:w-fit"
          >
            SAVE
          </button>
          <button type="button" className="text-red-600 hover:text-red-900" >X</button>
                </td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
    )
}