import { Item } from "./ContactContext.Instance";

export interface ContactModelProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  item : any
  isUpdate : boolean
}
