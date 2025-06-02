
import react, { useEffect, useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { routes } from '../router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import LinearProgress from '@mui/material/LinearProgress';

const Home = () => {
  const navigate = useNavigate();
  const [polls, setPolls] = useState(Array);
  const [votes, setVotes] = useState(Array);
  useEffect(() => {
    const getData = async () => {
      const url = "/polls/allPolls";
      try {
        const resp = await fetch(url);
        const data = await resp.json();
        setPolls(await data);
      } catch (err) {
        console.error(err);
      }
    }
    getData();
  }, []);

  const getDataVotes = async (voteId) => {
    const url = `/polls/${voteId}/votes`
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      setVotes(await data);
    } catch (err) {
      console.error(err);
    }
  }
  const castVotes = async (voteId, index) => {
    const url = `http://localhost:8080/polls/${voteId}/vote?optionIndex=${index}`
    const test = fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }

  const handleClick = (voteId, index) => {
    castVotes(voteId, index)
    getDataVotes(voteId)
  }

  const SumOptionIndex = ({ pollId, votes, option }) => {
    const [tally, setTally] = useState([]);
    const [percentages, setPercentages] = useState([]);
    useEffect(() => {
      if (!pollId || !votes || votes.length === 0) return;
      // Filter votes for the given pollId
      const filteredVotes = votes.filter(vote => vote.pollId === pollId);
      // Tally the votes by optionIndex
      const result = [];
      filteredVotes.forEach(({ optionIndex }) => {
        result[optionIndex] = (result[optionIndex] || 0) + 1;
      });
      const filledResult = result.map(count => count || 0);
      const total = filledResult.reduce((acc, num) => acc + num, 0);
      const percentages = filledResult.map(num => total > 0 ? (num / total) * 100 : 0);
      setTally(filledResult);
      setPercentages(percentages);
    }, [pollId, votes]);
    return (
      <div>
        {tally.map((count, index) => (
          <>
            <Box display="flex" alignItems="center" p={0.25}>
              <Box width="100%" mr={3}>
                <LinearProgress data-testid='Percentage-Bar' variant="determinate" value={percentages[index]} />
                <Box minWidth={35}>
                  <Typography variant="body2">
                  {option?.[index]}: {Math.round(percentages[index])}%
                  </Typography>
                </Box>
              </Box>
            </Box>
          </>
        ))}
      </div>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} minHeight={160}>
        <Grid display="flex" justifyContent="center" alignItems="center" size="grow">
          <Stack component="form" spacing={2} autoComplete="off">
            <Grid display="flex" justifyContent="center" alignItems="center" size="grow">
              <Fragment><img alt="Logo" align="middle" width="124" height="60" style={{ paddingTop: "50px" }} src="https://dizplai.com/wp-content/themes/neverno/library/images/logo.svg" /></Fragment>
            </Grid>
            <Button variant="contained" onClick={() => navigate(routes.createPoll)}>Create Polls</Button>
            {polls.map((card) => (
              <Card>
                <CardActionArea>
                  <CardContent sx={{ height: '100%' }}>
                    <Typography variant="h5" align='center' component="div">{card.question}</Typography>
                    <SumOptionIndex pollId={card.id} votes={votes} option={card.options} />
                    {card.options.map((option, index) => (
                      <>
                        <Stack component="form" sx={{ width: '40ch', height: '6ch' }} spacing={2}>
                          <Button variant="contained" name={card.id} onClick={() => handleClick(card.id, index)} value={index}>{option}</Button>
                        </Stack>
                      </>
                    ))}
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;