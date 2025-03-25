import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ProjectService } from './project.serivce';
import { CommonResponse, UserVM } from '../type/list.response.module';
import { map } from 'rxjs/operators';
import { User } from '../type/backend-account.type';

@Injectable({
    providedIn: 'root'
})
export class BackendAccountService {
    private apiUrl = '/api/backendUser/getUserList';

    constructor(private http: HttpClient, private projectService: ProjectService) { }

    getUserList(): Promise<CommonResponse<UserVM>> {
        return this.http.get(this.projectService.getBackendConfig().baseUrl + this.apiUrl, { observe: 'response' })
            .pipe(
                map((response: HttpResponse<User[]>) => {
                    const total = +(response.headers.get('X-Total-Count') || 0);
                    return {
                        data: this.transformUsersToVMs(response.body) || [],
                        total: total
                    }
                })
            ).toPromise();
    }

    transformUsersToVMs(users: User[]): UserVM[] {
        return users.map(user => this.transformUserToVM(user));
    }

    transformUserToVM(user: User): UserVM {
        const roleNames = user.roles && user.roles.length > 0 ? user.roles.map(role => role.description) : [];
        const roleStr = roleNames.join(',');
        return {
            id: user.id,
            username: user.username,
            realName: user.realName,
            role: roleStr,
            enabled: user.enabled ? '是' : '否',
            lastLoginTime: user.lastLoginTime,
            lastModifiedTime: user.lastModifiedTime,
            lastModifiedBy: user.lastModifiedBy
        };
    }

}

