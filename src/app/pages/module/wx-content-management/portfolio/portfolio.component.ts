import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { BehaviorSubject } from 'rxjs';
import { ModalFormComponent } from 'src/app/pages/component/modal-form/modal-form.component';
import { FilesService } from 'src/app/pages/services/files.service';
import { PortfolioTagService } from 'src/app/pages/services/portfolio-tag.service';
import { PortfolioService } from 'src/app/pages/services/portfolio.service';
import { ButtonConfig, ColumnConfig, CommonResponse, ListQueryParams, ModalFormItem, PortfolioVM } from 'src/app/pages/type/list.module';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  queryFilter: ListQueryParams = {
    page: 0,
    size: 10
  };
  btnConfig: ButtonConfig[] = [
    {
      label: '新建',
      type: 'primary',
      event: () => {
        this.createPortfolio();
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
      width: 5
    }, {
      name: 'linkUrl',
      label: '封面',
      isImg: true,
      width: 12
    }, {
      name: 'name',
      label: '名称',
      isImg: false,
      width: 15
    }, {
      name: 'isShowTxt',
      selectType: 'input',
      label: '展示否',
      enableSelect: true,
      canSort: true,
      width: 15
    }, {
      name: 'sortOrder',
      selectType: 'input',
      label: '排序',
      enableSelect: true,
      canSort: true,
      width: 10
    }, {
      name: 'typeTag',
      selectType: 'input',
      label: '标签',
      enableSelect: true,
      canSort: true,
      width: 10
    }, {
      name: 'btn',
      label: '操作',
      isBtn: true,
      btnConfig: [
        {
          label: '详情',
          event: (event) => {
            this.route.navigate(['/portfolio/detail'], {
              state: { data: event }
            });

          }
        }, {
          label: '展示否',
          type: 'primary',
          event: (event: PortfolioVM) => {
            this.service.changeIsShow(event.uuid, !event.isShow).then(res => {
              this.loadData(this.queryFilter);
            });
          }
        },
        {
          label: '删除',
          type: 'danger',
          event: (event: PortfolioVM) => {
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
  carouselDataSubject = new BehaviorSubject<CommonResponse<PortfolioVM>>({ data: [], total: 0 });

  constructor(private service: PortfolioService,
    private modalService: NzModalService,
    private filesService: FilesService,
    private route: Router,
    private portfolioTagService: PortfolioTagService) { }

  ngOnInit() {
  }

  loadData = (queryFilter: ListQueryParams) => {
    this.service.getList(queryFilter).then(res => {
      this.carouselDataSubject.next(res);
    })
  }

  createPortfolio() {

    this.portfolioTagService.getAll().then(res => {
      const options = res.map(item => {
        return {
          label: item.name,
          value: item.name
        }
      });

      const formConfig: ModalFormItem[] = [
        {
          "key": "name",
          "label": "作品名称",
          "type": "text",
          "vali": Validators.required
        },
        {
          "key": "imageUuid",
          "label": "请选择图片",
          "type": "upload",
          "vali": Validators.required
        }, {
          "key": "desc",
          "label": "备注",
          "type": "text"
        },
        {
          "key": "sortOrder",
          "label": "顺序",
          "type": "number",
          "vali": Validators.required
        }, {
          "key": "typeTag",
          "label": "标签",
          "type": "select",
          "options": options
        }
      ]
      const modal = this.modalService.create({
        nzTitle: '新建作品集',
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
    });

  }

  onConfirm(data: { imageUuid: string, sortOrder: number, name: string, desc: string, typeTag: string }) {
    console.log(data);
    const req: PortfolioVM = {
      uuid: null,
      id: null,
      imageUuid: data.imageUuid,
      linkUrl: data.imageUuid,
      sortOrder: data.sortOrder,
      isShow: false,
      name: data.name,
      desc: data.desc ? data.desc : null,
      typeTag: data.typeTag ? data.typeTag : null
    };
    this.service.createPortfolio(req).then(res => {
      this.loadData(this.queryFilter);
    });
  }

  onCancel() {
    console.log('取消操作');
  }

}
