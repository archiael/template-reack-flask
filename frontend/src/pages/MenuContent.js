import React, { useEffect, useState } from 'react';
import { Drawer, Button } from '@mui/material';
import {
    DataGrid, GridRowModes, GridRowEditStopReasons, GridToolbarContainer,
    GridActionsCellItem,
 } from '@mui/x-data-grid';
import { Toolbar, IconButton, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import { AddIcon, EditIcon, DeleteIcon, SaveIcon} from '@mui/icons-material';

function CustomToolbar({onAdd, onDelete, onEdit}){
    return(
        // <Toolbar variant='dense'>
        //     <Typography variant='h6' component='div' sx={{flexGrow:1}}>
        //         DataGrid Toolbar
        //     </Typography>
        //     <IconButton onClick={onAdd}>ADD</IconButton>
        //     <IconButton onClick={onDelete}>DELETE</IconButton>
        //     <IconButton onClick={onEdit}>EDIT</IconButton>
        // </Toolbar>
        <GridToolbarContainer>
            <Button startIcon={<AddIcon/>}>Add record</Button>
        </GridToolbarContainer>
    )
}

function MenuContent({selectedMenu}){
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([])
    
    const [updatedRows, setUpdatedRows] = useState([]);
    const [isDataChanged, setIsDataChanged] = useState(false);

    // data grid 내부에서 ???
    const [rowModesModel, setRowModesModel] = React.useState({});

    useEffect(()=>{
        // 서버에서 Column 및 Row 데이터 가져오기
        // axios.get('')

        const dumy_rows = [
            { id: 1, name: 'Item 1', description: 'Description 1' },
            { id: 2, name: 'Item 2', description: 'Description 2' }]

        const dumy_columns = [{ field: 'id', headerName: 'ID', width: 70 },
            { field: 'name', headerName: 'Name', width: 150, editable:true },
            { field: 'description', headerName: 'Description', width: 300, editable: true },
            { field: 'actions', type:'actions', headerName:'Actions',width:100,cellClassName:'actions', getActions: ({id})=>{
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                console.log(isInEditMode)
                if (isInEditMode){
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon/>}
                            label="Save"
                            sx={{
                                color: "primary.main"
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon/>}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />
                    ]
                } else{
                    return [
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            className="textPrimary"
                            onClick={handleEditClick(id)}
                        color="inherit"
                        />,
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={handleDeleteClick(id)}
                            color="inherit"
                        />,
                    ]
                }
            }}]
            
        setRows(dumy_rows)
        setColumns(dumy_columns)
    }, [selectedMenu])

    const handleCellEditCommit = (params) =>{
        console.log('handleCellEditCommit')
        const updatedRow = { ...params.row };
        const rowIndex = updatedRows.findIndex( (row) => row.id === params.row.id);

        if (rowIndex === -1){
            setUpdatedRows([...updatedRows, updatedRow])
            setIsDataChanged(true)
        } else {
            const updatedRowsCopy = [...updatedRows];
            updatedRowsCopy[rowIndex]=updatedRow;
            setUpdatedRows(updatedRowsCopy);
        }
    }

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };
    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };
    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const [selectedRow, setSelectedRow] = useState(null);
    const handleCloseDetailPanel = () => {
        setSelectedRow(null);
    }
    const handleRowClick = (row) => {
        setSelectedRow(row);
    };

    // 행 추가 삭제 수정


    return(
        <>
            <div style={{height:400, width: '80vw'}}>
                {/* {selectedMenu} */}
                {/* <button onClick={addRow}>Add Row</button> */}
                {/* <CustomToolbar/> */}
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    onRowClick={handleRowClick}
                    processRowUpdate={processRowUpdate}
                    editMode='row'
                    pageSize={5}
                    rowPerPageOptions={[5,10,20]}
                    onEditCellChangeCommitted={handleCellEditCommit}
                    slots={{
                        toolbar: CustomToolbar
                    }}
                    slotProps={{
                        toolbar: { setRows, setRowModesModel}
                    }}
                />
            </div>
            <div>
                <DetailPanel selectedRow={selectedRow} onClose={handleCloseDetailPanel} />
            </div>
        </>
    )
}
export default MenuContent;

export const DetailPanel = ({selectedRow, onClose})=>{
    return(
        <Drawer anchor='right' open={!!selectedRow} onClose={onClose}>
            <div>
                {selectedRow ? (
                    <div style={{width:'50vw'}}>
                        <h2>Details</h2>
                    </div>
                ):(
                    <p>Select a row to see details.</p>
                )}
            </div>
        </Drawer>
    )
}

