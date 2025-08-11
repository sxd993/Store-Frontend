import { Alert } from '@mui/material';
import { useNotificationStore } from '../store/notificationStore';

export const NotificationAlert = () => {
    const { message, type, isVisible, hideNotification } = useNotificationStore();
    
    if (!isVisible || !message) {
        console.log('NotificationAlert: скрыт, isVisible:', isVisible, 'message:', message);
        return null;
    }

    return (
        <div className="fixed bottom-4 left-4 z-50">
            <Alert 
                severity={type} 
                onClose={hideNotification}
            >
                {message}
            </Alert>
        </div>
    );
};