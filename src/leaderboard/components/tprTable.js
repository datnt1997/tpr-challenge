import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  checkIcon: {
    color: '#13cf00'
  },
  firstColumn: {
    position: 'sticky',
    left: 0,
    backgroundColor: '#ffff',
    minWidth: '150px'
  },
  head: {
    'tr': {
      'th': {
        backgroundColor: '#343a40',
        color: '#ffff !important'
      }
    }
  },
  oddRow: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)'
  },
}));

function TPRTable(props) {
  const { participants } = props;
  const classes = useStyles();
  const arrayDate = getDateInMonth(9, 2021);

  function getDateInMonth(month, year) {
    let date = new Date(year, month - 1, 1);
    let days = [];
    while (date.getMonth() === month - 1) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  function formatDate(dateDate) {
    let day = dateDate.getDate();
    return day;
  }

  function passOrNot(dateDate, records) {
    let index = records.findIndex(element => {
      let dateInElementDate = new Date(element.date);
      return dateInElementDate.getTime() === dateDate.getTime()
    });
    let isPass = index !== -1 && records[index].value === 'true';
    if (isPass) {
      return <CheckCircleIcon className={classes.checkIcon} />
    }
  }


  if (participants.length) {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell className={classes.firstColumn}>Runner Name</TableCell>
              {arrayDate.map(item => (
                <TableCell align="center">{formatDate(item)}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={classes.body}>
            {participants.map((item, index) => (
              <TableRow key={item.id} className={index % 2 === 0 ? classes.oddRow : ''}>
                <TableCell component="th" scope="row" className={classes.firstColumn}>
                  <div>{item.displayName}</div>
                  <div>{`${item.records.length}/${item.register.value ?? 15}`}</div>
                </TableCell>
                {arrayDate.map(element => (
                  <TableCell align="center">{passOrNot(element, item.records)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return <div></div>
}

export default TPRTable;