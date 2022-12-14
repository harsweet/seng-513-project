import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';

export default function ChatUser(props) {
  const mobileBackButton = () => {
    if (props.mobile) {
      return (
        <ListItemIcon>
          <ArrowBackIosNewTwoToneIcon className="back-button" onClick={props.handleBackClick} />
        </ListItemIcon>
      )
    }
  }
  function getInitials(name) {
    const names = name.split(' ')
    if (names[1] == null) {
      return {
        sx: {
          bgcolor: 'blue',
        },
        children: `${names[0][0]}`,
      };
    }
    else {
      return {
        sx: {
          bgcolor: 'blue',
        },
        children: `${names[0][0]}${names[1][0]}`,
      };
    }
  }

  return (
    <ListItem button key={props.roomGuid} className={props.className} >
      {mobileBackButton()}
      <ListItemIcon>
          <Avatar {...getInitials(props.user)} />
      </ListItemIcon>
      <div>
        <ListItemText primary={props.user}></ListItemText>
        <ListItemText secondary={props.language}></ListItemText>
      </div>
      <ListItemText secondary={props.status} align="right"></ListItemText>
    </ListItem>
  );
}