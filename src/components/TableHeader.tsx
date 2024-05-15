import {Button, Input} from "antd";
import {PlusOutlined, ImportOutlined, DownloadOutlined} from "@ant-design/icons";
import React, {FC} from "react";

export interface TableHeaderProps {
    onAdd(): void;

    onImport?(event: React.ChangeEvent<HTMLInputElement>): void;

    template?: string;
}

export const TableHeader: FC<TableHeaderProps> = (props: TableHeaderProps) => {
  const {
    onAdd,
    onImport,
    template,
  } = props;
  return <div className="d-flex justify-content-end">
    {onImport && (
      <>
        <Button type="default" className="align-self-end mx-2" icon={<ImportOutlined/>} onClick={() => {
          document.getElementById("excel-import")?.click();
        }}>
        Import
        </Button>
        <Button type="default" className="align-self-end mx-2" icon={<DownloadOutlined/>} onClick={() => {
          window.open(template);
        }}>
        Download template
        </Button>
        <Input type="file" className="hide hidden d-none" id="excel-import" onChange={onImport} />
      </>
    )}
    <Button type="primary" className="align-self-end" icon={<PlusOutlined/>} onClick={onAdd}>
            Create
    </Button>
  </div>;
};
