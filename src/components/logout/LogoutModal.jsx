import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsLoggedIn } from '../../features/login/loginSlice';


const LogoutModal = ({open,setOpen}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <Fragment>
        <Dialog
            open={open}
            onClose={()=>setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Déconnexion"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir vous déconnecter?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>setOpen(false)}>Non</Button>
            <Button onClick={()=>{
                    localStorage.clear();
                    dispatch(setIsLoggedIn(false));
                    navigate("/auth/login");
                    setOpen(false);
                }} autoFocus>
                Se déconnecter
            </Button>
            </DialogActions>
        </Dialog>
        </Fragment>
    );
}

export default LogoutModal;