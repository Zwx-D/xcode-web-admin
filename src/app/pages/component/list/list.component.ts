import { Component, Input, OnInit } from '@angular/core';
import { ButtonConfig, ColumnConfig, CommonResponse, SelectConfig } from '../../type/list.response.module';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  align = 'bottom';
  justify = 'end';
  selectData!: FormGroup;
  selectConfig: SelectConfig[] = [];
  @Input() btnConfig: ButtonConfig[] = []
  @Input() dataSet: any[] = [];
  @Input() columnConfig: ColumnConfig[] = [];
  @Input() pageIndex = 1;
  @Input() pageSize = 10;
  @Input() showPagination = true;
  @Input() loading = false;
  @Input() total = 0;
  @Input() pageSizeOptions = [10, 20, 30];
  @Input() loadData: () => void;
  @Input() dataSource: Observable<CommonResponse<any>>;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initSelectForm();
    if (this.loadData) {
      this.loadData();
    }
    if (this.dataSource) {
      this.dataSource.subscribe((data) => {
        this.dataSet = data.data;
        this.total = data.total;
      });
    }
  }

  private initSelectForm() {
    this.selectData = this.fb.group({});
    this.columnConfig.forEach((item) => {
      if (item.enableSelect) {
        const control = new FormControl(null);
        this.selectData.addControl(item.name, control);
        this.selectConfig.push({
          label: item.label,
          column: item.name,
          errorTip: item.errorTip,
          placeholder: item.placeholder
        });
      }
    });
  }

}
