import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useS3Upload } from 'next-s3-upload'
import 'react-toastify/dist/ReactToastify.min.css'
import { useDispatch } from 'react-redux'

export default function Audition () {
  const [loading, setLoading] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setphoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [videoUrl, setVideoUrl] = useState()
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload()
  const [dataSave, setdataSave] = useState(true)
  const [paymentSuccess, setpaymentSuccess] = useState(undefined)

  const dispatch = useDispatch()

  function randomInteger (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  const isInputNumber = e => {
    let ch = String.fromCharCode(e.which)
    if (!/[0-9]/.test(ch)) {
      e.preventDefault()
    }
  }
  const isAgeNumber = e => {
    if (e > 16 && e > 30) {
      e.preventDefault()
    }
  }

  const id = String(randomInteger(10000, 99999))

  let handleFileChange = async file => {
    setLoading('loading')
    let { url } = await uploadToS3(file)
    setVideoUrl(url)
    setLoading('done')
    console.log(url)
  }
  const router = useRouter()
  const setFromStorage = () => {
    dispatch({
      type: 'GET_UPDATE',
      payload: { name, email, phoneNumber, videoUrl, age, address, gender }
    })
    dispatch({
      type: 'GET_UPDATE_PAYMENT',
      payload: { payment: false }
    })

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email)
      window.localStorage.setItem('phoneNumber', phoneNumber)
      window.localStorage.setItem('gender', gender)
      window.localStorage.setItem('age', age)
      window.localStorage.setItem('videoUrl', videoUrl)
      window.localStorage.setItem('address', address)
      window.localStorage.setItem('payment', 'Not Done')
      window.localStorage.setItem('saveData', 'Not done')
    }
    router.push({
      pathname: '/checkout'
    })
  }

  if (paymentSuccess == undefined) {
    return (
      <>
        <div className="py-20 space-y-10 px-10 lg:px-80 text-gray-100 text-lg bg-[url('../images/bg.jpg')]">
          <h2 className='text-3xl font-semibold border-b-4 border-indigo-500 text-center py-3'>
            Audition Form
          </h2>
          <p className='text-justify md:text-center'>
            Big Art Has Brought You A Golden Opportunity. We Have Come Up With A
            New Concept In 2022 - 23 This Year. The Total Price List Is 2.25
            Lakhs. This Session Will Be Completed In Three Months.
          </p>
          <div className='font-semibold'>
            <p className='py-1'>
              {' '}
              1. The First And Second Round Will Be Conducted Online Only.{' '}
            </p>
            <p className='py-1'>
              2. The Final Round Will Take Place In Front Of The Judges.{' '}
            </p>
            <p className='py-1'>
              3. The First Three Winners In The Final Round Will Be Awarded
              According To The Winning List.{' '}
            </p>
          </div>
          <p>
            Now, You Can Fill The Form, Will Be Mentioning The Details Below.{' '}
          </p>

          <p>
            If You Think You Are A Good Singer Then You Can Give This Audition.
            This Audition Process Is Online
          </p>

          <div className='bg-gray-100 md:p-10 p-4 rounded'>
            <h3 className='text-gray-900 text-center mb-10 font-bold tracking-wider'>
              Kindly Fill The Fom , Upload Your{' '}
              <span className='text-indigo-900'>Singing Talent</span> and Submit
            </h3>
            <div className='grid xl:grid-cols-1 xl:gap-6'>
              <div className='relative z-0 w-full mb-6 group'>
                <input
                  type='text'
                  name='name'
                  id='floating_first_name'
                  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer'
                  placeholder=' '
                  required=''
                  onChange={e => setName(e.target.value)}
                />
                <label
                  htmlFor='floating_first_name'
                  className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                >
                  Name
                </label>
              </div>
              <div className='relative z-0 w-full mb-6 group'>
                <input
                  type='email'
                  name='floating_email'
                  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer'
                  placeholder=' '
                  required='Email is required'
                  onChange={e => setEmail(e.target.value)}
                />
                <label
                  htmlFor='floating_email'
                  className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                >
                  Email address
                </label>
              </div>
            </div>
            <div className='grid xl:grid-cols-1 xl:gap-6'>
              <div className='relative z-0 w-full mb-6 group'>
                <input
                  type='tel'
                  pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                  name='phone'
                  id='floating_phone'
                  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer'
                  placeholder=' '
                  required='Enter Number Only'
                  maxLength={10}
                  onKeyPress={isInputNumber}
                  onChange={e => {
                    const limit = 10
                    setphoneNumber(e.target.value.slice(0, limit))
                  }}
                />
                <label
                  htmlFor='floating_phone'
                  className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                >
                  Phone Number
                </label>
              </div>
              <div className='relative z-0 w-full mb-6 group'>
                <input
                  type='text'
                  name='address'
                  id='floating_company'
                  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer'
                  placeholder=' '
                  required=''
                  onChange={e => setAddress(e.target.value)}
                />
                <label
                  htmlFor='floating_company'
                  className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                >
                  Address
                </label>
              </div>
              <div className='relative z-0 w-full mb-6 group'>
                <select
                  type='text'
                  name='floating_company'
                  id='floating_company'
                  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer'
                  placeholder=' '
                  required=''
                  onChange={e => setGender(e.target.value)}
                >
                  <option defaultValue={'gender'}>Choose Gender</option>
                  <option value={'male'}>Male</option>
                  <option value={'female'}>Female</option>
                  <option value={'transgender'}>TransGender</option>
                </select>
                <label
                  htmlFor='floating_company'
                  className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                >
                  Gender
                </label>
              </div>
              <div className='relative z-0 w-full mb-6 group'>
                <input
                  type='number'
                  name='age'
                  id='floating_company'
                  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer'
                  placeholder=' '
                  required
                  min='16'
                  max='30'
                  // onKeyPress={isAgeNumber(event)}
                  onChange={e => setAge(e.target.value)}
                />
                <label
                  htmlFor='floating_company'
                  className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                >
                  Age
                </label>
              </div>
            </div>

            <FileInput onChange={handleFileChange} />
            <div className='relative z-0 w-full mb-6 group'>
              {!loading ? (
                <>
                  <button
                    disabled={
                      !name || !email || !age || !address || !phoneNumber
                    }
                    className='inline-block align-middle m-auto table text-white text-center bg-indigo-800 hover:bg-indigo-850 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto md:px-20 px-10 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 disabled:cursor-not-allowed disabled:bg-gray-500'
                    title='Kindly Fill The Above Fields'
                    onClick={openFileDialog}
                  >
                    Upload Video (Any Song by You)
                  </button>
                </>
              ) : (
                <div className='flex justify-center'>
                  <div
                    className={`flex p-4 mb-4 text-sm text-yellow-700 ${
                      loading == 'done'
                        ? 'text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800'
                        : 'bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800'
                    }  w-1/2`}
                    role='alert'
                  >
                    <svg
                      className='inline flex-shrink-0 mr-3 w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <div>
                      <span className='font-medium'>Video Upload Status </span>
                      {loading
                        ? loading == 'done'
                          ? 'Video upload done'
                          : 'Uploading a video '
                        : 'Please upload Your Voice video'}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              disabled={
                !name || !email || !age || !address || !phoneNumber || !videoUrl
              }
              onClick={setFromStorage}
              className='inline-block align-middle m-auto table text-white text-center bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 disabled:cursor-not-allowed disabled:bg-gray-500'
              title='Kindly Fill The Above Fields'
            >
              Submit
            </button>
          </div>
        </div>
      </>
    )
  }
}
