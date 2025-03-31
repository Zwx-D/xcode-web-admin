import { Injectable } from "@angular/core";
import { BackendConfig } from "../type/main/config.module";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ListQueryParams } from "../type/list.module";

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    backendConfig: BackendConfig;

    constructor(private http: HttpClient) {
        // this.init();
    }

    public init() {
        this.backendConfig = new BackendConfig();
        this.http.get('assets/config/project.json').subscribe(
            (res: { config: { systemBarImg: string, systenName: string, baseUrl: string } }) => {
                this.backendConfig.systemBarImg = res.config.systemBarImg;
                this.backendConfig.systemName = res.config.systenName;
                this.backendConfig.baseUrl = res.config.baseUrl || environment.baseUrl;;
            });
    }

    public getBackendConfig() {
        return this.backendConfig;
    }

    public changeMeun() {


    }

    public buildHttpParams(queryParams: ListQueryParams): HttpParams {
        const { page = 0, size = 10, ...params } = queryParams;
        let httpParams = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());
        Object.keys(params).forEach(key => {
            if (params[key] !== undefined && params[key] !== null) {
                httpParams = httpParams.set(key, params[key]);
            }
        });
        return httpParams;
    }

}