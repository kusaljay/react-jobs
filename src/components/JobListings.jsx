import { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');

  const sortJobs = (jobs, sortBy) => {
    const sortedJobs = [...jobs];
    
    switch (sortBy) {
      case 'newest':
        return sortedJobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return sortedJobs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'salary-high':
        return sortedJobs.sort((a, b) => parseInt(b.salary) - parseInt(a.salary));
      case 'salary-low':
        return sortedJobs.sort((a, b) => parseInt(a.salary) - parseInt(b.salary));
      case 'closing-soon':
        return sortedJobs.sort((a, b) => new Date(a.applicationClosingDate) - new Date(b.applicationClosingDate));
      case 'title-az':
        return sortedJobs.sort((a, b) => a.title.localeCompare(b.title));
      case 'title-za':
        return sortedJobs.sort((a, b) => b.title.localeCompare(a.title));
      case 'company-az':
        return sortedJobs.sort((a, b) => a.company.name.localeCompare(b.company.name));
      case 'company-za':
        return sortedJobs.sort((a, b) => b.company.name.localeCompare(a.company.name));
      default:
        return sortedJobs;
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const result = await fetch('/api/jobs');
        const data = await result.json();
        setJobs(data);
      } catch (error) {
        console.log(`Error fetching data ${error}`);
      } finally {
        setLoading(false);
      } 
    }
    
    fetchJobs();
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Browse Jobs
        </h2>

        {!isHome && !loading && (
          <div className="mb-6 flex items-center justify-end">
            <select
              className="p-2 rounded border"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="salary-high">Highest Salary</option>
              <option value="salary-low">Lowest Salary</option>
              <option value="closing-soon">Closing Soon</option>
              <option value="title-az">Title (A-Z)</option>
              <option value="title-za">Title (Z-A)</option>
              <option value="company-az">Company (A-Z)</option>
              <option value="company-za">Company (Z-A)</option>
            </select>
          </div>
        )}

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sortJobs(isHome ? jobs.slice(0, 3) : jobs, sortBy).map((job) => (
              <JobListing job={job} key={job.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default JobListings