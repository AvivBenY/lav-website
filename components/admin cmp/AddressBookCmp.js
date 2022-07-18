import { DataGrid } from '@mui/x-data-grid'
import { useInfo } from '../../Context/Context'
import styles from '../../styles/AddressBook.module.css'

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

      name: fam.contact.name,
      phone: "0" + fam.contact.phone,
    }));


  const patchFamily = async (id, val, field) => {
    const response = await fetch(`/api/family?id=${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ [field]: val }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data = await response.json();
    console.log("data", data);
  }


  const patchContact = async (id, val, field) => {
    console.log(id);
    try {
      const response = await fetch(`/api/contact?id=${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ [field]: val }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data = await response.json();
      console.log("data", data);
    } catch (err) {
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
    <div  style={{}}
    className={styles.tableMainDiv} container wrap="nowrap" spacing={2}>
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