import { Asset } from "./asset";
import { Tag } from "./tag";

export interface Project {

  projectId: number,
  name: string,
  creationDate: Date,
  modifiedDate: Date,
  description: string,
  author: string,
  version: string,
  assets: Asset[],
  shortDescription: string,
  slug: string,
  projectTags: ProjectTag[]
}

// Used to Match the structure in the backend
export interface ProjectTag {
  projectId: number,
  tagId: number,
  project: Project,
  tag: Tag
}

export const emptyProject: Project = {
  projectId: 0,
  name: "",
  creationDate: new Date("2025-03-10"),
  modifiedDate: new Date("2025-03-10"),
  description: "",
  author: "",
  version: "0",
  assets: [],
  shortDescription: "",
  slug: "empty-project",
  projectTags: []
}
