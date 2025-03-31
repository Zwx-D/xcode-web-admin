import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProjectService } from "./project.serivce";
import { FilesService } from "./files.service";
import { CommonResponse, ListQueryParams, PhotographyVM } from "../type/list.module";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class PhotographyService {

    private listUrl = '/api/photography';
    private createUrl = '/api/photography';
    private deleteUrl = '/api/photography';
    private updateUrl = '/api/photography';

    constructor(private http: HttpClient, private projectService: ProjectService, private filesService: FilesService) {
    }


    getPhotographyList(queryFilter: ListQueryParams): Promise<CommonResponse<PhotographyVM>> {
        return this.http.get(this.projectService.getBackendConfig().baseUrl + this.listUrl,
            { observe: 'response', params: this.projectService.buildHttpParams(queryFilter) })
            .pipe(
                map((response: HttpResponse<PhotographyVM[]>) => {
                    const total = +(response.headers.get('X-Total-Count') || 0);
                    return {
                        data: this.transformPhotographysToVMs(response.body) || [],
                        total: total
                    }
                })
            ).toPromise();
    }

    transformPhotographysToVMs(vms: PhotographyVM[]) {
        vms.forEach(item => {
            item.linkUrl = this.filesService.previewImg(item.imageUuid);
            item.isShowTxt = item.isShow ? "是" : "否";
        })
        return vms;
    }

    createPhotography(data: PhotographyVM): Promise<PhotographyVM> {
        return this.http.post<PhotographyVM>(this.projectService.getBackendConfig().baseUrl + this.createUrl, data).toPromise();
    }

    deletePhotography(uuid: string) {
        return this.http.delete(this.projectService.getBackendConfig().baseUrl + this.deleteUrl + `/${uuid}`).toPromise();
    }

    updateIshow(data: PhotographyVM) {
        return this.http.put(this.projectService.getBackendConfig().baseUrl + this.updateUrl + `/${data.uuid}?isShow=` + !data.isShow, {}).toPromise();
    }

}