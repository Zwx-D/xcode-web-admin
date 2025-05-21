import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { BehaviorSubject } from 'rxjs';
import { ModalFormComponent } from 'src/app/pages/component/modal-form/modal-form.component';
import { PortfolioTagService } from 'src/app/pages/services/portfolio-tag.service';
import { ButtonConfig, ColumnConfig, CommonResponse, ListQueryParams, ModalFormItem, PortfolioTagVM } from 'src/app/pages/type/list.module';

@Component({
  selector: 'app-portfolio-tag',
  templateUrl: './portfolio-tag.component.html',
  styleUrls: ['./portfolio-tag.component.scss']
})
export class PortfolioTagComponent implements OnInit {

  queryFilter: ListQueryParams = {
    page: 0,
    size: 10
  };
  btnConfig: ButtonConfig[] = [
    {
      label: '新建',
      type: 'primary',
      event: () => {
        this.createPortfolioTag();
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
      name: 'name',
      label: '名称',
      isImg: false,
      width: 15
    }, {
      name: 'desc',
      label: '备注',
      isImg: false,
      width: 15
    }, {
      name: 'btn',
      label: '操作',
      isBtn: true,
      btnConfig: [
        {
          label: '删除',
          type: 'danger',
          event: (event: PortfolioTagVM) => {
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
  carouselDataSubject = new BehaviorSubject<CommonResponse<PortfolioTagVM>>({ data: [], total: 0 });

  constructor(private service: PortfolioTagService,
    private modalService: NzModalService) { }

  ngOnInit() {
  }

  loadData = (queryFilter: ListQueryParams) => {
    this.service.getList(queryFilter).then(res => {
      this.carouselDataSubject.next(res);
    })
  }

  createPortfolioTag() {
    const formConfig: ModalFormItem[] = [
      {
        "key": "name",
        "label": "标签名称",
        "type": "text",
        "vali": Validators.required
      },
      {
        "key": "desc",
        "label": "备注",
        "type": "text"
      }

    ]

    const modal = this.modalService.create({
      nzTitle: '新建摄影标签',
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

  onConfirm(data: { name: string, desc: string }) {
    console.log(data);
    const req: PortfolioTagVM = {
      uuid: null,
      id: null,
      name: data.name,
      desc: data.desc ? data.desc : null
    };
    this.service.create(req).then(res => {
      this.loadData(this.queryFilter);
    });
  }

  onCancel() {
    console.log('取消操作');
  }

}
