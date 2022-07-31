import { DataGrid } from '@mui/x-data-grid'
import { useInfo } from '../../Context/Context'
import styles from '../../styles/AddressBook.module.css'
import { useEffect } from 'react'

export default function AddressBook() {
    const { volunteersArr, setVolunteersArr } = useInfo()

    useEffect(() => {
        fetch("/api/volunteer")
            .then((res) => res.json())
            .then((volunteers) => {
                setVolunteersArr(volunteers)
            });
    }, [volunteersArr])

    const columns = [
        {
            field: 'lavArea', headerName: 'איזור', type: 'string', width: 150, sortable: false,
            editable: true
        },
        {
            field: 'name', headerName: 'שם', type: 'string', width: 150, sortable: false,
            editable: true
        },
        {
            field: 'phone', headerName: 'טלפון', type: 'string', width: 150, sortable: false,
            editable: true
        },
        {
            field: 'description', headerName: 'פרטים נוספים', width: 250, renderCell: (cellValues) => {
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
            field: "מחק מתנדב",
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

    const rows =
        volunteersArr.map(vol => ({
            id: vol._id,
            lavArea: vol.lavArea,
            description: vol.description,
            name: vol.name,
            phone: "0" + vol.phone,
        }));

    const handleClick = async (e, c) => {
        console.log("event", e, "cellValues", c);
        try {
            const response = await fetch(`/api/volunteer?_id=${c.id}`, {
                method: 'DELETE',
            })
            const data = await response.json();
            console.log("data", data);
        } catch (err) {
            console.log(err);
        }
    }




    const patchVolunteer = async (id, val, field) => {
        const response = await fetch(`/api/volunteer?_id=${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ [field]: val }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json();
        console.log("data", data);
    }


    function patchVal(p) {
        console.log("res", p);
        console.log("VOLUNTEER FIELD");
        patchVolunteer(p.id, p.value, p.field);
        return;
    }

    return (
        <div style={{}}
            className={styles.tableMainDiv} container wrap="nowrap" spacing={2}>
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