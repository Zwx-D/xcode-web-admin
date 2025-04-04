import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProjectService } from "./project.serivce";
import { CarouselVM, CommonResponse, ListQueryParams } from "../type/list.module";
import { map } from "rxjs/operators";
import { FilesService } from "./files.service";

@Injectable({
    providedIn: 'root'
})
export class CarouselService {

    private listUrl = '/api/carouselImage';
    private createUrl = '/api/carouselImage';
    private deleteUrl = '/api/carouselImage';
    private updateUrl = '/api/carouselImage';

    constructor(private http: HttpClient, private projectService: ProjectService, private filesService: FilesService) {
    }

    getCarouselList(queryFilter: ListQueryParams): Promise<CommonResponse<CarouselVM>> {
        return this.http.get(this.projectService.getBackendConfig().baseUrl + this.listUrl,
            { observe: 'response', params: this.projectService.buildHttpParams(queryFilter) })
            .pipe(
                map((response: HttpResponse<CarouselVM[]>) => {
                    const total = +(response.headers.get('X-Total-Count') || 0);
                    return {
                        data: this.transformCarouselsToVMs(response.body) || [],
                        total: total
                    }
                })
            ).toPromise();
    }

    transformCarouselsToVMs(vms: CarouselVM[]) {
        vms.forEach(item => {
            item.linkUrl = this.filesService.previewImg(item.imageUuid);
            item.isShowTxt = item.isShow ? "是" : "否";
        })
        return vms;
    }

    createCarousel(data: CarouselVM): Promise<CarouselVM> {
        return this.http.post<CarouselVM>(this.projectService.getBackendConfig().baseUrl + this.createUrl, data).toPromise();
    }

    deleteCarousel(uuid: string) {
        return this.http.delete(this.projectService.getBackendConfig().baseUrl + this.deleteUrl + `/${uuid}`).toPromise();
    }

    updateIshow(data: CarouselVM) {
        return this.http.put(this.projectService.getBackendConfig().baseUrl + this.updateUrl + `/${data.uuid}?isShow=` + !data.isShow, {}).toPromise();
    }
}