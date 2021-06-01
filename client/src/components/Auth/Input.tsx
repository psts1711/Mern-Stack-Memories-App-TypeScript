import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({fieldName, label, handleChange, 
    autoFocus, type, handleShowPassword, half}:any) => {

    const data:any = fieldName === 'password' ? {
        endAdornment: (
            <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                    {type === 'password' ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            </InputAdornment>
        ),
    } : null;

    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
               name={fieldName}
               onChange={handleChange}
               variant="outlined"
               required
               fullWidth
               label={label}
               autoFocus={autoFocus}
               autoComplete="off"
               size="small"
               type={type}
               InputProps={data}

            />
        </Grid>
    )
};

export default Input
