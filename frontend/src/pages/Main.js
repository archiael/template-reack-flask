import React, { useEffect } from 'react';
import axios from 'axios'
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function Main() {
    let data = [{
        id: '1',
        name: 'Parent',
        children: [
            {
                id: '4',
                name: 'Child - 1',
                children:[
                    {
                        id:'4',
                        name: 'Child -4'
                    }
                ]
            }]
        },
        {
            id: '2',
            name: 'Parent',
            children: [
                {
                    id: '5',
                    name: 'Child - 2',
                }]
        }, {
            id: '3',
            name: 'Parent',
            children: [
                {
                    id: '6',
                    name: 'Child - 3',
                }]
        }];

    useEffect(()=>{
        console.log('a')
        data = {        
            id: '1',
            name: 'Parentss',
            children: [
                {
                    id: '2',
                    name: 'Child - 1',
                }]}
        console.log(data)
        return()=>{
            console.log('b')
        }
    }, [])

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </TreeItem>
    );

    return(
        <>
            <h1>Main</h1>
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                // sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
            >
                {
                    data.map((node)=> renderTree(node))
                }
            </TreeView>
        </>
    )
}

export default Main