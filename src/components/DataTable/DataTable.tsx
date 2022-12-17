import React, { useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'; 

import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';
import { RecipeForm } from '../RecipeForm';
import { getAuth } from 'firebase/auth';



const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 50 },
    {
      field: 'title',
      headerName: 'Title',
      width: 150,
      editable: true,
    },

    {
      field: 'cuisine',
      headerName: 'Cuisine',
      width: 100,
      editable: true,
    },

    {
      field: 'course',
      headerName: 'Course',
      width: 125,
      editable: true,
    },

    {
      field: 'servings',
      headerName: 'Servings',
      type: 'number',
      width: 75,
      editable: true,
    },
];


interface gridData{
  data:{
    id?:string;
  }
}


export const DataTable =  () => {
  
  let { recipeData, getData } = useGetData();
  let [open, setOpen] = useState(false);
  let [gridData, setData] = useState<GridSelectionModel>([])

  let handleOpen = () => {
    setOpen(true)
  }

  let handleClose = () => {
    setOpen(false)
  }

  let deleteData = () => {
    serverCalls.delete(`${gridData[0]}`)
    getData()
  }

  console.log(gridData) 

  const MyAuth = localStorage.getItem('myAuth')
  console.log(MyAuth)

  if (MyAuth == 'true') {

    return (
      <div style={{ height: 400, width: '100%' }}>
        <h2>Recipes in Favorites</h2>
        <DataGrid 
          rows={recipeData} 
          columns={columns} 
          pageSize={5} 
          checkboxSelection 
          onSelectionModelChange = {(newSelectionModel) => {setData(newSelectionModel);}}
          {...recipeData}  
        />

        <Button onClick={handleOpen}>Update</Button>
        <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update A Recipe</DialogTitle>
          <DialogContent>
            <DialogContentText>Recipe id: {gridData[0]}</DialogContentText>
              <RecipeForm id={`${gridData[0]}`}/>
          </DialogContent>

          <DialogActions>
            <Button onClick = {handleClose} color="success">Cancel</Button>
            <Button onClick={handleClose} color = "success">Done</Button> 
          </DialogActions>
        </Dialog>
      </div>
    )
  }else {
    return (
      <div>
          <h3>Please Sign In to View Your Favorite Recipes</h3>
      </div>
    )
  }
}

