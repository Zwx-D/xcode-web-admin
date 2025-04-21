import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FilesService } from "./files.service";
import { ProjectService } from "./project.serivce";
import { CommonResponse, ListQueryParams, WechatUserVM } from "../type/list.module";
import { map } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class WxAccountService {

    private listUrl = '/api/wechatUser';
    constructor(private http: HttpClient, private projectService: ProjectService) {
    }

    getList(queryFilter: ListQueryParams): Promise<CommonResponse<WechatUserVM>> {
        return this.http.get(this.projectService.getBackendConfig().baseUrl + this.listUrl,
            { observe: 'response', params: this.projectService.buildHttpParams(queryFilter) })
            .pipe(
                map((response: HttpResponse<WechatUserVM[]>) => {
                    const total = +(response.headers.get('X-Total-Count') || 0);
                    return {
                        data: response.body || [],
                        total: total
                    }
                })
            ).toPromise();
    }
}