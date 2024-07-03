import { Pagination, TablePaginationConfig } from "antd";

export function FooterCount({ counts, pagination }: { counts: number; pagination: TablePaginationConfig | boolean; }) {
  return (
    <div className="d-flex justify-content-between">
      <span>
        Total: {counts} items.
      </span>

      {(typeof pagination != 'boolean') ? <Pagination {...(pagination as TablePaginationConfig)} /> : null}
    </div>
  );
}
