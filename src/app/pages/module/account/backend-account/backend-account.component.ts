import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BackendAccountService } from 'src/app/pages/services/backend-account.service';
import { ColummConfig, SelectConfig } from 'src/app/pages/type/list.module';

@Component({
  selector: 'app-backend-account',
  templateUrl: './backend-account.component.html',
  styleUrls: ['./backend-account.component.scss']
})
export class BackendAccountComponent implements OnInit {

  selectData!: FormGroup;
  colummConfig: ColummConfig[] = [
    {
      name: 'id',
      selectType: 'input',
      label: 'ID',
      enableSelect: true
    },
    {
      name: 'username',
      selectType: 'input',
      label: '账号',
      enableSelect: false
    },
    {
      name: 'realName',
      selectType: 'input',
      label: '用户名',
      enableSelect: false
    },
    {
      name: 'role',
      selectType: 'input',
      label: '角色',
      enableSelect: false
    },
    {
      name: 'enabled',
      selectType: 'input',
      label: '是否启用',
      enableSelect: false
    },
    {
      name: 'lastLoginTime',
      selectType: 'input',
      label: '最后登录时间',
      enableSelect: false
    },
    {
      name: 'lastModifiedTime',
      selectType: 'input',
      label: '最后修改时间',
      enableSelect: false
    },
    {
      name: 'lastModifiedBy',
      selectType: 'input',
      label: '最后修改人',
      enableSelect: false
    }
  ];
  selectConfig: SelectConfig[] = [];

  dataSet = [];

  pageIndex: number = 1;
  pageSize: number = 10
  paginationType: 'default' | 'small' = 'default';
  showPagination: boolean = true;
  loading: boolean = true;
  sortPriority: boolean = true;
  total: number = 0
  pageSizeOptions: number[] = [10, 20, 30, 40, 50];

  constructor(private fb: FormBuilder, private backendAccountService: BackendAccountService) { }

  ngOnInit() {
    // 初始化筛选表单
    this.initSelectForm();
    // 获取数据
    this.setData();
  }

  // 初始化筛选表单
  private initSelectForm() {
    this.selectData = this.fb.group({});
    this.colummConfig.forEach((item) => {
      if (item.enableSelect) {
        const control = new FormControl(null);
        this.selectData.addControl(item.name, control);
        this.selectConfig.push({
          label: item.label,
          column: item.name,
          errorTip: item.errorTip,
          placeholder: item.placeholder
        });
      }
    });
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent) { }

  setData() {
    this.loading = true;
    this.backendAccountService.getUserList().then(res => {
      this.dataSet = res.data || [];
      this.total = res.total || 0;
    }).finally(() => {
      this.loading = false;
    });
  }
}
