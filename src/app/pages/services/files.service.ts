import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProjectService } from "./project.serivce";
import { FileInfoVM, Files, FolderVM } from "../type/files.type";
import { CommonResponse, ListQueryParams } from "../type/list.module";
import { map } from "rxjs/operators";
import { NzModalService } from "ng-zorro-antd";

const filesUrl = '/api/files/';
@Injectable({
    providedIn: 'root'
})
export class FilesService {
    private uploadUrl = filesUrl + 'upload';
    private downloadUrl = filesUrl + 'download/';
    private previewImgUrl = filesUrl + 'download/';
    private getfolderFilterUrl = filesUrl + 'findFolderByCriteria';
    private getFilesUrl = filesUrl + 'findFileInfoByCriteria';


    constructor(private http: HttpClient, private projectService: ProjectService, private modal: NzModalService) { }

    uploadFile(file: File): Promise<Files> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<Files>(this.projectService.backendConfig.baseUrl + this.uploadUrl, formData, {
            headers: {
                // 注意：不要设置 Content-Type 头部，让浏览器自动处理
                // 'Content-Type': 'multipart/form-data'
            }
        }).toPromise();
    }

    downFile(uuid: string) {
        return this.http.get(this.projectService.backendConfig.baseUrl + this.downloadUrl + uuid + "?isDownload=true").toPromise();
    }

    previewImg(uuid: string) {
        return this.projectService.backendConfig.baseUrl + this.previewImgUrl + uuid + "?isDownload=false"
    }

    getfolderFilter(): Promise<CommonResponse<FolderVM>> {
        return this.http.get(this.projectService.getBackendConfig().baseUrl + this.getfolderFilterUrl, { observe: 'response' })
            .pipe(
                map((response: HttpResponse<FolderVM[]>) => {
                    const total = +(response.headers.get('X-Total-Count') || 0);
                    return {
                        data: response.body || [],
                        total: total
                    }
                })
            ).toPromise();
    }



    getFiles(queryParams: ListQueryParams): Promise<CommonResponse<FileInfoVM>> {

        return this.http.get(this.projectService.getBackendConfig().baseUrl + this.getFilesUrl,
            { observe: 'response', params: this.buildHttpParams(queryParams) })
            .pipe(
                map((response: HttpResponse<FileInfoVM[]>) => {
                    const total = +(response.headers.get('X-Total-Count') || 0);
                    response.body.forEach(item => {
                        item.filePath = this.projectService.getBackendConfig().baseUrl + this.previewImgUrl + item.uuid + "?isDownload=false";
                    });
                    return {
                        data: response.body || [],
                        total: total
                    }
                })
            ).toPromise();
    }



    buildHttpParams(queryParams: ListQueryParams): HttpParams {
        const { page = 0, size = 10, ...params } = queryParams;

        let httpParams = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());

        // 动态添加其他查询条件
        Object.keys(params).forEach(key => {
            if (params[key] !== undefined && params[key] !== null) {
                httpParams = httpParams.set(key, params[key]);
            }
        });

        return httpParams;
    }


    previewImage(imageUrl: string): void {
        this.modal.create({
            nzContent: `<img 
          src="${this.previewImg(imageUrl)}" 
          style="width: 100%;"
          />`,
            nzFooter: null, // 不显示底部按钮
            nzWidth: '80%', // 调整放大图片的大小
            nzClosable: true, // 关闭按钮在内容区域，不显示默认关闭按钮
            nzMaskClosable: true, // 点击遮罩可关闭
            nzBodyStyle: { padding: '0', textAlign: 'center' }
        });
    }

}