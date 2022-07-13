import React from 'react'
import { useInfo } from '../Context/Context'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from '../styles/AdressBook.module.css'


export default function AdressBook() {
    const { familiesArr } = useInfo();
    console.log();

    return (
        <TableContainer component={Paper} className={styles.mainDiv}>
       <Table sx={{ minWidth: 650 }} aria-label="simple table">
         <TableHead>
           <TableRow>
             <TableCell className={styles.cellN} align="right">#</TableCell>
             <TableCell className={styles.cell} align="right">כתובת</TableCell>
             <TableCell className={styles.cell} align="right">איזור</TableCell>
             <TableCell className={styles.cell} align="right">קו</TableCell>
             <TableCell className={styles.cell} align="right">מקבל ארגז?</TableCell>
             <TableCell className={styles.cell} align="right">איש קשר</TableCell>
             <TableCell className={styles.cell} align="right">טלפון איש קשר</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {familiesArr.map((row,index) => (
             <TableRow
               key={index}
               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
             >  
             <TableCell className={styles.cellN}>{index + 1}</TableCell>
               <TableCell className={styles.cell} component="th" scope="row">
                 {row.adress}</TableCell>
                <TableCell className={styles.cell}>{row.lavArea}</TableCell>
               <TableCell  className={styles.cell}>{row.lineNr}</TableCell>
               <TableCell  className={styles.cell}>{row.isGettingFood ? '✔️' : '❌'}</TableCell> 
               <TableCell  className={styles.cell}>{row.contact && row.contact.name}</TableCell> 
               <TableCell  className={styles.cell}>{row.contact && row.contact.phone}</TableCell> 
             </TableRow>
           ))}
         </TableBody>       
        </Table>
     </TableContainer>
    )
 }


//  function createData(lavArea, lineNr, adress, isGettingFood, contact) {
//    return { lavArea, lineNr, adress, isGettingFood, contact };
//  }
 
//  export default function BasicTable() {
//    return (
//      <TableContainer component={Paper}>
//        <Table sx={{ minWidth: 650 }} aria-label="simple table">
//          <TableHead>
//            <TableRow>
//              <TableCell align="right">איזור</TableCell>
//              <TableCell align="right">קו</TableCell>
//              <TableCell align="right">כתובת</TableCell>
//              <TableCell align="right">מקבל ארגז?</TableCell>
//              <TableCell align="right">איש קשר</TableCell>
//            </TableRow>
//          </TableHead>
//          <TableBody>
//            {familiesArr.map((row) => (
//              <TableRow
//                key={row.name}
//                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//              >
//                <TableCell component="th" scope="row">
//                  {row.name}
//                </TableCell>
//                <TableCell align="right">{row.lavArea}</TableCell>
//                <TableCell align="right">{row.lineNr}</TableCell>
//                <TableCell align="right">{row.adress}</TableCell>
//                <TableCell align="right">{row.isGettingFood}</TableCell>
//                <TableCell align="right">{row.contact}</TableCell>
//              </TableRow>
//            ))}
//          </TableBody>
//        </Table>
//      </TableContainer>
//    );
//  }
 




// import React from 'react'
// import FamilyCard from '../components/FamilyCard'
// import { useInfo } from '../Context/Context'

// export default function AdressBook() {
//     const { familiesArr } = useInfo();
//     console.log();

//     return (
//         <section>
//             {
//                 familiesArr.length > 0
//                     ? familiesArr.map((item, index) => {
//                         return (
//                             <FamilyCard
//                                 key={index}
//                                 lavArea={item.lavArea}
//                                 lineNr={item.lineNr}
//                                 adress={item.adress}
//                                 isGettingFood={item.isGettingFood}
//                                 contact={item?.contact}
//                             />
//                         )
//                     }) : <div>not ready</div>
//             }
//         </section>
//     )
//  }

