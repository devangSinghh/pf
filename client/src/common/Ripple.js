import React, {useState, useEffect} from 'react';

const RippleButton = ({ children, onClick }) => {
    const [coords, setCoords] = useState({ x: -1, y: -1 });
    const [isRippling, setIsRippling] = useState(false);
  
    useEffect(() => {
      if (coords.x !== -1 && coords.y !== -1) {
        setIsRippling(true);
        setTimeout(() => setIsRippling(false), 300);
      } else setIsRippling(false);
    }, [coords]);
  
    useEffect(() => {
      if (!isRippling) setCoords({ x: -1, y: -1 });
    }, [isRippling]);
  
    return (
      <button
        className="ripple-button w-100"
        onClick={e => {
          const rect = e.target.getBoundingClientRect();
          setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          onClick && onClick(e);
        }}
      >
        {isRippling ? (
          <span
            className="ripple"
            style={{
              left: coords.x,
              top: coords.y
            }}
          />
        ) : (
          ''
        )}
        <div className="w-100 content">{children}</div>
      </button>
    );
  };

  export default RippleButton;