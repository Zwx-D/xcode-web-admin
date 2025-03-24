import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-backend-account',
  templateUrl: './backend-account.component.html',
  styleUrls: ['./backend-account.component.scss']
})
export class BackendAccountComponent implements OnInit {

  selectData!: FormGroup;
  colummConfig: ColummConfig[] = [
    {
      name: 'id',
      selectType: 'input',
      label: 'ID',
      enableSelect: true
    },
    {
      name: 'username',
      selectType: 'input',
      label: '用户名',
      enableSelect: false
    }
  ];
  selectConfig: SelectConfig[] = [];

  dataSet = [];

  pageIndex: number = 1;
  pageSize: number = 10
  paginationType: 'default' | 'small' = 'default';
  showPagination: boolean = true;
  loading: boolean = true;
  sortPriority: boolean = true;
  total: number = 0
  pageSizeOptions: number[] = [10, 20, 30, 40, 50];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.selectData = this.fb.group({});
    this.colummConfig.forEach(item => {
      if (item.enableSelect) {
        let control = this.fb.control(null);
        this.selectData.addControl(item.name, control);
        this.selectConfig.push({
          label: item.label,
          column: item.name,
          errorTip: item.errorTip,
          placeholder: item.placeholder
        });
      }
    });
    this.setData();
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent) { }

  setData() {
    let data = [];
    for (let i = 0; i < 199; i++) {
      data.push(
        {
          id: i,
          username: "用户名" + i
        }
      );
    }
    this.dataSet = data;
    this.total = 50;
    this.loading = false;
  }
}

export type SelectConfig = {
  label: string;
  column: string;
  errorTip?: string;
  placeholder?: string;
}

interface BaseColummConfig {
  name: string;
  label: string;
  enableSelect: boolean;
  errorTip?: string;
  placeholder?: string;
}

interface SelectColummConfig extends BaseColummConfig {
  selectType: 'select';
  option: SelectOpt[];
}

interface InputColummConfig extends BaseColummConfig {
  selectType: 'input';
}

interface DateColummConfig extends BaseColummConfig {
  selectType: 'date';
}

export type ColummConfig = InputColummConfig | SelectColummConfig | DateColummConfig;

export class SelectOpt {
  label: string;
  value: string;
}
