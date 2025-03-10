export interface Tag {
  tagId: number,
  tagName: string,
  color: string
}

export const emptyTag: Tag = {
  tagId: 0,
  tagName: "",
  color: "000000"
}
