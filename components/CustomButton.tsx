'use client';

import { CustomButtonProps } from '@/types';

export const CustomButton = ({ title, containerStyles, handleClick, btnType, textStyles }: CustomButtonProps) => {
  return (
    <button
      type={btnType || 'button'}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
    >
      <span className={`${textStyles}`}>
        {title}
      </span>
    </button>
  )
}
