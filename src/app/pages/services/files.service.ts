import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProjectService } from "./project.serivce";
import { Files } from "../type/files.type";

@Injectable({
    providedIn: 'root'
})
export class UploadService {
    private uploadUrl = '/api/files/upload';
    private downloadUrl = '/api/files/download/';
    private previewImgUrl = '/api/files/download/';

    constructor(private http: HttpClient, private projectSerivce: ProjectService) { }

    uploadFile(file: File): Promise<Files> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<Files>(this.projectSerivce.backendConfig.baseUrl + this.uploadUrl, formData, {
            headers: {
                // 注意：不要设置 Content-Type 头部，让浏览器自动处理
                // 'Content-Type': 'multipart/form-data'
            }
        }).toPromise();
    }

    downFile(uuid: string) {
        return this.http.get(this.projectSerivce.backendConfig.baseUrl + this.downloadUrl + uuid + "?isDownload=true").toPromise();
    }

    previewImg(uuid: string) {
        return this.projectSerivce.backendConfig.baseUrl + this.previewImgUrl + uuid + "?isDownload=false"
    }


}