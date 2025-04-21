import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { SelectImageComponent } from 'src/app/pages/component/select-image/select-image.component';
import { FilesService } from 'src/app/pages/services/files.service';
import { PhotographerService } from 'src/app/pages/services/photographer.service';
import { PhotographerVM } from 'src/app/pages/type/photographer.type';

@Component({
  selector: 'app-photographer',
  templateUrl: './photographer.component.html',
  styleUrls: ['./photographer.component.scss']
})
export class PhotographerComponent implements OnInit {
  photographer: PhotographerVM;
  validateForm!: FormGroup;
  textareaSize = { minRows: 6, maxRows: 20 }
  avatarUrl: string = '';
  uploadUrl: string = '';
  uploadSize: number = 5000;
  uploadLimit: number = 1;
  cancel = new EventEmitter<void>();
  constructor(private fb: FormBuilder,
    private message: NzMessageService,
    private service: PhotographerService,
    private filesService: FilesService,
    private modalService: NzModalService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [],
      imageUuid: [],
      desc: []
    });
    this.loadData();
  }

  loadData() {
    this.service.getPhotographer().then(res => {
      this.photographer = res;
      this.validateForm.patchValue(res);
      this.avatarUrl = this.filesService.previewImg(res.imageUuid);
    }).catch(err => {
      this.message.warning(err.error.detail);

    })
  }

  submitForm(): void {
    console.log(this.validateForm.getRawValue());
    const formData = this.validateForm.getRawValue();
    const data: PhotographerVM = {
      id: this.photographer && this.photographer.id ? this.photographer.id : null,
      name: formData.name,
      imageUuid: formData.imageUuid,
      desc: formData.desc,
      uuid: this.photographer && this.photographer.uuid ? this.photographer.uuid : null
    }
    this.service.savePhotographer(data).then(res => {
      this.photographer = res;
    }).catch(err => {
      this.message.error("保存失败：" + err.error.detail);
    })

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
      this.validateForm.get("imageUuid").setValue(res.uuid);
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
          this.validateForm.get("imageUuid").setValue(data.selectedItem.uuid);
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
