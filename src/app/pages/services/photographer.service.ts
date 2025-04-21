import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProjectService } from "./project.serivce";
import { PhotographerVM } from "../type/photographer.type";

@Injectable({
    providedIn: 'root'
})
export class PhotographerService {
    private getPath: string = '/api/photographer';

    private savePath: string = '/api/photographer';

    constructor(private http: HttpClient, private projectService: ProjectService) {
    }


    getPhotographer(): Promise<PhotographerVM> {
        return this.http.get<PhotographerVM>(this.projectService.getBackendConfig().baseUrl + this.getPath).toPromise();
    }

    savePhotographer(data: PhotographerVM): Promise<PhotographerVM> {
        return this.http.post<PhotographerVM>(this.projectService.getBackendConfig().baseUrl + this.savePath, data).toPromise();
    }

}
