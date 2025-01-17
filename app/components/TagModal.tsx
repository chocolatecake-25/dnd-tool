"use client";
import Modal from "./Modal";
import { Dispatch, SetStateAction, useState } from "react";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type TagModalType = {
  modalToggle: boolean;
  setModalToggle: Dispatch<SetStateAction<boolean>>;
  mainTagsList: string[];
  setMainTagsList: Dispatch<SetStateAction<string[]>>;
  noteDisplayed: {
    title: string;
    datetime: string;
    tag: string[];
    content: string;
  };
  setNoteDisplayed: Dispatch<
    SetStateAction<{
      title: string;
      datetime: string;
      tag: string[];
      content: string;
    }>
  >;
};
export default function TagModal({
  modalToggle,
  setModalToggle,
  mainTagsList,
  setMainTagsList,
  noteDisplayed,
  setNoteDisplayed,
}: TagModalType) {
  const [tagChosen, setTagChosen] = useState("New");
  const [tagInput, setTagInput] = useState("");
  function addTag() {
    // if (tagChosen != "New" && tagList.length > 0) {
    if (tagChosen != "New") {
      setNoteDisplayed({
        ...noteDisplayed,
        tag: [...noteDisplayed.tag, tagChosen],
      });
      // setMainTagsList([...mainTagsList, tagChosen]);
      setTagChosen("New");
      setModalToggle(false);
      return;
    }
    if (tagInput != "") {
      for (let i = 0; i < mainTagsList.length; i++) {
        if (mainTagsList[i] === tagInput) {
          toast.error("Ayo Ya Alr had this Tag bruv!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          return;
        }
      }
      setNoteDisplayed({
        ...noteDisplayed,
        tag: [...noteDisplayed.tag, tagInput],
      });
      setMainTagsList([...mainTagsList, tagInput]);
      setTagInput("");
      setModalToggle(false);
    }
  }

  // function checkAnyDiffTag() {
  //   for (let i = 0; i < mainTagsList.length; i++) {
  //     for (let j = 0; j < noteDisplayed.tag.length; j++) {
  //       if (mainTagsList[i] != noteDisplayed.tag[j]) {
  //         return true;
  //       }
  //     }
  //   }
  //   return false;
  // }

  return (
    <Modal modalToggle={modalToggle} setModalToggle={setModalToggle}>
      <div className="modal-title text-center text-xl py-1 font-bold">Tag</div>
      {/* {mainTagsList.length > 0 && checkAnyDiffTag() && ( */}
      <select
        name="tag-list"
        id="tag-list"
        value={tagChosen}
        className="text-black min-w-16 text-center m-2"
        onChange={(e) => {
          setTagChosen(e.target.value);
        }}
      >
        <option value="New" key="New">
          New
        </option>
        {mainTagsList.map((tag) => {
          return !noteDisplayed.tag.includes(tag) ? (
            <option value={tag} key={tag}>
              {tag}
            </option>
          ) : null;
        })}
      </select>
      {/* )} */}

      {tagChosen == "New" && (
        <div className="custom-input mt-2">
          <input
            type="text"
            name="custom-input"
            id="custom-input"
            placeholder="New Tag"
            className="player-input player-input-long text-black"
            value={tagInput}
            onChange={(e) => {
              setTagInput(e.target.value);
            }}
          />
        </div>
      )}
      <div
        className="cta add-button font-medium text-center mt-2"
        onClick={() => {
          addTag();
          // setModalToggle(false);
        }}
      >
        Add
      </div>
    </Modal>
  );
}
