import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {FC} from "react";

export interface TableHeaderProps {
  onAdd(): void;
}

export const TableHeader: FC<TableHeaderProps> = (props: TableHeaderProps) => {
  const {
    onAdd,
  } = props;
  return <div className="d-flex justify-content-end">
    <Button type="primary" className="align-self-end" icon={<PlusOutlined/>} onClick={onAdd}>
      Create
    </Button>
  </div>;
};
