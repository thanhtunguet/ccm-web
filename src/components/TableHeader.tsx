import { DownloadOutlined, ImportOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Pagination, TablePaginationConfig } from "antd";
import React, { FC, PropsWithChildren } from "react";

export interface TableHeaderProps extends PropsWithChildren {
  onAdd(): void;

  onImport?(event: React.ChangeEvent<HTMLInputElement>): void;

  template?: string;

  pagination: TablePaginationConfig;
}

export const TableHeader: FC<TableHeaderProps> = (props: TableHeaderProps) => {
  const {
    onAdd,
    onImport,
    template,
    pagination,
    children,
  } = props;
  return (
    <div className="d-flex justify-content-end my-2">
      <div className="flex-grow-1 justify-content-start">
        <Button type="primary" className="mr-2" icon={<PlusOutlined />} onClick={onAdd}>
          Create
        </Button>

        {onImport && (
          <>
            <Button
              type="default"
              className="align-self-end mx-2"
              icon={<ImportOutlined />}
              onClick={() => {
                document.getElementById("excel-import")?.click();
              }}>
              Import
            </Button>
            <Button
              type="default"
              className="align-self-end mx-2"
              icon={<DownloadOutlined />}
              onClick={() => {
                window.open(template);
              }}>
              Download template
            </Button>
            <Input type="file" className="hide hidden d-none" id="excel-import" onChange={onImport} />
          </>
        )}

        {children}
      </div>
      <Pagination {...pagination} />
    </div>
  );
};
