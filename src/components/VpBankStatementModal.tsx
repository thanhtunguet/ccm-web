import { Input, Modal, ModalProps } from "antd";

interface VpBankStatementModalProps extends ModalProps {

    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
 }

export const VpBankStatementModal = (props: VpBankStatementModalProps) => {
  const { open, confirmLoading, onCancel, onOk, onChange } = props;
  return (
    <Modal confirmLoading={confirmLoading} title="Nhập sao kê VPBank" 
      open={open} 
      onOk={onOk}
      onCancel={onCancel}
    >
      <Input.TextArea rows={10}
        onChange={onChange}
        placeholder="TT MC CHO TID R1430747 NGAY GD 24/04/30 07.52.28 SO THE 524394...1742 CODE 886172 SO TIEN 32596000 VND (1) PHI 391152VND VAT 39115VND TG 1 RRN 412189474136
TT MC CHO TID R1430747 NGAY GD 24/04/30 07.56.00 SO THE 524394...1742 CODE 886173 SO TIEN 12004000 VND (1) PHI 144048VND VAT 14405VND TG 1 RRN 412189474456"></Input.TextArea>
    </Modal>
  );
};