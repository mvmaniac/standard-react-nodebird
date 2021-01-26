import {useState, useCallback} from 'react';

const useInput = (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const setter = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  return [value, setter];
};

export default useInput;
