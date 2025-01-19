import { ReactNode, Dispatch, SetStateAction } from "react";
import { IoClose } from "react-icons/io5";

type ModalProps = {
  children: ReactNode;
  modalToggle: boolean;
  setModalToggle: Dispatch<SetStateAction<boolean>>;
};

export default function Modal({
  children,
  modalToggle = true,
  setModalToggle,
}: ModalProps) {
  return (
    <div className="z-10">
      {modalToggle && (
        // {modalToggle && toggle && (
        <div
          className="modal-bg h-screen w-screen bg-black bg-opacity-50 fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-ca"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setModalToggle(false);
            }
          }}
        >
          <div className="modal bg-black w-fit h-fit relative z-50 p-3 rounded pt-7 min flex-ca flex-col">
            <div
              onClick={() => setModalToggle(false)}
              className="cta absolute top-2 right-2 w-fit"
            >
              <IoClose size={"1.5rem"} />
            </div>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
