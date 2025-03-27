import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.component.html',
  styleUrls: ['./select-image.component.scss']
})
export class SelectImageComponent implements OnInit {

  folderFilter = '';
  fileNameFilter = '';
  currentPage = 1;
  pageSize = 10;
  isShowingFiles = false;
  currentFolderId: number | null = null;
  items: any[] = [];
  constructor(private message: NzMessageService) {}

  ngOnInit(): void {
    this.loadFolders();
  }

  loadFolders(): void {
    this.isShowingFiles = false;
    this.currentFolderId = null;
    this.items = mockFolders;
  }

  loadFiles(folderId: number): void {
    this.isShowingFiles = true;
    this.currentFolderId = folderId;
    this.items = mockFiles.filter(file => file.folderId === folderId);
  }

  resetFilters(): void {
    this.folderFilter = '';
    this.fileNameFilter = '';
    this.loadFolders();
  }

  filterItems(): void {
    if (this.folderFilter && this.fileNameFilter) {
      this.message.error('文件夹筛选和文件名筛选只能使用一个');
      return;
    }
    if (this.isShowingFiles) {
      if (this.fileNameFilter) {
        this.items = mockFiles.filter(file =>
          file.folderId === this.currentFolderId && file.name.includes(this.fileNameFilter)
        );
      }
    } else {
      if (this.folderFilter) {
        this.items = mockFolders.filter(folder => folder.name.includes(this.folderFilter));
      }
    }
  }

  previewFile(file: any): void {
    console.log('Preview file:', file);
  }

  downloadFile(file: any): void {
    console.log('Download file:', file);
  }

  deleteFile(file: any): void {
    console.log('Delete file:', file);
  }

  goBack(): void {
    this.loadFolders();
  }

}


// 模拟接口返回数据
const mockFolders = [
  { id: 1, name: 'Folder 1' },
  { id: 2, name: 'Folder 2' },
  { id: 3, name: 'Folder 3' },
  { id: 1, name: 'Folder 1' },
  { id: 2, name: 'Folder 2' },
  { id: 3, name: 'Folder 3' },
  { id: 1, name: 'Folder 1' },
  { id: 2, name: 'Folder 2' },
  { id: 3, name: 'Folder 3' },
  { id: 1, name: 'Folder 1' },
  { id: 2, name: 'Folder 2' },
  { id: 3, name: 'Folder 3' }
];

const mockFiles = [
  { id: 1, name: 'File 1', folderId: 1 },
  { id: 2, name: 'File 2', folderId: 1 },
  { id: 3, name: 'File 3', folderId: 2 }
];
