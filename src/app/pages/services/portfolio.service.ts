import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProjectService } from "./project.serivce";
import { CommonResponse, ListQueryParams, PortfolioItemVM, PortfolioVM } from "../type/list.module";
import { map } from "rxjs/operators";
import { FilesService } from "./files.service";
import { CreatePortfolioItemDTO } from "../type/portfolio.type";


@Injectable({
    providedIn: 'root'
})
export class PortfolioService {

    private portfolioUrl: string = '/api/portfolio';

    private portfolioItemUrl: string = '/api/portfolioItem';

    private changeItemIsShowUrl: string = this.portfolioItemUrl + '/changeIsShow/';

    private changeIsShowUrl: string = this.portfolioUrl + '/changeIsShow/';

    constructor(private http: HttpClient, private projectService: ProjectService, private filesService: FilesService) {
    }

    getList(queryFilter: ListQueryParams): Promise<CommonResponse<PortfolioVM>> {
        return this.http.get(this.projectService.getBackendConfig().baseUrl + this.portfolioUrl,
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

    getItemList(queryFilter: ListQueryParams): Promise<CommonResponse<PortfolioItemVM>> {
        return this.http.get(this.projectService.getBackendConfig().baseUrl + this.portfolioItemUrl,
            { observe: 'response', params: this.projectService.buildHttpParams(queryFilter) })
            .pipe(
                map((response: HttpResponse<PortfolioItemVM[]>) => {
                    const total = +(response.headers.get('X-Total-Count') || 0);
                    return {
                        data: this.transformPortfolioItemToVMs(response.body) || [],
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

    private transformPortfolioItemToVMs(vms: PortfolioItemVM[]): any {
        vms.forEach(item => {
            item.linkUrl = this.filesService.previewImg(item.imageUuid);
            item.isShowTxt = item.isShow ? "是" : "否";
        })
        return vms;
    }

    createPortfolio(data: PortfolioVM): Promise<PortfolioVM> {
        return this.http.post<PortfolioVM>(this.projectService.getBackendConfig().baseUrl + this.portfolioUrl, data).toPromise();
    }

    changeIsShow(uuid: string, isShow: boolean): Promise<void> {
        return this.http.get<void>(this.projectService.getBackendConfig().baseUrl + this.changeIsShowUrl + uuid, {
            params: {
                isShow: isShow + ""
            }
        }).toPromise();
    }

    delete(uuid: any): Promise<void> {
        return this.http.delete<void>(this.projectService.getBackendConfig().baseUrl + this.portfolioUrl + "/" + uuid).toPromise();
    }

    createPortfolioItem(data: CreatePortfolioItemDTO): Promise<void> {
        return this.http.post<void>(this.projectService.getBackendConfig().baseUrl + this.portfolioItemUrl, data).toPromise();
    }

    findOneByUuid(uuid: string): Promise<PortfolioVM> {
        return this.http.get<PortfolioVM>(this.projectService.getBackendConfig().baseUrl + this.portfolioUrl + uuid).toPromise();
    }

    changeItemIsShow(uuid: string, isShow: boolean): Promise<void> {
        return this.http.get<void>(this.projectService.getBackendConfig().baseUrl + this.changeItemIsShowUrl + uuid, {
            params: {
                isShow: isShow + ""
            }
        }).toPromise();
    }

    deletePortfolioItem(uuid: any): Promise<void> {
        return this.http.delete<void>(this.projectService.getBackendConfig().baseUrl + this.portfolioItemUrl + "/" + uuid).toPromise();
    }



}