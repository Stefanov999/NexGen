import styles from './Menu.module.scss';
import { useNavigate} from 'react-router-dom';

const Menu = () =>{

const navigate = useNavigate();
/// Navigate to Messages
const navigateHandler = (el) =>{
    navigate(`/Messages`)
  };


///Menu HTML
return (

<div className={styles.menuWrapper}>
<h1>nexGen</h1>
<h2 onClick={navigateHandler}>See All Messages</h2>
</div>

);

};
export default Menu;