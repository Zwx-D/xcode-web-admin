import { Injectable } from "@angular/core";
import { FunctionVM, ListQueryParams } from "../type/list.module";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { ProjectService } from "./project.serivce";
import { FilesService } from "./files.service";
import { map } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class FunctionService {


    private listUrl = '/api/wxHomeFunction';
    private createUrl = '/api/wxHomeFunction';
    private deleteUrl = '/api/wxHomeFunction';
    private updateUrl = '/api/wxHomeFunction';

    constructor(private http: HttpClient, private projectService: ProjectService, private filesService: FilesService) {
    }


    getList(queryFilter: ListQueryParams) {
        return this.http.get(this.projectService.getBackendConfig().baseUrl + this.listUrl,
            { observe: 'response', params: this.projectService.buildHttpParams(queryFilter) })
            .pipe(
                map((response: HttpResponse<FunctionVM[]>) => {
                    const total = +(response.headers.get('X-Total-Count') || 0);
                    return {
                        data: this.transformFunctionVMToVMs(response.body) || [],
                        total: total
                    }
                })
            ).toPromise();
    }

    transformFunctionVMToVMs(vms: FunctionVM[]): any {
        vms.forEach(item => {
            item.linkUrl = this.filesService.previewImg(item.imageUuid);
            item.isShowTxt = item.isShow ? "是" : "否";
        })
        return vms;
    }

    create(data: FunctionVM): Promise<FunctionVM> {
        return this.http.post<FunctionVM>(this.projectService.getBackendConfig().baseUrl + this.createUrl, data).toPromise();
    }

    delete(uuid: string) {
        return this.http.delete(this.projectService.getBackendConfig().baseUrl + this.deleteUrl + `/${uuid}`).toPromise();
    }
    updateIshow(data: FunctionVM) {
        return this.http.put(this.projectService.getBackendConfig().baseUrl + this.updateUrl + `/${data.uuid}?isShow=` + !data.isShow, {}).toPromise();
    }

}