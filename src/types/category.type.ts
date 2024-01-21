export type CategoryAttributes = {
    id: number,
    label: string,
    labelpath: string | null,
    fullpath: string
};

export type FolderAttributes = {
    id: number,
    key?: number,
    label: string,
    children: Array<FolderAttributes>
}