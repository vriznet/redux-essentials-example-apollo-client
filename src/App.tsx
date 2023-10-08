import { useDispatch, useSelector } from 'react-redux';
import { GlobalStyles } from './components/GlobalStyles';
import { decrement, increment, selectCount } from './redux/module/counterSlice';

const App = () => {
  const dispatch = useDispatch();
  const counterValue = useSelector(selectCount);

  const onIncrement = () => {
    dispatch(increment());
  };

  const onDecrement = () => {
    dispatch(decrement());
  };

  return (
    <>
      <GlobalStyles />
      <div>
        <h1>Basic Counter with Redux</h1>
        <div>{counterValue}</div>
        <button onClick={onDecrement}>-</button>
        <button onClick={onIncrement}>+</button>
      </div>
    </>
  );
};

export default App;
