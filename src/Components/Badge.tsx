import React, {InputHTMLAttributes} from 'react';
import {FC} from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  isActive: boolean;
}

const Badge: FC<Props> = ({isActive}) => {
  return (
    <>
      <span
        className={`relative inline-block px-3 py-1 font-semibold leading-tight   +
          ${isActive === true ? 'text-green-900' : 'text-gray-900'}`}
      >
        <span
          aria-hidden
          className={`absolute inset-0 opacity-50 rounded-full  + ${
            isActive === true ? 'bg-green-200 ' : ' bg-gray-200 '
          }`}
        ></span>
        <span className="relative flex justify-center items-center">
          <div
            className={`h-2.5 w-2.5 rounded-full  mr-1.5   + ${
              isActive === true ? 'bg-green-400' : 'bg-gray-400'
            } `}
          ></div>
          {isActive === true ? 'Active' : 'Inactive'}
        </span>
      </span>
    </>
  );
};

export default Badge;
