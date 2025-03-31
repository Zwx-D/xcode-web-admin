import { Component, Input, OnInit } from '@angular/core';
import { ButtonConfig, ColumnConfig, CommonResponse, ListQueryParams, SelectConfig } from '../../type/list.module';
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
  scrollConfig = { x: '1200px', y: '240px' };
  @Input() btnConfig: ButtonConfig[] = []
  @Input() dataSet: any[] = [];
  @Input() columnConfig: ColumnConfig[] = [];
  @Input() pageIndex = 1;
  @Input() pageSize = 10;
  @Input() showPagination = true;
  @Input() loading = false;
  @Input() total = 0;
  @Input() pageSizeOptions = [10, 20, 30];
  @Input() loadData: (queryFilter: ListQueryParams) => void;
  @Input() dataSource: Observable<CommonResponse<any>>;
  @Input() queryFilter: ListQueryParams | null = null;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initSelectForm();
    if (this.loadData) {
      this.loadData(this.queryFilter);
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

  changePage(event) {
    this.queryFilter.page = event - 1;
    this.loadData(this.queryFilter);
  }

  search(event: ColumnConfig) {
    this.queryFilter = {
      ...this.queryFilter,
      ...this.convertColumnConfigSelectVlaue(event)
    }
    this.loadData(this.queryFilter);
  }

  reset(event: ColumnConfig) {
    event.selectValue = null;
    delete this.queryFilter[`${event.name}.equals`];
    console.log(this.queryFilter);
    this.loadData(this.queryFilter);
  }

  convertColumnConfigSelectVlaue(config: ColumnConfig) {
    const key = `${config.name}.equals`;
    const result: { [key: string]: any } = {};
    result[key] = config.selectValue;
    return result;
  }

}
