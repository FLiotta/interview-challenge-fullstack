// @Packages
import React from 'react';
import cn from 'classnames';

// @Own
import './styles.scss';

interface IProps {
  className?: string
  brandColor?: boolean
  tag: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'small' | 'span'
}

const Logo: React.FC<IProps> = ({
  className,
  brandColor,
  tag
}) => {
  const getTag = () => {
    //En caso que se necesite hacer con algun otro tag para espacios mas reducidos.
    
    return React.createElement(tag, {
      className: cn("logo", className, {
        "logo--brand-color": brandColor
      })
    }, 'PiggyBank'
    );
  }

  return getTag()
}

export default Logo;