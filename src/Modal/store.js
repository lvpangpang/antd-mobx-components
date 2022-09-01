import { makeAutoObservable } from "mobx";
import { isPromise } from "js-common-library";
import { overrideStore, resetStore } from "../utils";

class ModalStore {
  constructor(overrides) {
    overrideStore(this, overrides);
    makeAutoObservable(this);
  }

  visible = false;
  openValues;
  onOpen = () => {
    return this.openValues;
  };
  open = async (data) => {
    this.visible = true;
    this.openValues = data;
    this.openValues = await this.onOpen(data);
    console.log("openValues", this.openValues);
  };

  loading = false;
  handleOk = async () => {
    const handle = this.onOk(this.openValues);
    if (isPromise(handle)) {
      this.loading = true;
      handle.finally(() => {
        this.loading = false;
      });
    }
  };

  close = () => {
    this.visible = false;
  };

  onOk = () => {
    this.close();
    return null;
  };

  resetStore = () => {
    resetStore(this, ModalStore);
  };
}

export default ModalStore;
