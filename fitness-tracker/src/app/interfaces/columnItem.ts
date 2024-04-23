import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

export interface columnItem<Type> {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Type> | null;
  sortDirections: NzTableSortOrder[];
}
