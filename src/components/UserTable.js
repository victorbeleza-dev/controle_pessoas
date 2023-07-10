import React, { useEffect, useState } from 'react';

import '../styles/components/UserTable.scss';
import api from '../services/api';
import Loading from './Loading';

import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    if (localStorage.getItem('users') == null)
      api.get('users').then((response) => {
        setUsers(response.data)
        localStorage.setItem('users', JSON.stringify(response.data));
        setIsLoading(false)
      })
    else {
      let array = localStorage.getItem('users')
      setUsers(JSON.parse(array))
      setIsLoading(false)
    }
  }, [])

  const deleteUser = (e) => {
    setIsLoading(true)
    let arrayLocalStorage = JSON.parse(localStorage.getItem('users'))
    let newArray = [];

    arrayLocalStorage.map(user => {
      if (user.cpf != e)
        newArray.push(user)
    })

    localStorage.setItem('users', JSON.stringify(newArray));
    setUsers(newArray)
    setIsLoading(false)
  }

  return (
    <>{isLoading ? <Loading /> :
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.cpf}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>
                  <a className='usertable-button-action-delete' onClick={() => deleteUser(user.cpf)}>
                    <BsFillTrash3Fill />
                  </a>
                  <Link to={`/edit/${user.cpf}`} className='usertable-button-action-edit'>
                    <BsFillPencilFill />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>}</>


  );
};

export default UserTable;