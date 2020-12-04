import React from "react";

const RepoList = ({ repos }) => {
    return (
        repos && repos.length > 0 &&
        repos.map((repo) => {
            return (
                <div key={repo.id} className="shadow-sm p-3 mb-2 bg-white rounded">
                    {repo.name}
                </div>
            );
        })
    );
};

export default RepoList;
