import React, { useState } from 'react';
import './ChangePassword.css';
import Message from './message';

const ChangePassword = ({ username, onPasswordChangeSuccess }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isPasswordChanged, setIsPasswordChanged] = useState(false); 

    const handleChangePassword = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            setMessage('New passwords do not match.');
            return;
        }

        console.log(username);

        const response = await fetch('http://localhost:9000/customers/CustomerChangePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username, 
                currentPassword,
                newPassword,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            setMessage(data.message || 'Failed to change password.');
            return;
        }

        setMessage('Password changed successfully!');
        setIsPasswordChanged(true); 

        onPasswordChangeSuccess();

        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
      <div className='outside'>
        <div className='change-password-container'>
            <h2 className='h1'>Change Password</h2>
            {isPasswordChanged && <Message />} 
            {message && <p className='message'>{message}</p>}
            <form onSubmit={handleChangePassword}>
                <div className='form-group'>
                    <label htmlFor='currentPassword'>Current Password:</label>
                    <input
                        type='password'
                        id='currentPassword'
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        disabled={isPasswordChanged} 
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='newPassword'>New Password:</label>
                    <input
                        type='password'
                        id='newPassword'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        disabled={isPasswordChanged} 
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='confirmPassword'>Confirm New Password:</label>
                    <input
                        type='password'
                        id='confirmPassword'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={isPasswordChanged} 
                    />
                </div>
                <button className='b1' type='submit' disabled={isPasswordChanged}>
                    {isPasswordChanged ? 'Password Changed' : 'Change Password'}
                </button>
            </form>
        </div>
      </div>
    );
};

export default ChangePassword;
