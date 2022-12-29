import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import Badge from '../Badge';
import Modal from '../Modal/Modal';
import Pagination from '../Pagination/Pagination';
import Toast from '../Toast/Toast';
import downloadCSV from '../utils';
import {CSVLink} from 'react-csv';

const Table = () => {
  const token = process.env.REACT_APP_API_KEY;

  const [pageCount, setPageCount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isNewUser, setisNewUser] = useState(false);
  const [editRowdata, setEditRowData] = useState({});
  const [sortByName, setSortByName] = useState(0);
  const [sortByStatus, setSortByStatus] = useState(0);
  const [tableData, setTableData] = useState<any[]>();

  //api call to fetch table data
  const {isLoading, data, isError, refetch} = useQuery(['user'], () =>
    axios
      .get(`https://gorest.co.in/public/v2/users?page=${pageCount}&per_page=7`)
      .then(res => res.data)
  );

  let errorMsg = '';
  if (isError) {
    errorMsg = 'Error in fetching table data';
  }

  function addNewUser() {
    setisNewUser(true);
    openModal({});
  }

  function closeModal() {
    setIsOpen(false);
    setisNewUser(false);
  }

  function openModal(e: any) {
    if (isNewUser === false) {
      setEditRowData(e);
    }
    setIsOpen(true);
  }

  const {mutate} = useMutation(deleteUser);

  async function deleteUser(id: number) {
    console.log('made delete api call');

    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };

    const response = await axios.delete(
      `https://gorest.co.in/public/v2/users/${id}`,
      config
    );
    if (response) {
      window.alert('User Deleted');
    }
    closeModal();
  }

  function deleteBtnClick(id: number) {
    if (confirm(`Delete this user ${id}`)) {
      mutate(id);
    } else return;
  }

  useEffect(() => {
    refetch();
  }, [pageCount]);

  useEffect(() => {
    if (sortByName === 0) {
      setTableData(data);
    } else if (sortByName === 1) {
      const ascByName = [...data].sort((a, b) => (a.name > b.name ? 1 : -1));
      setTableData(ascByName);
    } else if (sortByName === 2) {
      const descByName = [...data].sort((a, b) => (a.name > b.name ? -1 : 1));
      setTableData(descByName);
    }
  }, [sortByName, isLoading, data]);

  useEffect(() => {
    if (sortByStatus === 0) {
      setTableData(data);
    } else if (sortByStatus === 1) {
      const ascByStatus = [...data].sort((a, b) =>
        a.status > b.status ? 1 : -1
      );
      setTableData(ascByStatus);
    } else if (sortByStatus === 2) {
      const descByStatus = [...data].sort((a, b) =>
        a.status > b.status ? -1 : 1
      );
      setTableData(descByStatus);
    }
  }, [sortByStatus, isLoading, data]);

  //func to update sortByName useState values
  function sortMyTableByName() {
    if (sortByName === 0) {
      setSortByName(1);
    } else if (sortByName === 1) {
      setSortByName(2);
    }
    if (sortByName === 2) {
      setSortByName(0);
    }
  }

  //func to update sortByStatus useState values
  function sortMyTableByStatus() {
    if (sortByStatus === 0) {
      setSortByStatus(1);
    } else if (sortByStatus === 1) {
      setSortByStatus(2);
    }
    if (sortByStatus === 2) {
      setSortByStatus(0);
    }
  }

  return (
    <div className="flex flex-col w-full justify-center items-center">
      {isError && <Toast toastType={'error'} toastMessage={errorMsg} />}
      <div className=" w-4/5 flex">
        <div className="flex mt-3 items-center justify-center">
          <div
            className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg"
            role="group"
          >
            <button
              type="button"
              className="rounded-l inline-block px-6 py-2.5 border border-gray-200 bg-white text-black font-medium text-sm leading-tight uppercase hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-0 active:bg-gray-300 transition duration-150 ease-in-out"
              onClick={sortMyTableByStatus}
            >
              General
            </button>
            <button
              type="button"
              className=" inline-block px-6 py-2.5 bg-white border border-gray-200 text-black font-medium text-sm leading-tight uppercase hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-0 active:bg-gray-300 transition duration-150 ease-in-out"
            >
              Users
            </button>
            <button
              type="button"
              className=" inline-block px-6 py-2.5 bg-white border border-gray-200 text-black font-medium text-sm leading-tight uppercase hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-0 active:bg-gray-300 transition duration-150 ease-in-out"
            >
              Plan
            </button>
            <button
              type="button"
              className=" inline-block px-6 py-2.5 bg-white border border-gray-200 text-black font-medium text-sm leading-tight uppercase hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-0 active:bg-gray-300 transition duration-150 ease-in-out"
            >
              Billing
            </button>
            <button
              type="button"
              className=" rounded-r inline-block px-6 py-2.5 bg-white border border-gray-200 text-black font-medium text-sm leading-tight uppercase hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-0 active:bg-gray-300 transition duration-150 ease-in-out"
            >
              Integrations
            </button>
          </div>
        </div>
      </div>
      <div className="w-4/5 mt-7 mb-5 bg-white sm:rounded-lg">
        {isOpen && (
          <Modal
            closeModal={closeModal}
            isOpen={isOpen}
            isNewUser={isNewUser}
            rowData={editRowdata}
          />
        )}
        {tableData && (
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <div className="flex mx-5 pt-5 justify-between items-center py-2 ">
              <div className="text-left text-gray-700">
                <div className="flex justify-start items-center">
                  <h2 className="font-semibold text-2xl mb-2 mr-3">Users</h2>
                  <span className="text-xs inline-block py-1 px-2.5 relative text-green-700 -top-1 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-200 rounded-full">
                    20 Users
                  </span>
                </div>
                <p>
                  Manage your team members and their account permissions here.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div>
                  <CSVLink
                    id="dropdownActionButton"
                    data-dropdown-toggle="dropdownAction"
                    className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 "
                    type="button"
                    // onClick={downloadCSV}
                    {...downloadCSV(tableData)}
                  >
                    <span className="">
                      <svg
                        className="w-4 h-4 mr-2 "
                        fill="#000000"
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_iconCarrier">
                          <path d="M925.996 290.081c0-158.009-128.099-286.108-286.108-286.108-107.769 0-204.478 60.153-253.292 153.002-18.809-5.53-38.425-8.383-58.404-8.383-114.51 0-207.342 92.828-207.342 207.342 0 14.461 1.517 28.761 4.48 42.758C54.005 433.235 6.951 505.805 6.951 587.369c0 115.989 93.954 209.944 209.861 209.944h108.756c13.001 0 23.54-10.539 23.54-23.54s-10.539-23.54-23.54-23.54H216.812c-89.905 0-162.781-72.875-162.781-162.781 0-69.042 43.396-129.725 107.314-152.93 11.909-4.323 18.26-17.296 14.371-29.353-5.135-15.92-7.785-32.439-7.785-49.235 0-88.512 71.753-160.262 160.262-160.262 21.352 0 42.118 4.203 61.468 12.258 11.895 4.951 25.56-.58 30.662-12.41 37.502-86.957 123.242-144.467 219.566-144.467 132.007 0 239.027 107.021 239.027 239.027 0 39.501-9.605 77.572-27.731 111.759-6.666 12.572-.739 28.139 12.601 33.094 63.333 23.525 106.183 83.913 106.183 152.437 0 89.988-72.875 162.863-162.781 162.863h-99.093c-13.001 0-23.54 10.539-23.54 23.54s10.539 23.54 23.54 23.54h99.093c115.907 0 209.861-93.954 209.861-209.861 0-79.728-44.869-150.836-113.463-186.302 14.698-34.815 22.409-72.403 22.409-111.07z"></path>
                          <path d="M496.7 647.833v296.218c0 13.001 10.539 23.54 23.54 23.54s23.54-10.539 23.54-23.54V647.833c0-13.001-10.539-23.54-23.54-23.54s-23.54 10.539-23.54 23.54z"></path>
                          <path d="M404.321 910.558l97.88 97.88c9.193 9.193 24.098 9.193 33.291 0s9.193-24.098 0-33.291l-97.88-97.88c-9.193-9.193-24.098-9.193-33.291 0s-9.193 24.098 0 33.291z"></path>
                          <path d="M602.869 879.663l-97.88 97.88c-9.193 9.193-9.193 24.098 0 33.291s24.098 9.193 33.291 0l97.88-97.88c9.193-9.193 9.193-24.098 0-33.291s-24.098-9.193-33.291 0z"></path>
                        </g>
                      </svg>
                    </span>
                    Download CSV
                  </CSVLink>
                </div>
                <div className="ml-2 w-fit" onClick={addNewUser}>
                  <button
                    id="dropdownActionButton"
                    data-dropdown-toggle="dropdownAction"
                    className="inline-flex items-center bg-blue-500 text-white border border-gray-300 focus:outline-none hover:bg-blue-50-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 "
                    type="button"
                  >
                    <span className="">
                      <svg
                        className="w-3 h-3 mr-2"
                        fill="#ffffff"
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 45.402 45.402"
                        xmlSpace="preserve"
                        stroke="#ffffff"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_iconCarrier">
                          {' '}
                          <g>
                            {' '}
                            <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"></path>{' '}
                          </g>{' '}
                        </g>
                      </svg>
                    </span>
                    Add User
                  </button>
                </div>
              </div>
            </div>
            <hr className="my-1 border-gray-300" />
            <table className="w-full text-sm text-left text-gray-500 sm:rounded-lg">
              <thead className="text-sm text-gray-700 uppercase bg-gray-50  ">
                <tr>
                  <th
                    scope="col"
                    className="py-2 w-full px-6 flex justify-start"
                  >
                    Name
                    <span
                      className="ml-2 cursor-pointer"
                      onClick={sortMyTableByName}
                    >
                      {sortByName === 0 ? (
                        <svg
                          className="w-4 h-4"
                          fill="#000000"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g id="SVGRepo_iconCarrier">
                            <path d="M17,14 C17.8092996,14 18.2680938,14.9010044 17.836059,15.5493995 L17.7682213,15.6401844 L12.7682213,21.6401844 C12.3950792,22.0879549 11.7283228,22.1178063 11.3160321,21.7297385 L11.2317787,21.6401844 L6.23177872,15.6401844 C5.71367776,15.0184632 6.11213562,14.0891988 6.88682851,14.0060047 L7,14 L17,14 Z M11.2317787,2.3598156 C11.6049208,1.91204508 12.2716772,1.88219371 12.6839679,2.2702615 L12.7682213,2.3598156 L17.7682213,8.3598156 C18.2863222,8.98153675 17.8878644,9.91080124 17.1131715,9.99399528 L17,10 L7,10 C6.19070043,10 5.73190618,9.09899556 6.16394105,8.45060047 L6.23177872,8.3598156 L11.2317787,2.3598156 Z"></path>
                          </g>
                        </svg>
                      ) : sortByName === 1 ? (
                        <svg
                          className="w-4 h-4"
                          fill="#000000"
                          viewBox="0 0 14 14"
                          role="img"
                          focusable="false"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          transform="matrix(1, 0, 0, -1, 0, 0)"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g id="SVGRepo_iconCarrier">
                            <path d="m 11.363635,8.636363 c 0,0.147728 -0.05398,0.275569 -0.16193,0.383523 l -3.81818,3.818182 C 7.2755717,12.946023 7.1477317,13 7.000005,13 6.8522783,13 6.724435,12.946023 6.616475,12.838068 L 2.798295,9.019886 C 2.6903417,8.911932 2.636365,8.784091 2.636365,8.636363 c 0,-0.1477267 0.053977,-0.2755673 0.16193,-0.383522 0.1079533,-0.1079547 0.2357933,-0.161932 0.38352,-0.161932 l 7.63637,0 c 0.147727,0 0.275567,0.053977 0.38352,0.161932 0.107953,0.1079547 0.16193,0.2357953 0.16193,0.383522 z"></path>
                          </g>
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4"
                          fill="#000000"
                          viewBox="0 0 14 14"
                          role="img"
                          focusable="false"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g id="SVGRepo_iconCarrier">
                            <path d="m 11.363635,8.636363 c 0,0.147728 -0.05398,0.275569 -0.16193,0.383523 l -3.81818,3.818182 C 7.2755717,12.946023 7.1477317,13 7.000005,13 6.8522783,13 6.724435,12.946023 6.616475,12.838068 L 2.798295,9.019886 C 2.6903417,8.911932 2.636365,8.784091 2.636365,8.636363 c 0,-0.1477267 0.053977,-0.2755673 0.16193,-0.383522 0.1079533,-0.1079547 0.2357933,-0.161932 0.38352,-0.161932 l 7.63637,0 c 0.147727,0 0.275567,0.053977 0.38352,0.161932 0.107953,0.1079547 0.16193,0.2357953 0.16193,0.383522 z"></path>
                          </g>
                        </svg>
                      )}
                    </span>
                  </th>
                  <th scope="col" className="py-2  px-3">
                    Gender
                  </th>
                  <th scope="col" className="py-2 flex px-3">
                    Status
                    <span
                      className="ml-2 cursor-pointer"
                      onClick={sortMyTableByStatus}
                    >
                      {sortByStatus === 0 ? (
                        <svg
                          className="w-4 h-4"
                          fill="#000000"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g id="SVGRepo_iconCarrier">
                            <path d="M17,14 C17.8092996,14 18.2680938,14.9010044 17.836059,15.5493995 L17.7682213,15.6401844 L12.7682213,21.6401844 C12.3950792,22.0879549 11.7283228,22.1178063 11.3160321,21.7297385 L11.2317787,21.6401844 L6.23177872,15.6401844 C5.71367776,15.0184632 6.11213562,14.0891988 6.88682851,14.0060047 L7,14 L17,14 Z M11.2317787,2.3598156 C11.6049208,1.91204508 12.2716772,1.88219371 12.6839679,2.2702615 L12.7682213,2.3598156 L17.7682213,8.3598156 C18.2863222,8.98153675 17.8878644,9.91080124 17.1131715,9.99399528 L17,10 L7,10 C6.19070043,10 5.73190618,9.09899556 6.16394105,8.45060047 L6.23177872,8.3598156 L11.2317787,2.3598156 Z"></path>
                          </g>
                        </svg>
                      ) : sortByStatus === 1 ? (
                        <svg
                          className="w-4 h-4"
                          fill="#000000"
                          viewBox="0 0 14 14"
                          role="img"
                          focusable="false"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          transform="matrix(1, 0, 0, -1, 0, 0)"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g id="SVGRepo_iconCarrier">
                            <path d="m 11.363635,8.636363 c 0,0.147728 -0.05398,0.275569 -0.16193,0.383523 l -3.81818,3.818182 C 7.2755717,12.946023 7.1477317,13 7.000005,13 6.8522783,13 6.724435,12.946023 6.616475,12.838068 L 2.798295,9.019886 C 2.6903417,8.911932 2.636365,8.784091 2.636365,8.636363 c 0,-0.1477267 0.053977,-0.2755673 0.16193,-0.383522 0.1079533,-0.1079547 0.2357933,-0.161932 0.38352,-0.161932 l 7.63637,0 c 0.147727,0 0.275567,0.053977 0.38352,0.161932 0.107953,0.1079547 0.16193,0.2357953 0.16193,0.383522 z"></path>
                          </g>
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4"
                          fill="#000000"
                          viewBox="0 0 14 14"
                          role="img"
                          focusable="false"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g id="SVGRepo_iconCarrier">
                            <path d="m 11.363635,8.636363 c 0,0.147728 -0.05398,0.275569 -0.16193,0.383523 l -3.81818,3.818182 C 7.2755717,12.946023 7.1477317,13 7.000005,13 6.8522783,13 6.724435,12.946023 6.616475,12.838068 L 2.798295,9.019886 C 2.6903417,8.911932 2.636365,8.784091 2.636365,8.636363 c 0,-0.1477267 0.053977,-0.2755673 0.16193,-0.383522 0.1079533,-0.1079547 0.2357933,-0.161932 0.38352,-0.161932 l 7.63637,0 c 0.147727,0 0.275567,0.053977 0.38352,0.161932 0.107953,0.1079547 0.16193,0.2357953 0.16193,0.383522 z"></path>
                          </g>
                        </svg>
                      )}
                    </span>
                  </th>
                  <th scope="col" className="py-2 px-3">
                    Last Login
                  </th>
                  <th scope="col" className="py-2 px-3"></th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((e: any) => (
                  <tr
                    key={e.id}
                    className="bg-white border-b hover:bg-gray-50 "
                  >
                    <th
                      scope="row"
                      className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap "
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src="https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916__340.png"
                        alt="Profile image"
                      />
                      <div className="pl-3">
                        <div className="text-base font-semibold">{e.name}</div>
                        <div className="font-normal text-gray-500">
                          {e.email}
                        </div>
                      </div>
                    </th>
                    <td className="py-4 px-3">{e.gender}</td>
                    <td className="py-4 px-3 ">
                      {e.status === 'active' ? (
                        <Badge isActive={true} />
                      ) : (
                        <Badge isActive={false} />
                      )}
                    </td>
                    <td className="py-4 px-3">
                      Jun 20 , 2022
                      <br />
                      04:23PM
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex">
                        <span
                          className="mr-3 p-2"
                          onClick={() => deleteBtnClick(e.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </span>

                        <span
                          className="mr-2 hover:bg-gray-100 p-2"
                          onClick={() => openModal(e)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination changePageCount={setPageCount} pageCount={pageCount} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
