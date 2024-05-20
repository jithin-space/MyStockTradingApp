import { Snackbar, Alert} from '@mui/material'
import { SyntheticEvent } from 'react';

interface NotificationProps {
    open: boolean,
    message: string,
    severity: 'success' | 'error' | 'warning' | 'info';
    handleClose: (event?: Event | SyntheticEvent<any, Event>, reason?: string) => void;
}

const Notification = ({ open, message, severity, handleClose }: NotificationProps ) => {

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} security={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Notification;