import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { BehaviorSubject } from 'rxjs';
import { ModalFormComponent } from 'src/app/pages/component/modal-form/modal-form.component';
import { FilesService } from 'src/app/pages/services/files.service';
import { FunctionService } from 'src/app/pages/services/function.service';
import { ButtonConfig, ColumnConfig, CommonResponse, ListQueryParams, ModalFormItem, FunctionVM } from 'src/app/pages/type/list.module';

@Component({
  selector: 'app-photography',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.scss']
})
export class FunctionComponent implements OnInit {

  queryFilter: ListQueryParams = {
    page: 0,
    size: 10
  };
  btnConfig: ButtonConfig[] = [
    {
      label: '新建',
      type: 'primary',
      event: () => {
        this.create();
      }
    },
    {
      label: '刷新',
      type: 'default',
      event: () => {
        this.loadData(this.queryFilter);
      }
    },
    {
      label: '重置',
      type: 'default',
      event: () => {
        this.queryFilter = {
          page: 0,
          size: 10
        }
        this.loadData(this.queryFilter);
      }
    }
  ];
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
      name: 'linkUrl',
      label: '缩略图',
      isImg: true,
      width: 12
    }, {
      name: 'isShowTxt',
      selectType: 'input',
      label: '是否展示',
      enableSelect: true,
      canSort: true,
      width: 13
    }, {
      name: 'name',
      selectType: 'input',
      label: '功能名称',
      enableSelect: true,
      canSort: true,
      width: 13
    }, {
      name: 'route',
      selectType: 'input',
      label: '路由',
      enableSelect: true,
      canSort: true,
      width: 13
    }, {
      name: 'desc',
      selectType: 'input',
      label: '备注',
      enableSelect: true,
      canSort: true,
      width: 13
    }, {
      name: 'sortOrder',
      selectType: 'input',
      label: '排序',
      enableSelect: true,
      canSort: true,
      width: 10
    }, {
      name: 'btn',
      label: '操作',
      isBtn: true,
      btnConfig: [
        {
          label: '预览',
          event: (event) => {
            this.filesService.previewImage(event.imageUuid);
          }
        }, {
          label: '更改展示状态',
          type: 'primary',
          event: (event) => {
            this.service.updateIshow(event).then(res => {
              this.loadData(this.queryFilter);
            });
          }
        },
        {
          label: '删除',
          type: 'danger',
          event: (event) => {
            this.service.delete(event.uuid).then(res => {
              this.loadData(this.queryFilter);
            });
          }
        }
      ],
      width: 50
    }
  ];
  pageIndex = 1;
  pageSize = 10;
  showPagination = true;
  loading = false;
  total = this.dataSet.length;
  pageSizeOptions = [10, 20, 30];
  carouselDataSubject = new BehaviorSubject<CommonResponse<FunctionVM>>({ data: [], total: 0 });


  constructor(private service: FunctionService, private modalService: NzModalService, private filesService: FilesService) { }

  ngOnInit() {
  }


  loadData = (queryFilter: ListQueryParams) => {
    this.service.getList(queryFilter).then(res => {
      this.carouselDataSubject.next(res);
    })
  }

  create() {
    const formConfig: ModalFormItem[] = [
      {
        "key": "imageUuid",
        "label": "请选择图片",
        "type": "upload",
        "vali": Validators.required
      },
      {
        "key": "name",
        "label": "功能名称",
        "type": "text",
        "vali": Validators.required
      },
      {
        "key": "route",
        "label": "路由",
        "type": "text",
        "vali": Validators.required
      },
      {
        "key": "desc",
        "label": "备注",
        "type": "text"
      },
      {
        "key": "sortOrder",
        "label": "顺序",
        "type": "number",
        "vali": Validators.required
      }
    ]

    const modal = this.modalService.create({
      nzTitle: '新建首页功能',
      nzContent: ModalFormComponent,
      nzComponentParams: {
        formConfig: formConfig
      },
      nzOnOk: () => new Promise((resolve) => {
        const instance = modal.getContentComponent();
        if (instance.form.valid) {
          this.onConfirm(instance.form.value);
          resolve(true);
        } else {
          resolve(false);
        }
      }),
      nzOnCancel: () => {
        this.onCancel();
      }
    });
  }


  onConfirm(data: { imageUuid: string, sortOrder: number, desc: string, route: string }) {
    const req: FunctionVM = {
      uuid: null,
      id: null,
      imageUuid: data.imageUuid,
      linkUrl: data.imageUuid,
      sortOrder: data.sortOrder,
      isShow: true,
      desc: data.desc,
      route: data.route
    };
    this.service.create(req).then(res => {
      this.loadData(this.queryFilter);
    });
  }

  onCancel() {
    console.log('取消操作');
  }
}
