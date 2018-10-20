import React from 'react';

const RepoList = (props) => (
  <div>
    {props.repos.map((repo) => {
      return <div key={repo.id}>Repo name: {repo.name} forks: {repo.forks}</div>
    })}
  </div>
)

export default RepoList;