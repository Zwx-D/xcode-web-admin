import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProjectService } from "./project.serivce";
import { CommonResponse, ListQueryParams, PortfolioTagVM } from "../type/list.module";
import { map } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class PortfolioTagService {



    private portfolioUrl: string = '/api/portfolioTag';



    constructor(private http: HttpClient, private projectService: ProjectService) {
    }

    getList(queryFilter: ListQueryParams): Promise<CommonResponse<PortfolioTagVM>> {
        return this.http.get(this.projectService.getBackendConfig().baseUrl + this.portfolioUrl,
            { observe: 'response', params: this.projectService.buildHttpParams(queryFilter) })
            .pipe(
                map((response: HttpResponse<PortfolioTagVM[]>) => {
                    const total = +(response.headers.get('X-Total-Count') || 0);
                    return {
                        data: response.body || [],
                        total: total
                    }
                })
            ).toPromise();
    }

    delete(uuid: string) {
        return this.http.delete(this.projectService.getBackendConfig().baseUrl + this.portfolioUrl + "/" + uuid).toPromise();
    }

    create(data: PortfolioTagVM) {
        return this.http.post(this.projectService.getBackendConfig().baseUrl + this.portfolioUrl, data).toPromise();
    }

    getAll(): Promise<Array<PortfolioTagVM>> {
        return this.http.get<Array<PortfolioTagVM>>(this.projectService.getBackendConfig().baseUrl + this.portfolioUrl + '/all').toPromise();
    }

}