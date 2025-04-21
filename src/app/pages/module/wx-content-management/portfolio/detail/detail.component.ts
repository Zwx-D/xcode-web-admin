import { Component, EventEmitter, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NzModalService } from "ng-zorro-antd";
import { BehaviorSubject } from "rxjs";
import { SelectImageComponent } from "src/app/pages/component/select-image/select-image.component";
import { FilesService } from "src/app/pages/services/files.service";
import { PortfolioService } from "src/app/pages/services/portfolio.service";
import { ButtonConfig, ColumnConfig, CommonResponse, ListQueryParams, PortfolioItemVM, PortfolioVM } from "src/app/pages/type/list.module";


@Component({
    selector: 'app-portfolio-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class PortfolioDetailComponent implements OnInit {

    textareaSize = { minRows: 6, maxRows: 20 }
    inEdit: boolean = false;
    formData: FormGroup;
    data: PortfolioVM;
    avatarUrl: string = '';
    uploadUrl: string = '';
    uploadSize: number = 5000;
    uploadLimit: number = 1;
    cancel = new EventEmitter<void>();

    // 列表
    queryFilter: ListQueryParams = {
        page: 0,
        size: 10
    };
    btnConfig: ButtonConfig[] = [
        {
            label: '新建',
            type: 'primary',
            event: () => {
                // this.createPortfolio();
            }
        },
        {
            label: '刷新',
            type: 'default',
            event: () => {
                // this.loadData(this.queryFilter);
            }
        }
    ];
    dataSet = [];
    columnConfig: ColumnConfig[] = [
        {
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
            width: 15
        }, {
            name: 'sortOrder',
            selectType: 'input',
            label: '排序',
            enableSelect: true,
            canSort: true,
            width: 15
        }, {
            name: 'btn',
            label: '操作',
            isBtn: true,
            btnConfig: [
                {
                    label: '更改展示状态',
                    type: 'primary',
                    event: (event) => {
                        // this.service.updateIshow(event).then(res => {
                        //   this.loadData(this.queryFilter);
                        // });
                    }
                },
                {
                    label: '删除',
                    type: 'danger',
                    event: (event) => {
                        // this.service.deleteCarousel(event.uuid).then(res => {
                        //   this.loadData(this.queryFilter);
                        // });
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
    carouselDataSubject = new BehaviorSubject<CommonResponse<PortfolioItemVM>>({ data: [], total: 0 });


    constructor(
        private service: PortfolioService,
        private router: Router,
        private fb: FormBuilder,
        private filesService: FilesService,
        private modalService: NzModalService) { }

    ngOnInit() {
        if (!history.state.data) {
            this.router.navigate(['/portfolio']);
        }
        this.data = history.state.data;
        this.avatarUrl = this.filesService.previewImg(this.data.imageUuid);
        this.formData = this.fb.group({
            name: [this.data.name],
            imageUuid: [this.data.imageUuid],
            desc: [this.data.desc],
            isShow: [this.data.isShow],
            sortOrder: [this.data.sortOrder]
        });
    }

    loadData = (queryFilter: ListQueryParams) => {
        this.service.getList(queryFilter).then(res => {
            this.carouselDataSubject.next(res);
        })
    }

    edit() {
        this.inEdit = true;
    }
    return() {
        this.router.navigate(['/portfolio']);
    }
    save() {
        this.inEdit = false;
    }
    cancelEdit() {
        this.inEdit = false;
    }


    uploadImg = (item: {
        name: string;
        action: string;
        file: File;
        onError: (error: Error, body?: any) => void;
        onProgress: (e: { percent: number }) => void;
        onSuccess: (response: any, xhr?: any) => void;
    }) => {
        this.filesService.uploadFile(item.file).then(res => {
            this.avatarUrl = this.filesService.previewImg(res.uuid);
            this.formData.get("imageUuid").setValue(res.uuid);
        }).catch(err => {
            console.error("上传图片失败");
            console.error(err)
        });
    };

    selectImage() {
        this.modalService.create({
            nzTitle: '选择图片',
            nzContent: SelectImageComponent,
            nzComponentParams: {},
            nzWidth: '80%',
            nzOnOk: (data) => {
                console.log(data);
                if (data.selectedItem) {
                    this.avatarUrl = this.filesService.previewImg(data.selectedItem.uuid);
                    this.formData.get("imageUuid").setValue(data.selectedItem.uuid);
                }
            },
            nzOnCancel: () => {
                this.onCancel();
            }
        });

    }

    onCancel() {
        this.cancel.emit();
    }

}