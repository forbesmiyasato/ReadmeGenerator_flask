import React from "react";

const RepoList = ({ repos, onRepoSelect, selectedRepo }) => {
    console.log(selectedRepo)
    return (
        repos &&
        repos.length > 0 &&
        repos.map((repo) => {
            return (
                <div
                    key={repo.id}
                    className={
                        "shadow-sm p-3 mb-2 rounded " +
                        (repo.name === selectedRepo ? "bg-selected-repo" : "bg-white")
                    }
                    onClick={() => onRepoSelect(repo.name)}
                >
                    {repo.name}
                </div>
            );
        })
    );
};

export default RepoList;
