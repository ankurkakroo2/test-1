import "./SearchResults.css";

const SkillNames = ({ skills }) => {
  if (!Array.isArray(skills) || !skills?.length) return null;

  return (
    <div className="skills-name">
      {skills.map((skill) => skill?.name).join(", ")}
    </div>
  );
};

const Aliases = ({ aliases }) => {
  if (!Array.isArray(aliases) || !aliases?.length) return null;

  return (
    <>
      <span class="aliases-name">Similar names:</span>
      <div className="aliases-list">
        {aliases.map((alias) => alias).join(", ")}
      </div>
    </>
  );
};

const SearchResults = ({ title, results = [] }) => {
  if (!Array.isArray(results)) return null;

  return (
    <>
      <div className="results-count">
        {title} ({results.length})
      </div>
      <ul className="search-results">
        {results.map((role) => (
          <li key={role?.unique_id} className="single-result">
            <div className="role-name">{role?.name}</div>
            <SkillNames skills={role?.skills} />
            {/* <Aliases aliases={role?.aliases} /> */}
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchResults;
