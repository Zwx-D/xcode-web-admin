import { Injectable } from "@angular/core";
import { BackendConfig } from "../type/main/config.module";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    backendConfig: BackendConfig;

    constructor(private http: HttpClient) {
        this.init();
    }

    public init() {
        this.backendConfig = new BackendConfig();
        this.http.get('assets/config/project.json').subscribe((res: { config: { systemBarImg: string, systenName: string } }) => {
            this.backendConfig.systemBarImg = res.config.systemBarImg;
            this.backendConfig.systemName = res.config.systenName;
            console.log(this.backendConfig);
        });
    }

    public getBackendConfig() {
        return this.backendConfig;
    }

    public changeMeun() {

    }

}