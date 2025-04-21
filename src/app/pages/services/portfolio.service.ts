import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProjectService } from "./project.serivce";
import { CommonResponse, ListQueryParams, PortfolioVM } from "../type/list.module";
import { map } from "rxjs/operators";
import { FilesService } from "./files.service";


@Injectable({
    providedIn: 'root'
})
export class PortfolioService {


    private listUrl: string = '/api/portfolio';

    private createUrl: string = '/api/portfolio'

    constructor(private http: HttpClient, private projectService: ProjectService, private filesService: FilesService) {
    }

    getList(queryFilter: ListQueryParams): Promise<CommonResponse<PortfolioVM>> {
        return this.http.get(this.projectService.getBackendConfig().baseUrl + this.listUrl,
            { observe: 'response', params: this.projectService.buildHttpParams(queryFilter) })
            .pipe(
                map((response: HttpResponse<PortfolioVM[]>) => {
                    const total = +(response.headers.get('X-Total-Count') || 0);
                    return {
                        data: this.transformPortfoliosToVMs(response.body) || [],
                        total: total
                    }
                })
            ).toPromise();
    }

    private transformPortfoliosToVMs(vms: PortfolioVM[]): any {
        vms.forEach(item => {
            item.linkUrl = this.filesService.previewImg(item.imageUuid);
            item.isShowTxt = item.isShow ? "是" : "否";
        })
        return vms;
    }

    createPortfolio(data: PortfolioVM): Promise<PortfolioVM> {
        return this.http.post<PortfolioVM>(this.projectService.getBackendConfig().baseUrl + this.createUrl, data).toPromise();
    }

}