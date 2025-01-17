"use client";
import Modal from "./Modal";
import { Dispatch, SetStateAction } from "react";
import "react-toastify/dist/ReactToastify.css";
import { FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

type ConfirmationModalType = {
  modalToggle: boolean;
  setModalToggle: Dispatch<SetStateAction<boolean>>;
  message: string;
  functionToRun: Function;
  otherFunctionToRunIfNo: Function;
};
export default function ConfirmationModal({
  modalToggle,
  setModalToggle,
  message,
  functionToRun,
  otherFunctionToRunIfNo = () => {},
}: ConfirmationModalType) {
  return (
    <Modal modalToggle={modalToggle} setModalToggle={setModalToggle}>
      <div className="modal-title text-center text-xl py-1 font-bold">
        Confirmation
      </div>
      {message}
      <div className="cta-group flex-ca gap-5 mt-2 mb-1">
        <FaCheck
          className="cta confirm-button"
          size={"1.5rem"}
          onClick={() => {
            functionToRun();
            setModalToggle(false);
          }}
        />
        <IoCloseSharp
          className="cta cancel-button"
          size={"1.5rem"}
          onClick={() => {
            otherFunctionToRunIfNo();
            setModalToggle(false);
          }}
        />
      </div>
    </Modal>
  );
}
