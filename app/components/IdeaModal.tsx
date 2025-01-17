"use client";
import Modal from "./Modal";
import { Dispatch, SetStateAction, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

type IdeaModalType = {
  modalToggle: boolean;
  setModalToggle: Dispatch<SetStateAction<boolean>>;
  mainTagsList: string[];
};
export default function IdeaModal({
  modalToggle,
  setModalToggle,
  mainTagsList,
}: IdeaModalType) {
  const [basicPool, setBasicPool] = useState<string[]>([
    "NPC",
    "Location",
    "Event",
    "Item",
    "Organisation",
  ]);
  const [complexPool, setComplexPool] = useState<string[]>([
    "NPC - Villain",
    "NPC - Small Folks",
    "NPC - Royalty",
    "NPC - Expert",
    "NPC - Person of Interest",
    "NPC - Leader",
    "NPC - Merchant",
    "Location - Continent",
    "Location - Kingdom",
    "Location - Province",
    "Location - City",
    "Location - Area",
    "Location - Town",
    "Location - Village",
    "Location - Special Areas",
    "Event - Historical Event",
    "Event - Current Event",
    "Event - Future Event/Plan",
    "Item - Magic Items",
    "Item - Relics",
    "Item - Special Resources",
    "Organisation - Continent",
    "Organisation - Kingdom",
    "Organisation - Province",
    "Organisation - City",
    "Organisation - Area",
    "Organisation - Town",
    "Organisation - Village",
  ]);

  function generateIdea(pool: string[]) {
    const randomElement = pool[Math.floor(Math.random() * pool.length)];
    toast.success(`Idea: ${randomElement}`, {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

  function checkIfEmpty(pool: string[]) {
    if (pool.length < 1) {
      return true;
    }
    return false;
  }

  return (
    <Modal modalToggle={modalToggle} setModalToggle={setModalToggle}>
      <div className="modal-title text-center text-xl py-1 font-bold">
        Idea-i-nator
      </div>
      <div className="cta-group flex-ca">
        {/* Might need to have a tooltip or something to tell them what is in the pools */}
        <div
          className="basic-button cta idea-btn"
          onClick={() => {
            generateIdea(basicPool);
          }}
          aria-label="Generate Idea from Basic Pool"
          title="Generate Idea from Basic Pool"
        >
          Basic
        </div>
        <div
          className="basic-button cta idea-btn"
          onClick={() => {
            generateIdea(complexPool);
          }}
          aria-label="Generate Idea from Basic Pool"
          title="Generate Idea from Basic Pool"
        >
          <sub>lil bit more</sub> Specific
        </div>
        <div
          className="tag-button cta idea-btn"
          onClick={() => {
            checkIfEmpty(mainTagsList) ? null : generateIdea(mainTagsList);
          }}
          style={{
            cursor: checkIfEmpty(mainTagsList) ? "not-allowed" : "pointer",
            // color: checkIfEmpty(mainTagsList) ? "rgba(0, 0, 0, 1)" : "white",
          }}
          aria-label="Generate Idea from the Tags List"
          title="Generate Idea from the Tags List"
        >
          Tags
        </div>
      </div>
      {/* a btn to add the chosen tag to the displayedNote, so will need a state to save the chosen idea */}
      {/* <div className="cta-group flex-ca gap-5 mt-2 mb-1">
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
      </div> */}
    </Modal>
  );
}
