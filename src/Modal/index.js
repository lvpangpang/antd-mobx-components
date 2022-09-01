import { Modal } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import ModalStore from "./store";
function MyModal(props) {
  const { store, children, ...restProps } = props;
  const $modalStore = store.$modalStore || store;
  if (!$modalStore) {
    console.error("Modal必须传入store且必须是ModalStore的实例");
    return null;
  }
  const { visible, loading, handleOk, close, resetStore } = $modalStore;
  useEffect(() => {
    return () => {
      resetStore();
    };
  }, []);
  return (
    <Modal
      visible={visible}
      confirmLoading={loading}
      onOk={handleOk}
      onCancel={close}
      {...restProps}
    >
      {children}
    </Modal>
  );
}

function useStore(overrides) {
  return new ModalStore(overrides);
}

MyModal.useStore = useStore;
MyModal.confirm = Modal.confirm;
MyModal.confirm = Modal.confirm;
MyModal.info = Modal.info;
MyModal.success = Modal.success;
MyModal.error = Modal.error;
MyModal.warning = Modal.warning;

export default observer(MyModal);
