import { BaseEntity } from "./base.type";

export interface Files {

    downloadUrl: string;

    id: number;

    name: string;

    filePath: string;

    uuid: string;

}



export interface FileInfoVM extends BaseEntity {
    id: number;

    name: string;

    filePath: string;
}


export interface FolderVM extends BaseEntity {

    id: number;

    name: string;

}