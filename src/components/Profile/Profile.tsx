import React, { useState } from 'react';
import { Drawer as MUIDrawer,
    ListItem, 
    List, 
    ListItemText, 
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Divider,
    Button,
    CssBaseline, 
    Box, 
    Dialog, 
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ChevronRight, ChevronLeft } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { theme } from '../../Theme/themes';
import { DataTable } from '../../components'
import { RecipeForm } from '../RecipeForm';
import { RecForm2 } from '../RecForm2';




const drawerWidth = 200;

const myStyles = {
    appBar : {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },

    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },

    menuButton: {
        marginRight: theme.spacing(2),
    },

    hide: {
        display: 'none',
    },

    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },

    drawerPaper: {
        width: drawerWidth,
    },

    drawerHeader: {
        display: 'flex',
        width: drawerWidth,
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },

    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },

    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },

    toolbar:{
        display: 'flex',
    },

    toolbar_button: {
        marginLeft: 'auto',
        backgroundColor: theme.palette.primary.contrastText
    }
  };






export const Profile = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const [dialogOpen, setDialogOpen] = useState(false);

    const [dialogOpen2, setDialogOpen2] = useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const handleDialogClickOpen = () => {
        setDialogOpen(true);
    }
    
    const handleDialogClickClose = () => {
        setDialogOpen(false);
    }

    // const handleDrawerOpen2 = () => {
    //     setOpen(true);
    //   };
    
    //   const handleDrawerClose2 = () => {
    //     setOpen(false);
    //   };
  
    //   const handleDialogClickOpen2 = () => {
    //       setDialogOpen(true);
    //   }
      
    //   const handleDialogClickClose2 = () => {
    //       setDialogOpen(false);
    //   }
  
    const itemsList = [
      {
        text: 'Home',
        onClick: () => navigate('/')
      },
      {
        text: 'Sign In',
        onClick: () => navigate('/signin')
      }
    ]



    return (
        <Box sx={{display:'flex'}} >
            <CssBaseline />
            <AppBar
            sx={open ? myStyles.appBarShift : myStyles.appBar } 
            position="fixed">
                <Toolbar sx={myStyles.toolbar}>
                    <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={ open ? myStyles.hide : myStyles.menuButton }>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap> Profile </Typography>
                    <Button sx={ myStyles.toolbar_button }>Add Your Own Recipe</Button>
                    {/* onClick={handleDialogClickOpen2} */}
                    {/* <Dialog open={dialogOpen2} onClose={handleDialogClickClose2} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Add a New Recipe</DialogTitle>
                        <DialogContent>
                            <RecForm2 />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick = {handleDialogClickClose2} color="primary">Cancel</Button>
                        </DialogActions>
                    </Dialog> */}
                    <Button sx={ myStyles.toolbar_button } onClick={handleDialogClickOpen}> Get a Random Recipe </Button>
                    <Dialog open={dialogOpen} onClose={handleDialogClickClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Add a Random Recipe</DialogTitle>
                        <DialogContent>
                            <RecipeForm />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick = {handleDialogClickClose} color="primary">Cancel</Button>
                        </DialogActions>
                    </Dialog>
                </Toolbar>
            </AppBar>
            <MUIDrawer
            sx={open ? myStyles.drawer : myStyles.hide}
            variant="persistent"
            anchor="left"
            open={open}
            style={{width:drawerWidth}}>
                <Box sx={myStyles.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                    </IconButton>
                </Box>
                <Divider />
                <List>
                    {itemsList.map((item, index) => {
                        const { text, onClick } = item;
                        return (
                            <ListItem button key={text} onClick={onClick}>
                                <ListItemText primary={text} />
                            </ListItem>
                        );
                    })}
                </List>
            </MUIDrawer>
            <Box sx={ myStyles.content } >

            <Box sx={ myStyles.drawerHeader }/>

            <DataTable />
            </Box>
        </Box>
    )
};