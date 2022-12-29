import {Dialog, Transition} from '@headlessui/react';
import axios from 'axios';
import React, {FC, useEffect, useState} from 'react';
import {Fragment, InputHTMLAttributes} from 'react';
import {useMutation} from 'react-query';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  closeModal: any;
  isOpen: boolean;
  isNewUser: boolean;
  rowData: any;
}

const Modal: FC<Props> = ({closeModal, isOpen, isNewUser, rowData}) => {
  const token = process.env.REACT_APP_API_KEY;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');

  const {mutate} = useMutation(addUser);

  async function addUser() {
    console.log('made post api call');

    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };

    const response = await axios.post(
      'https://gorest.co.in/public/v2/users',
      {
        name,
        email,
        gender,
        status,
      },
      config
    );
    if (response) {
      window.alert(`User added with id ${response.data.id}`);
    }
    closeModal();
  }

  const onAddBtnClick = () => {
    if (!name || !gender || !email || !status) {
      window.alert('All fields are required');
      return;
    }
    mutate();
  };

  async function edituser() {
    console.log('made patch api call');

    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const response = await axios.put(
      `https://gorest.co.in/public/v2/users/${rowData.id}`,
      {
        name,
        email,
        gender,
        status,
      },
      config
    );
    if (response) {
      window.alert(`User data changed with id ${response.data.id}`);
    }
    closeModal();
  }

  useEffect(() => {
    if (!isNewUser) {
      setName(rowData.name);
      setEmail(rowData.email);
      setGender(rowData.gender);
      setStatus(rowData.status);
    }
    console.log('useefect');
  }, []);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="block p-6 rounded-lg bg-white max-w-md">
                    <form>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="form-group mb-6">
                          <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-basefont-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="nameInput"
                            placeholder="Name"
                            value={name}
                            required
                            onChange={e => setName(e.target.value)}
                          />
                        </div>
                        <div className="form-group mb-6">
                          <select
                            className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Select Gender"
                            required
                            value={gender}
                            disabled={!isNewUser}
                            onChange={e => setGender(e.target.value)}
                          >
                            <option disabled value="">
                              Select Gender
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group mb-6">
                        <input
                          type="email"
                          className="form-control block w-full px-3 py-1.5 text-basefont-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="emailInput"
                          placeholder="Email address"
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group mb-6">
                        <select
                          className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          aria-label="Select Status"
                          required
                          value={status}
                          disabled={!isNewUser}
                          onChange={e => setStatus(e.target.value)}
                        >
                          <option disabled value="">
                            {' '}
                            Select Status
                          </option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                      {isNewUser === true ? (
                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={onAddBtnClick}
                          >
                            Add User
                          </button>
                        </div>
                      ) : (
                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={edituser}
                          >
                            Save Changes
                          </button>
                        </div>
                      )}
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
