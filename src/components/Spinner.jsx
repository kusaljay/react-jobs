import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  margin: '100px auto',
  display: 'block'
}

const Spinner = ({ loading }) => {
  return (
    <ClipLoader
      color= '#4338ca'
      loading={loading}
      cssOverride={override}
      size={100}
    />
  )
}

export default Spinner