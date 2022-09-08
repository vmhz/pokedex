import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'

const ProtectedRoutes = () => {
  const dispatch = useDispatch()

  let nameTrainer = localStorage.getItem('trainer.name')

  if (nameTrainer) dispatch(setNameTrainer(nameTrainer))

  return nameTrainer ? <Outlet /> : <Navigate to='/' />

}

export default ProtectedRoutes