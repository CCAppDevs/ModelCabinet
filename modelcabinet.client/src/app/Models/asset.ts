import { Tag } from "./tag";

export interface Asset {
  assetId: number,
  name: string,
  path: string,
  dateCreation: Date,
  dateUpdated: Date,
  fileSize: number, 
  projectId: number,
  assetTags: AssetTag[]

  // Read-only property
  readonly assetTagNames: string[]
}

// Used to Match the structure in the backend
export interface AssetTag {
  assetId: number,
  tagId: number,
  asset: Asset,
  tag: Tag
}

export const emptyAsset: Asset = {
  assetId: 0,
  name: "",
  path: "",
  dateCreation: new Date("2025-03-10"),
  dateUpdated: new Date("2025-03-10"),
  fileSize: 0,
  projectId: 0,
  assetTags: [],
  get assetTagNames() { return []; }
}
