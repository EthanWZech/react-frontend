import React, { useState, FormEvent } from 'react';
import{
    Button,
    TextField,
    Container,
    Box,
    Typography,
    FormHelperText,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useParams } from  'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import AuthService from "../../services/auth";

const NewPassword: React.FC = () => {
    const { token } = useParams<{ token: string }>();

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent) => {
         event.preventDefault();
         AuthService.newPassword(password, token).then(
          () => {
            navigate("/login");
            window.location.reload();
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
    
            setLoading(false);
            setMessage(resMessage);
          }
        );
      };

    return(
        <Container maxWidth="xs">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8, }} >
          <Typography component="h1" variant="h5">
            Forgot Password?
          </Typography>
          <Box component="form" onSubmit={handleSubmit} mt={3}>
            <TextField label="Enter New Password" margin="normal" required fullWidth autoComplete="email" onChange={(e) => setPassword(e.target.value)} value={password}/>
            <LoadingButton type="submit" variant="contained" loading={loading} sx={{ mt: 4, mb: 3 }}>Send</LoadingButton>
            <Button component={RouterLink} variant="text" to='/login' sx={{ mt: 4, mb: 3 }} >Cancel</Button>
            <FormHelperText>{message}</FormHelperText>
          </Box>
        </Box>
      </Container>
    );
};

export default NewPassword;
