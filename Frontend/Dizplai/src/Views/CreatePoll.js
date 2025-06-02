import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { routes } from '../router';

const CreatePoll = () => {
  const navigate = useNavigate();
  const styleButton = {input: {color: "black", background: "white"}}
  const submitHandler = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const question = data.get('question');
    const option1 = data.get('option1');
    const option2 = data.get('option2');
    const option3 = data.get('option3');
    const option4 = data.get('option4');
    const option5 = data.get('option5');
    const option6 = data.get('option6');
    const option7 = data.get('option7');

    const optionsArray = [option1,option2,option3,option4,option5,option6,option7]
    // Filter out empty strings
    const filteredFields = optionsArray.filter(field => field.trim() !== "");
    fetch('http://localhost:8080/polls', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      question: question,
      options: filteredFields,
    })
  })
  setTimeout(() => {
    navigate(routes.home)
  }, 2500);
}

  return (
  <Box sx={{ flexGrow: 1 }} component="form" onSubmit={submitHandler}>
  <Grid container spacing={2} minHeight={160}>
    <Grid display="flex" justifyContent="center" alignItems="center" size="grow">
    <Stack sx={{ width: '40ch' }} spacing={2} noValidate autoComplete="off">
      <Grid display="flex" justifyContent="center" alignItems="center" size="grow">
        <React.Fragment><img alt="Logo" align="middle" width="124" height="60" style={{paddingTop: "50px"}} src="https://dizplai.com/wp-content/themes/neverno/library/images/logo.svg" /></React.Fragment>
      </Grid>
      <Button variant="contained" onClick={() => navigate(routes.home)}>Home</Button>
      <Typography variant="h2" align='center' component="h2">Create A Poll</Typography>
      <TextField name='question' id='question' label="Question" variant="filled" required sx={styleButton}/>
      <TextField name='option1' id='option1' label="Option 1" variant="filled" required sx={styleButton}/>
      <TextField name='option2' id='option2' label="Option 2" variant="filled" required sx={styleButton}/>
      <TextField name='option3' id='option3' label="Option 3" variant="filled" sx={styleButton}/>
      <TextField name='option4' id='option4' label="Option 4" variant="filled" sx={styleButton}/>
      <TextField name='option5' id='option5' label="Option 5" variant="filled" sx={styleButton}/>
      <TextField name='option6' id='option6' label="Option 6" variant="filled" sx={styleButton}/>
      <TextField name='option7' id='option7' label="Option 7" variant="filled" sx={styleButton}/>
      <Button variant="contained" type="submit">Submit</Button>
      </Stack>
    </Grid>
  </Grid>
  </Box>
  )
  
};

export default CreatePoll