import React, {FC, InputHTMLAttributes} from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  changePageCount: any;
  pageCount: number;
}

const Pagination: FC<Props> = ({changePageCount, pageCount}) => {
  return (
    <div className="my-4 mx-5 flex items-center ">
      <div className="ml-5">
        <button
          id="dropdownActionButton"
          data-dropdown-toggle="dropdownAction"
          className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-base px-3 py-1.5 "
          type="button"
          disabled={pageCount <= 1}
          onClick={() => {
            changePageCount(pageCount - 1);
          }}
        >
          <svg
            fill="#000000"
            height="11px"
            width="11px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 511.955 511.955"
            xmlSpace="preserve"
            className="mr-1"
          >
            <g>
              <g>
                <path
                  d="M511.813,254.103c-0.96-5.227-5.653-8.853-10.88-8.853H36.293l195.2-195.093c4.053-4.267,3.947-10.987-0.213-15.04
			c-4.16-3.947-10.667-3.947-14.827,0L3.12,248.45c-4.16,4.16-4.16,10.88,0,15.04l213.333,213.333
			c4.267,4.053,10.987,3.947,15.04-0.213c3.947-4.16,3.947-10.667,0-14.827l-195.2-195.2h464.96
			C507.76,266.583,512.88,260.717,511.813,254.103z"
                />
              </g>
            </g>
          </svg>
          Previous
        </button>
      </div>
      <div className="mx-auto flex items-center justify-center">
        <div className="inline-flex " role="toolbar">
          <button
            type="button"
            className={`rounded-l inline-block px-6 py-2.5 hover:bg-gray-100  text-black font-light text-base leading-tight uppercase transition duration-150 ease-in-out ${
              pageCount === 1 ? ' bg-gray-200' : ''
            } `}
            onClick={() => changePageCount(1)}
          >
            1
          </button>
          <button
            type="button"
            className={` inline-block px-6 py-2.5 hover:bg-gray-100  text-black font-light text-base leading-tight uppercase  transition duration-150 ease-in-out ${
              pageCount === 2 ? ' bg-gray-200' : ''
            } `}
            onClick={() => changePageCount(2)}
          >
            2
          </button>
          <button
            type="button"
            className={` inline-block px-6 py-2.5 hover:bg-gray-100  text-black font-light text-base leading-tight uppercase  transition duration-150 ease-in-out ${
              pageCount === 3 ? ' bg-gray-200' : ''
            } `}
            onClick={() => changePageCount(3)}
          >
            3
          </button>
          <button
            type="button"
            className={` inline-block px-6 py-2.5 hover:bg-gray-100  text-black font-light text-base leading-tight uppercase  transition duration-150 ease-in-out ${
              pageCount === 4 ? ' bg-gray-200' : ''
            } `}
            onClick={() => changePageCount(4)}
          >
            4
          </button>
          <button
            type="button"
            className={`rounded-r inline-block px-6 py-2.5 hover:bg-gray-100  text-black font-light text-base leading-tight uppercase  transition duration-150 ease-in-out ${
              pageCount === 5 ? ' bg-gray-200' : ''
            } `}
            onClick={() => changePageCount(5)}
          >
            5
          </button>
        </div>
      </div>

      <div className="mr-5">
        <button
          id="dropdownActionButton"
          data-dropdown-toggle="dropdownAction"
          className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-base px-3 py-1.5 "
          type="button"
          disabled={pageCount >= 5}
          onClick={() => {
            changePageCount(pageCount + 1);
          }}
        >
          Next
          <svg
            className="ml-1"
            fill="#000000"
            height="11px"
            width="11px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 511.955 511.955"
            xmlSpace="preserve"
            transform="matrix(-1, 0, 0, 1, 0, 0)"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

            <g id="SVGRepo_iconCarrier">
              {' '}
              <g>
                {' '}
                <g>
                  {' '}
                  <path d="M511.813,254.103c-0.96-5.227-5.653-8.853-10.88-8.853H36.293l195.2-195.093c4.053-4.267,3.947-10.987-0.213-15.04 c-4.16-3.947-10.667-3.947-14.827,0L3.12,248.45c-4.16,4.16-4.16,10.88,0,15.04l213.333,213.333 c4.267,4.053,10.987,3.947,15.04-0.213c3.947-4.16,3.947-10.667,0-14.827l-195.2-195.2h464.96 C507.76,266.583,512.88,260.717,511.813,254.103z" />{' '}
                </g>{' '}
              </g>{' '}
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
