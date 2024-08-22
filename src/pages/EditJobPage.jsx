import { useParams, useLoaderData, Link, useNavigate } from "react-router-dom";

const EditJobPage = () => {
  const job = useLoaderData();

  return (
    <div>{job.title}</div>
  )
}

export default EditJobPage