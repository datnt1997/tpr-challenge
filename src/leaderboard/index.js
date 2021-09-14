import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

import TPRTable from './components/tprTable';

const useStyles = makeStyles((theme) => ({
  leaderboardContainer:{
    textAlign: 'center'
  }
}));

function Leaderboard() {
  const [participants, setParticipants] = useState([]);
  const [challengeName, setChallengeName] = useState('');
  const classes = useStyles();
  const url = 'https://bao-bin-server.de.r.appspot.com/tprs/challenge';

  async function getChallengeInfo() {
    const responseGetChallenges = await axios.post(url, {
      query: `{
        getChallenges{
          id
          name
          startDate
          endDate
          description
          participants{
            id
            displayName
            facebookProfile
            register{
              date
              value
            }
            records{
              date
              value
            }
          }
        }
      }`
    });
    let participants = responseGetChallenges?.data?.data?.getChallenges?.[0]?.participants ?? [];
    const challengeNameRes = responseGetChallenges?.data?.data?.getChallenges?.[0]?.name ?? '';
    setChallengeName(challengeNameRes);
    setParticipants(participants);
  }

  React.useEffect(() => {
    getChallengeInfo();
  }, []);

  return (
    <div className={classes.leaderboardContainer}>
      <h1>{challengeName}</h1>
      <TPRTable participants={participants} />
    </div>
  );
}

export default Leaderboard;
