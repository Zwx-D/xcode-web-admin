import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WxAccountService } from 'src/app/pages/services/wx-account.service';
import { ButtonConfig, ColumnConfig, CommonResponse, ListQueryParams, WechatUserVM } from 'src/app/pages/type/list.module';

@Component({
  selector: 'app-wx-account',
  templateUrl: './wx-account.component.html',
  styleUrls: ['./wx-account.component.scss']
})
export class WxAccountComponent implements OnInit {

  queryFilter: ListQueryParams = {
    page: 0,
    size: 10
  };
  btnConfig: ButtonConfig[] = [];
  dataSet = [];
  columnConfig: ColumnConfig[] = [
    {
      name: 'id',
      selectType: 'input',
      label: 'ID',
      enableSelect: true,
      canSort: true,
      width: 10
    }, {
      name: 'nickName',
      label: '名称',
      isImg: false,
      width: 12
    }, {
      name: 'openId',
      selectType: 'input',
      label: 'openId',
      enableSelect: true,
      canSort: true,
      width: 13
    }, {
      name: 'unionId',
      selectType: 'input',
      label: 'unionId',
      enableSelect: true,
      canSort: true,
      width: 10
    }, {
      name: 'lastLoginTime',
      selectType: 'input',
      label: '最后打开时间',
      enableSelect: true,
      canSort: true,
      width: 10
    }
  ];
  pageIndex = 1;
  pageSize = 10;
  showPagination = true;
  loading = false;
  total = this.dataSet.length;
  pageSizeOptions = [10, 20, 30];
  carouselDataSubject = new BehaviorSubject<CommonResponse<WechatUserVM>>({ data: [], total: 0 });

  constructor(private wxAccountService: WxAccountService) { }

  ngOnInit() {
  }

  loadData = (queryFilter: ListQueryParams) => {
    this.wxAccountService.getList(queryFilter).then(res => {
      this.carouselDataSubject.next(res);
    })
  }

}
