// @Project
import React from 'react';

// @Own
import './styles.scss';

interface IProps {
  userId?: number,
  width?: number | string,
  height?: number | string
}

const Avatar: React.FC<IProps> = ({
  userId = 1,
  width,
  height
}) => {
  return (
    <div
      data-testid="avatar-testid"
      className="avatar" 
      style={{ width, height }}
    >
      <div
        className={`avatar__fill avatar__fill--${userId}`}
        data-testid="avatar-fill-testid"
      >
      </div> 
    </div>
  )
}

export default Avatar;