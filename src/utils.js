import Fuse from "fuse.js";
import { rolesData, skillsData } from "./data";

const { rolesMap } = rolesData;
const { skillsMap } = skillsData;
export const searchUniverse = Object.values(rolesMap).map((role) => ({
  ...role,
  skills: role?.skill_ids?.map((skillId) => skillsMap[skillId])
  // keywords: [
  //   role.name,
  //   ...(role?.aliases ?? []),
  //   ...(role?.skill_ids ?? []).map((skillId) => skillsMap[skillId]?.name)
  // ]
}));

let fuse;
const fuseOptions = {
  includeScore: true,
  ignoreLocation: true,
  shouldSort: true,
  // findAllMatches: true,
  minMatchCharLength: 2,
  // matchAllTokens: true,
  threshold: 0.4,
  keys: ["name", "aliases", "skills.name"]
  // keys: ["keywords"]
};

const getSingletonFuse = () => {
  if (fuse) return fuse;
  fuse = new Fuse(searchUniverse, fuseOptions);
  return fuse;
};

const fuseSearch = (query) => {
  const fuse = getSingletonFuse();
  const results = fuse.search(query);
  // console.log(results);
  return results.map((result) => result.item);
};

export const getResults = (query) => {
  return fuseSearch(query);
};
