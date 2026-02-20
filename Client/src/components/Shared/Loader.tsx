import { Spinner } from '../ui/spinner'

const Loader = ({text='Loading....'}) => {
  return (
    <div className='w-full h-screen flex justify-center items-center overflow-hidden'>
        <Spinner/>
        <p className='text-gray-400'>{text}</p>
    </div>
  )
}

export default Loader