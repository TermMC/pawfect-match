import './SmallTag.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const SmallTag = ({title, children, icon}) => {
  return (
    <div className='tagContainer'>
      <p className='tagTitle'>{title}{children}&nbsp;&nbsp;<FontAwesomeIcon icon={icon} /></p>  
    </div>
  );
}
export default SmallTag;