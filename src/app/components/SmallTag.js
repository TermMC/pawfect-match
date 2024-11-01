import './SmallTag.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const SmallTag = ({title, children, icon}) => {
  return (
    <div className='tagContainer'>
      <h3 className='tagTitle'>{title}{children}&nbsp;&nbsp;<FontAwesomeIcon icon={icon} /></h3>  
    </div>
  );
}
export default SmallTag;