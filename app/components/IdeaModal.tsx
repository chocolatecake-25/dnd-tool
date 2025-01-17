"use client";
import Modal from "./Modal";
import { Dispatch, SetStateAction, useState } from "react";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const basicPool = ["NPC", "Location", "Event", "Item", "Organisation"];
  const complexPool = [
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
  ];

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
            if (!checkIfEmpty(mainTagsList)) {
              generateIdea(mainTagsList);
            }
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
    </Modal>
  );
}
