
import { useNavigate } from 'react-router-dom';
import { Badge } from './ui/badge'

import PropTypes from 'prop-types';



const LatestJobCards = ({ job = {} }) => {
  const navigate=useNavigate();
  LatestJobCards.propTypes = {
    job: PropTypes.shape({
      company: PropTypes.shape({
        name: PropTypes.string,
      }),
      title: PropTypes.string,
      description: PropTypes.string,
      position: PropTypes.number,
      jobType: PropTypes.string,
      salary: PropTypes.number,
    }).isRequired, // This marks the `job` prop as required
  };
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
      <div>
        <h1 className='font-medium text-lg'>{job.company?.name || 'Company Name'}</h1>
        <p className='text-sm text-gray-600'>India</p>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job.title || 'Job Title'}</h1>
        <p className='text-sm text-gray-600'>{job.description || 'Job Description'}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className={'text-blue-700 font-bold'} variant='ghost'>
          {job.position ? `${job.position} positions` : 'Position Info'}
        </Badge>
        <Badge className={'text-[#F83002] font-bold'} variant='ghost'>
          {job.jobType || 'Job Type'}
        </Badge>
        <Badge className={'text-[#7209b7] font-bold'} variant='ghost'>
          {job.salary ? `${job.salary} LPA` : 'Salary Info'}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards
