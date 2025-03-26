import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProjectService } from "./project.serivce";
import { CarouselVM, CommonResponse } from "../type/list.response.module";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class CarouselService {

    private listUrl = '/api/carouselImage';

    constructor(private http: HttpClient, private projectService: ProjectService) {
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
        return vms;
    }
}