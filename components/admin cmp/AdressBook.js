import { Table } from '@mui/material'
import React from 'react'

export default function AdressBook(records, headCells) {
const tblContainer = props =>(
    <Table>
            {props.children}
    </Table>
)
  return (
    tblContainer
  )
}
