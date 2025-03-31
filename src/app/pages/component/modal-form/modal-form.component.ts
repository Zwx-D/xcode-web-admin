import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalFormItem } from '../../type/list.module';
import { FilesService } from '../../services/files.service';
import { NzModalService } from 'ng-zorro-antd';
import { SelectImageComponent } from '../select-image/select-image.component';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {

  uploadUrl: string = '';
  uploadSize: number = 5000;
  uploadLimit: number = 1;
  avatarUrl: string;
  @Input() title: string;
  @Input() formConfig: ModalFormItem[];
  @Input() confirmText = '确认';
  @Input() cancelText = '取消';

  @Output() confirm = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private uploadService: FilesService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.form = this.createFormGroup();
  }

  onConfirm() {
    if (this.form.valid) {
      this.confirm.emit(this.form.value);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  createFormGroup(): FormGroup {
    const group = this.fb.group({});
    this.formConfig.forEach(item => {
      const validators = item.vali ? [item.vali] : [];
      group.addControl(item.key, this.fb.control('', validators));
    });
    return group;
  }

  uploadImg = (item: {
    name: string;
    action: string;
    file: File;
    onError: (error: Error, body?: any) => void;
    onProgress: (e: { percent: number }) => void;
    onSuccess: (response: any, xhr?: any) => void;
  }) => {
    this.uploadService.uploadFile(item.file).then(res => {
      this.avatarUrl = this.uploadService.previewImg(res.uuid);
      this.form.get(item.name).setValue(res.uuid);
    }).catch(err => {
      console.error("上传图片失败");
      console.error(err)
    });
  };

  selectImage(key: string) {
    console.log(key);
    this.modalService.create({
      nzTitle: '选择图片',
      nzContent: SelectImageComponent,
      nzComponentParams: {},
      nzWidth: '80%',
      nzOnOk: (data) => {
        console.log(data);
        if (data.selectedItem) {
          this.avatarUrl = this.uploadService.previewImg(data.selectedItem.uuid);
          this.form.get(key).setValue(data.selectedItem.uuid);
        }
      },
      nzOnCancel: () => {
        this.onCancel();
      }
    });

  }


}
