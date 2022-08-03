import { DataGrid } from '@mui/x-data-grid'
import { useInfo } from '../../Context/Context'
import styles from '../../styles/AddressBook.module.css'
import { useEffect } from 'react'

export default function AddressBook() {
  const { familiesArr, setFamiliesArr } = useInfo()

  useEffect(() => {
    fetch("/api/family")
      .then((res) => res.json())
      .then((families) => {
        setFamiliesArr(families)
      });
  }, [familiesArr])

  const columns = [
    { field: 'lavArea', headerName: 'איזור', width: 100, editable: true },
    { field: 'lineNr', headerName: 'קו', width: 70, editable: true },
    {
      field: 'address', headerName: 'כתובת', type: 'string', width: 250, renderCell: (cellValues) => {
        return (
          <div
            style={{
              overflow: 'scroll',
            }}
          >
            {cellValues.value}
          </div>
        );
      }, editable: true
    },
    {
      field: 'description', headerName: 'תיאור', width: 250, renderCell: (cellValues) => {
        return (
          <div
            style={{
              overflow: 'scroll',
            }}
          >
            {cellValues.value}
          </div>
        );
      }, editable: true
    },
    { field: 'isGettingFood', headerName: 'מקבל ארגז', type: 'boolean', width: 130, editable: true },
    {
      field: 'name', headerName: 'שם איש קשר', type: 'string', width: 150, sortable: false,
      editable: true
    },
    {
      field: 'phone', headerName: 'טלפון איש קשר', type: 'string', width: 150, sortable: false,
      editable: true
    },
    {
      field: "מחק משפחה",
      renderCell: (cellValues) => {
        return (
          <button
            className={styles.delBtn}
            variant="contained"
            color="primary"
            onClick={(event) => {
              handleClick(event, cellValues);
            }}
          >

            ✗
          </button>
        );
      }
    },
  ];
  const handleClick = async (e, c) => {
    console.log("event", e, "cellValues", c);
    try {
      const response = await fetch(`/api/family?_id=${c.id}`, {
        method: 'DELETE',
      })
      const data = await response.json();
      console.log("data", data);
    } catch (err) {
      console.log(err);
    }
  }

  const rows =
    familiesArr.map(fam => ({
      id: fam._id,
      lavArea: fam.lavArea,
      lineNr: fam.lineNr,
      address: fam.address,
      description: fam.description,
      isGettingFood: fam.isGettingFood,
      name: fam.contact?.name,
      phone: "0" + fam.contact?.phone,
    }));


  const patchFamily = async (id, val, field) => {
    const response = await fetch(`/api/family?_id=${id}`, {
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
      const response = await fetch(`/api/contact?_id=${id}`, {
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


  function patchVal(p) {
    console.log("res", p);
    if (p.field === 'phone' || p.field === 'name') {
      console.log("CONTACT FIELD");
      patchContact(p.id, p.value, p.field);
      return;
    } else {
      console.log("FAMILIY FIELD");
      patchFamily(p.id, p.value, p.field)
    }
  }

  return (
    <div className={styles.tableMainDiv} container wrap="nowrap" spacing={2}>
      <DataGrid
        rowHeight={70}
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection={false}
        onCellEditCommit={patchVal}
      />
    </div>
  );
}