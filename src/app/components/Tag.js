import './Tag.css';

const Tag = ({title, description}) => {
  return (
    <div className="individualTagContainer">
      <h1 className="tagTitle">{title}</h1>
      <h2 className="tagDescription">{description}</h2>
    </div>
  );
}
export default Tag;