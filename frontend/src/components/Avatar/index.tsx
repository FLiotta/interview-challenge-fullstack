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
      className="avatar" 
      style={{ width, height }}
    >
      <div className={`avatar__fill avatar__fill--${userId}`}></div> 
    </div>
  )
}

export default Avatar;