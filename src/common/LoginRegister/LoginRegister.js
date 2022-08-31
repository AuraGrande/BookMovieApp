import React from "react";
import { 
    makeStyles,
    Modal,
    Backdrop,
    Fade,
    Box,
    Tab,
    TextField,
    Button,
} from '@material-ui/core';
import {
    TabContext,
    TabList,
    TabPanel,
} from '@material-ui/lab';


const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    compAttribs: {
        width:'95%',
        padding: theme.spacing.unit
    },
}));

export default function LoginRegister(){

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const logoutBtn = (<Button variant="contained" color='default' onClick={handleClose}>Logout</Button>);
    const loginBtn = (<Button variant="contained" color="default" onClick={handleOpen}>Login</Button>);

    return(
        <div>
            {open?logoutBtn:loginBtn}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="LOGIN" value="1" />
                                        <Tab label="REGESTER" value="2" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <TextField required className={classes.compAttribs} id="standard-basic" label="Username" variant="standard" /><br/>
                                    <TextField required className={classes.compAttribs} id="standard-basic" label="Password" variant="standard" /><br/>
                                    <Button className={classes.compAttribs} variant="contained" color='primary' onClick={handleOpen}>LOGIN</Button>
                                </TabPanel>
                                <TabPanel value="2">
                                    <TextField required className={classes.compAttribs} id="standard-basic" label="First Name" variant="standard" /><br/>
                                    <TextField required className={classes.compAttribs} id="standard-basic" label="Last Name" variant="standard" /><br/>
                                    <TextField required className={classes.compAttribs} id="standard-basic" label="Email" variant="standard" /><br/>
                                    <TextField required className={classes.compAttribs} id="standard-basic" label="Password" variant="standard" /><br/>
                                    <TextField required className={classes.compAttribs} id="standard-basic" label="Contact No." variant="standard" /><br/>
                                    <Button className={classes.compAttribs} variant="contained" color='primary'>LOGIN</Button>
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}