import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProjectService } from "./project.serivce";
import { CarouselVM, CommonResponse } from "../type/list.module";
import { map } from "rxjs/operators";
import { FilesService } from "./files.service";

@Injectable({
    providedIn: 'root'
})
export class CarouselService {

    private listUrl = '/api/carouselImage';
    private createUrl = '/api/carouselImage';

    constructor(private http: HttpClient, private projectService: ProjectService, private filesService: FilesService) {
    }

    getCarouselList(): Promise<CommonResponse<CarouselVM>> {
        return this.http.get(this.projectService.getBackendConfig().baseUrl + this.listUrl, { observe: 'response' })
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
        })
        return vms;
    }

    createCarousel(data: CarouselVM): Promise<CarouselVM> {
        return this.http.post<CarouselVM>(this.projectService.getBackendConfig().baseUrl + this.listUrl, data).toPromise();
    }
}