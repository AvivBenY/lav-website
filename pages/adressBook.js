import { DataGrid, useGridApiRef } from '@mui/x-data-grid'
import { useInfo } from '../Context/Context'
import styles from '../styles/AdressBook.module.css'
import '../styles/AdressBook.module.css'

export default function AdressBook() {
  const { familiesArr,setFamiliesArr } = useInfo()
  const columns = [
    { field: '_id', headerName: '#', width: 70 },
    { field: 'lavArea', headerName: 'איזור', width: 100, editable: true },
    { field: 'lineNr', headerName: 'קו', width: 70, editable: true },
    { field: 'adress',headerName: 'כתובת',type: 'string',width: 250, renderCell: (cellValues) => {
      return (
        <div 
          style={{            
            overflow: 'scroll',
          }}
        >
          {cellValues.value}
        </div>
      );
    }, editable: true},
    { field: 'description', headerName: 'תיאור', width: 250, renderCell: (cellValues) => {
      return (
        <div 
          style={{            
            overflow: 'scroll',
          }}
        >
          {cellValues.value}
        </div>
      );
    }, editable: true},
    { field: 'isGettingFood',headerName: 'מקבל ארגז',type: 'boolean',width: 130, editable: true},
    { field: 'name',headerName: 'שם איש קשר',type: 'string',width: 150, sortable: false, 
     editable: true},    
    { field: 'phone',headerName: 'טלפון איש קשר',type: 'string', width: 150, sortable: false, 
    editable: true },    
  ];
  
  const rows = 
    familiesArr.map(fam =>  ({
      id: fam._id,
      lavArea: fam.lavArea,
      lineNr: fam.lineNr,
      adress: fam.adress,
      description: fam.description,
      isGettingFood: fam.isGettingFood,
      // contact name: fam.contact.name + ": 0" + fam.contact.phone

      name: fam.contact.name,
      phone: "0" + fam.contact.phone,
    }));


  const patchFamily = async(id,val, field) =>{
  const response =await fetch(`/api/family?id=${id}`,{
    method:'PATCH',
    body: JSON.stringify({[field]: val}), 
    headers:{
      'Content-Type': 'application/json'
    },     
  })
  const data = await response.json();
  console.log("data", data);
}


const patchContact = async(id,val, field) =>{
  console.log(id);
  try{
    const response = await fetch(`/api/contact?id=${id}`,{
      method:'PATCH',
      body: JSON.stringify({[field]: val}),
      headers:{
        'Content-Type': 'application/json'
      },     
    })
    const data = await response.json();
    console.log("data", data);
  }catch(err){
    console.log(err);
  }
}


  function patchVal(p){    
    console.log("res", p);
    if (p.field === 'phone' || p.field ==='name') {
      console.log("CONTACT FIELD");
      patchContact(p.id, p.value, p.field);
      return;
    } else { 
      console.log("FAMILIY FIELD"); 
      patchFamily(p.id, p.value, p.field) 
    }
  }

  return (
    <div style={{ height: 500, width: '80%' }} 
    className={styles.mainDiv} container wrap="nowrap" spacing={2}>
      <DataGrid
      rowHeight={70}
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        onCellEditCommit={patchVal}
      />
    </div>
  );
}





//INDIAN VID
// import React from 'react'
// import { useInfo } from '../Context/Context'
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import styles from '../styles/AdressBook.module.css'
// // import useComponent from '../components/admin cmp/AdressBook'

// export default function AdressBook() {
//     const { familiesArr,setFamiliesArr } = useInfo();
//   // const {tblContainer} =  useComponent();
//    function sort(){
//     const a = [...familiesArr]
//     console.log("families", a);
//     const h = a.sort((a,b) => {return( a.lavArea-b.lavArea)});
//     console.log("sorted", h);
//    }
//     sort();

//     return (
//       <Table>
//         <TableBody>
//           {
//             familiesArr.map((fam) =>{
//               <TableRow key={fam.id}>
//               <TableCell>{fam.adress}</TableCell>
//               <TableCell>{fam.lavArea}</TableCell>
//               <TableCell>{fam.description}</TableCell>
//               </TableRow>
//             })
//           }
//         </TableBody>
//       </Table>
//     )
//  }


//ORIGINAL
// import React from 'react'
// import { useInfo } from '../Context/Context'
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import styles from '../styles/AdressBook.module.css'


// export default function AdressBook() {
//     const { familiesArr,setFamiliesArr } = useInfo();

//    function sort(){
//     const a = [...familiesArr]
//     console.log("families", a);
//     const h = a.sort((a,b) => {return( a.lavArea-b.lavArea)});
//     console.log("sorted", h);
//    }
//     sort();

//     return (
//         <TableContainer component={Paper} className={styles.mainDiv}>
//        <Table sx={{ minWidth: 650 }} aria-label="simple table">
//          <TableHead>
//            <TableRow>
//              <TableCell className={styles.cellN} align="right">#</TableCell>
//              <TableCell className={styles.cell} align="right">
//               <button onClick={()=>sort()}>k</button> איזור</TableCell>
//              <TableCell className={styles.cell} align="right">קו</TableCell>
//              <TableCell className={styles.cell} align="right">כתובת</TableCell>
//              <TableCell className={styles.cell} align="right">תיאור</TableCell>
//              <TableCell className={styles.cell} align="right">מקבל ארגז?</TableCell>
//              <TableCell className={styles.cell} align="right">איש קשר</TableCell>
//              <TableCell className={styles.cell} align="right">טלפון איש קשר</TableCell>
//            </TableRow>
//          </TableHead>
//          <TableBody>
//            {familiesArr.map((row,index) => (
//              <TableRow
//                key={index}
//                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//              >  
//              <TableCell className={styles.cellN}>{index + 1}</TableCell>
//                 <TableCell className={styles.cell}>
                   
//                   {row.lavArea}
                  
//                   </TableCell>
//                <TableCell  className={styles.cell}>{row.lineNr}</TableCell>
//                <TableCell className={styles.cell} component="th" scope="row">
//                  {row.adress}</TableCell>
//                  <TableCell  className={styles.cell}>{row.description}</TableCell>
//                <TableCell  className={styles.cell}>{row.isGettingFood ? '✔️' : '❌'}</TableCell> 
//                <TableCell  className={styles.cell}>{row.contact && row.contact.name}</TableCell> 
//                <TableCell  className={styles.cell}>{row.contact && row.contact.phone}</TableCell> 
//              </TableRow>
//            ))}
//          </TableBody>       
//         </Table>
//      </TableContainer>
//     )
//  }

