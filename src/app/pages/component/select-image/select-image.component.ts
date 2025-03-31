import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { FilesService } from '../../services/files.service';
import { ListQueryParams } from '../../type/list.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileInfoVM } from '../../type/files.type';

@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.component.html',
  styleUrls: ['./select-image.component.scss']
})
export class SelectImageComponent implements OnInit {
  queryForm: FormGroup;
  folderFilter = '';
  fileNameFilter = '';
  currentPage = 1;
  pageSize = 10;
  isShowingFiles = false;
  currentFolderId: string | null = null;
  items: any[] = [];
  pageTotal: number = 0;
  selectedItem: FileInfoVM | null = null;
  constructor(private message: NzMessageService,
    private filesService: FilesService,
    private modal: NzModalService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadFolders();
    this.queryForm = this.fb.group({
      folderFilter: [null],
      fileNameFilter: [null]
    });
  }

  loadFolders(): void {
    this.isShowingFiles = false;
    this.currentFolderId = null;
    this.filesService.getfolderFilter().then(res => {
      this.items = res.data;
      this.pageTotal = res.total;
    });
  }

  loadFiles(folderId: string): void {
    const queryParams: ListQueryParams = {
      page: 0,
      size: 10,
      "folderUuid.equals": folderId
    };
    this.filesService.getFiles(queryParams).then(res => {
      this.items = res.data;
      this.pageTotal = res.total;
      this.currentFolderId = folderId;
      this.isShowingFiles = true;
    })
  }

  resetFilters(): void {
    this.folderFilter = '';
    this.fileNameFilter = '';
    this.loadFolders();
  }

  filterItems(): void {
    // if (this.folderFilter && this.fileNameFilter) {
    //   this.message.error('文件夹筛选和文件名筛选只能使用一个');
    //   return;
    // }
    // if (this.isShowingFiles) {
    //   if (this.fileNameFilter) {
    //     this.items = mockFiles.filter(file =>
    //       file.folderId === this.currentFolderId && file.name.includes(this.fileNameFilter)
    //     );
    //   }
    // } else {
    //   if (this.folderFilter) {
    //     this.items = mockFolders.filter(folder => folder.name.includes(this.folderFilter));
    //   }
    // }
  }


  previewImage(imageUrl: string): void {
    this.modal.create({
      nzContent: `<img 
      src="${imageUrl}" 
      style="width: 100%;"
      />`,
      nzFooter: null, // 不显示底部按钮
      nzWidth: '80%', // 调整放大图片的大小
      nzClosable: true, // 关闭按钮在内容区域，不显示默认关闭按钮
      nzMaskClosable: true, // 点击遮罩可关闭
      nzBodyStyle: { padding: '0', textAlign: 'center' }
    });
  }

  selectImage(data: FileInfoVM) {
    if (this.selectedItem === data) {
      this.selectedItem = null;
    } else {
      this.selectedItem = data;
    }
  }

  deleteImage(data: FileInfoVM) {
    console.log(data);
  }

  goBack(): void {
    this.loadFolders();
  }

}

