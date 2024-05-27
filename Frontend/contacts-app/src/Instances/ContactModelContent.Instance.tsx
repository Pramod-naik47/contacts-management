export interface ContactModelContentProps {
    submitHandler: (
      name: string,
      email: string,
      number: string,
      address: string
    ) => void;
    onClose: () => void;
    item : any,
    isUpdate : boolean,
    updateHandler: (
        name: string,
        email: string,
        number: string,
        address: string,
        id? : string,
      ) => void;
  }

