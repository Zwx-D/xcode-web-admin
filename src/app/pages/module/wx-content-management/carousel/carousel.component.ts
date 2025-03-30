import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { BehaviorSubject } from 'rxjs';
import { ModalFormComponent } from 'src/app/pages/component/modal-form/modal-form.component';
import { CarouselService } from 'src/app/pages/services/carousel.service';
import { ButtonConfig, CarouselVM, ColumnConfig, CommonResponse, ModalFormItem } from 'src/app/pages/type/list.module';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  btnConfig: ButtonConfig[] = [
    {
      label: '新建',
      type: 'primary',
      event: () => {
        this.createCarousel();
      }
    }
  ];
  dataSet = [];
  columnConfig: ColumnConfig[] = [
    {
      name: 'id',
      selectType: 'input',
      label: 'ID',
      enableSelect: true
    }, {
      name: 'linkUrl',
      label: '缩略图',
      isImg: true
    }, {
      name: 'imageUuid',
      selectType: 'input',
      label: 'imageUuid',
      enableSelect: true
    }, {
      name: 'linkUrl',
      selectType: 'input',
      label: '链接',
      enableSelect: true
    }, {
      name: 'sortOrder',
      selectType: 'input',
      label: '排序',
      enableSelect: true
    }
  ];
  pageIndex = 1;
  pageSize = 10;
  showPagination = true;
  loading = false;
  total = this.dataSet.length;
  pageSizeOptions = [10, 20, 30];
  carouselDataSubject = new BehaviorSubject<CommonResponse<CarouselVM>>({ data: [], total: 0 });
  loadData = () => {
    this.service.getCarouselList().then(res => {
      console.log(res);
      this.carouselDataSubject.next(res);
    })
  }

  constructor(private service: CarouselService, private modalService: NzModalService) { }

  ngOnInit() {
  }

  createCarousel() {
    const formConfig: ModalFormItem[] = [
      {
        "key": "imageUuid",
        "label": "请选择图片",
        "type": "upload",
        "vali": Validators.required
      },
      {
        "key": "sortOrder",
        "label": "顺序",
        "type": "number",
        "vali": Validators.required
      }
    ]

    const modal = this.modalService.create({
      nzTitle: '新建轮播图',
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

  onConfirm(data: { imageUuid: string, sortOrder: number }) {
    const req: CarouselVM = {
      id: null,
      imageUuid: data.imageUuid,
      linkUrl: data.imageUuid,
      sortOrder: data.sortOrder
    };
    this.service.createCarousel(req).then(res => {
      this.loadData();
    });
  }

  onCancel() {
    console.log('取消操作');
  }
}
