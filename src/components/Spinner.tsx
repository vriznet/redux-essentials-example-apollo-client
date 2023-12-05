interface ISpinnerProps {
  text?: string;
  size?: string;
}

const Spinner = (props: ISpinnerProps) => {
  const header = props.text ? <h4>{props.text}</h4> : null;
  return (
    <div className="spinner">
      {header}
      <div
        className="loader"
        style={{ height: props.size || '16px', width: props.size || '16px' }}
      />
    </div>
  );
};

export default Spinner;
