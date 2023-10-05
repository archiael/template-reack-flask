import React, { useEffect, useState } from 'react';
// import TreeView from '@mui/lab/TreeView';
// import TreeItem from '@mui/lab/TreeItem';
import { TreeItem, TreeView} from '@mui/x-tree-view';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import axios from 'axios'

function Sidebar({menu, handleMenuSelect}){
    const renderTree = (nodes) => (
        <TreeItem key={nodes.menu_id} nodeId={nodes.menu_id} label={nodes.menu_name} onClick={() => handleMenuSelect(nodes.menu_name)}>
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </TreeItem>
    );
    return (
        <>
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ height: '100vh', flexGrow: 1, overflowX: 'hidden', padding: '0 0' }}
                >
                {
                    menu ? menu.map((node)=> renderTree(node)) : []
                }
            </TreeView>
        </>
    )
}
export default Sidebar