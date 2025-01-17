"use client";
import { useEffect, useState } from "react";
import { LuMenu, LuPlus } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import TagModal from "./components/TagModal";
import { ChangeEvent } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiImport, BiExport, BiFilterAlt, BiSave } from "react-icons/bi";
import { FaTags } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegNoteSticky } from "react-icons/fa6";
import ConfirmationModal from "./components/ConfirmationModal";
import { AiOutlineClear } from "react-icons/ai";
import { LiaDiceSolid } from "react-icons/lia";
// import { useRouter } from "next/navigation";
import IdeaModal from "./components/IdeaModal";

export default function Note() {
  // const router = useRouter();

  const [notes, setNotes] = useState<
    {
      title: string;
      datetime: string;
      tag: string[];
      content: string;
    }[]
  >([]);
  const [noteDisplayed, setNoteDisplayed] = useState({
    title: "",
    datetime: "",
    tag: [] as string[],
    content: "",
  });
  const [mainTagsList, setMainTagsList] = useState<string[]>([]);
  const [tagModalToggle, setTagModalToggle] = useState(false);
  // const [importFile, setImportFile] = useState<string | ArrayBuffer | null>();
  const [menuToggle, setMenuToggle] = useState<boolean>(false);
  const [menuFilter, setMenuFilter] = useState<string>("");
  const [filterResult, setFilterResult] = useState<
    {
      title: string;
      datetime: string;
      tag: string[];
      content: string;
    }[]
  >([]);
  const [filterType, setFilterType] = useState<string>("Title");
  const [deleteConfirmationModalToggle, setDeleteConfirmationModalToggle] =
    useState(false);
  const [saveConfirmationModalToggle, setSaveConfirmationModalToggle] =
    useState(false);
  const [clearConfirmationModalToggle, setClearConfirmationModalToggle] =
    useState(false);
  const [ideaModalToggle, setIdeaModalToggle] = useState(false);
  const [navTo, setNavTo] = useState("clear");

  useEffect(() => {
    // function setDateTime() {
    const time = new Date();
    setNoteDisplayed({
      ...noteDisplayed,
      datetime: String(time),
    });
    // }
  }, [noteDisplayed.title, noteDisplayed.tag, noteDisplayed.content]);

  function saveNote() {
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].title === noteDisplayed.title) {
        notes.splice(i, 1);
        setNotes([...notes, noteDisplayed]);
        if (navTo == "clear") {
          clearNote();
          return;
        }
        setDisplayedNote(navTo);
      }
    }
  }

  function exportFile() {
    const displayedNote = JSON.stringify(noteDisplayed);
    let content = displayedNote.concat("notes-start");
    for (let i = 0; i < notes.length; i++) {
      content = content.concat(JSON.stringify(notes[i]));
      content = content.concat("notes-separator");
    }
    const file = new Blob([content], { type: "text/plain;charset=utf-8" });
    const el = document.createElement("a");
    el.href = URL.createObjectURL(file);
    el.download = "dm-note.txt";
    document.body.appendChild(el);
    el.click();
  }

  async function handleImport(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const data = await file.text();
      const dataArrays = data.split("notes-start");
      setNoteDisplayed(JSON.parse(dataArrays[0]));
      type noteListType = {
        title: string;
        datetime: string;
        tag: string[];
        content: string;
      }[];
      const notesList = dataArrays[1].split("notes-separator");
      const notesListProcessed: noteListType = [];
      // ^ Change const to let if there's issue here
      for (let i = 0; i < notesList.length; i++) {
        if (notesList[i] != "") {
          notesListProcessed[i] = JSON.parse(notesList[i]);
        }
      }
      setNotes(notesListProcessed);
      const mTagsList = [];
      // ^ Change const to let if there's issue here
      for (let i = 0; i < notesListProcessed.length; i++) {
        for (let j = 0; j < notesListProcessed[i].tag.length; j++) {
          if (mainTagsList.length) {
            for (let k = 0; k < mainTagsList.length; k++) {
              if (
                mainTagsList[k].toLowerCase() !=
                notesListProcessed[i].tag[j].toLowerCase()
              ) {
                mTagsList.push(notesListProcessed[i].tag[j]);
              }
            }
          }
          mTagsList.push(notesListProcessed[i].tag[j]);
        }
      }
      setMainTagsList(mTagsList);
    }
  }

  useEffect(() => {
    console.log(`mainList:${mainTagsList}`);
  });

  function setDisplayedNote(title: string) {
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].title === title) {
        setNoteDisplayed(notes[i]);
        return;
      }
    }
  }

  function addNote() {
    if (noteDisplayed.title == "") {
      toast.error("You need a title ty!", {
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
    if (checkIfTitleExist() === true) {
      toast.error("Ayo Bro/Sis No Same Title Tysm!", {
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
    setNotes([...notes, noteDisplayed]);
    clearNote();
  }

  function checkIfTitleExist() {
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].title === noteDisplayed.title) {
        return true;
      }
    }
    return false;
  }

  function toggleMenu() {
    setMenuToggle(!menuToggle);
  }

  function deleteNote(title: string) {
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].title === title) {
        notes.splice(i, 1);
        clearNote();
        return;
      }
    }
  }

  function newNote() {
    //if not empty
    if (!checkIfEmpty()) {
      if (checkIfTitleExist() === true) {
        if (checkIfRemainedSame()) {
          setNoteDisplayed(noteTemplate);
          return;
        }
        setNavTo("clear");
        setSaveConfirmationModalToggle(true);
        return;
      }
      addNote();
      return;
    }
    clearNote();
  }

  const noteTemplate = {
    title: "",
    datetime: "",
    tag: [] as string[],
    content: "",
  };

  function clearNote() {
    setNoteDisplayed(noteTemplate);
  }

  useEffect(() => {
    // function setResult() {
    if (menuFilter == "") {
      setFilterResult(notes);
      return;
    }
    if (filterType == "Title") {
      setFilterResult(
        notes.filter((note) =>
          note.title.toLowerCase().includes(menuFilter.toLowerCase())
        )
      );
      return;
    }
    if (filterType == "Tags") {
      const result = [];
      // ^ Change const to let if there's issue here
      for (let i = 0; i < notes.length; i++) {
        for (let j = 0; j < notes[i].tag.length; j++) {
          if (notes[i].tag[j].toLowerCase() === menuFilter.toLowerCase()) {
            result.push(notes[i]);
          }
        }
      }
      setFilterResult(result);
      // setFilterResult(notes.filter((note) => note.tag.includes(menuFilter)));
      return;
    }
    if (filterType == "Content") {
      setFilterResult(
        notes.filter((note) =>
          note.content.toLowerCase().includes(menuFilter.toLowerCase())
        )
      );
      return;
    }
    // }
  }, [menuFilter, notes, filterType]);

  function checkIfRemainedSame() {
    for (let i = 0; i < notes.length; i++) {
      if (
        JSON.stringify({
          ...noteDisplayed,
          datetime: "",
        }) === JSON.stringify({ ...notes[i], datetime: "" })
      ) {
        return true;
      }
    }
    return false;
  }

  function checkIfEmpty() {
    if (
      JSON.stringify({
        ...noteDisplayed,
        datetime: "",
      }) == JSON.stringify(noteTemplate)
    ) {
      return true;
    }
    return false;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Window/unload_event#browser_compatibility
  window.onbeforeunload = (event) => {
    const e = event || window.event;
    // Cancel the event
    e.preventDefault();
    if (e) {
      e.returnValue = ""; // Legacy method for cross browser support
    }
    return ""; // Legacy method for cross browser support
  };

  return (
    <div
      className="text-white h-screen pt-5 bg-black bg-opacity-50"
      style={{
        backgroundImage: "url(/bg-fantasy.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
      }}
    >
      {/* bg-black  */}
      <ToastContainer />
      {/* delete confirmation */}
      <ConfirmationModal
        modalToggle={deleteConfirmationModalToggle}
        setModalToggle={setDeleteConfirmationModalToggle}
        message={`Do you want to delete ${noteDisplayed.title} ?`}
        functionToRun={() => deleteNote(noteDisplayed.title)}
        otherFunctionToRunIfNo={() => {}}
      />
      {/* save confirmation */}
      <ConfirmationModal
        modalToggle={saveConfirmationModalToggle}
        setModalToggle={setSaveConfirmationModalToggle}
        message={`Do you want to overwrite the previous record of ${noteDisplayed.title} ?`}
        functionToRun={saveNote}
        otherFunctionToRunIfNo={() =>
          navTo == "clear"
            ? setNoteDisplayed(noteTemplate)
            : setDisplayedNote(navTo)
        }
      />
      {/* Clear Confirmation */}
      <ConfirmationModal
        modalToggle={clearConfirmationModalToggle}
        setModalToggle={setClearConfirmationModalToggle}
        message={`Do you want to clear the current displayed note?`}
        functionToRun={clearNote}
        otherFunctionToRunIfNo={() => {}}
      />
      {/* Set/Add Tag modal */}
      <TagModal
        modalToggle={tagModalToggle}
        setModalToggle={setTagModalToggle}
        mainTagsList={mainTagsList}
        setMainTagsList={setMainTagsList}
        noteDisplayed={noteDisplayed}
        setNoteDisplayed={setNoteDisplayed}
      />
      {/* Idea Randomiser Modal */}
      <IdeaModal
        modalToggle={ideaModalToggle}
        setModalToggle={setIdeaModalToggle}
        mainTagsList={mainTagsList}
      />
      <div className="top px-5 py-1 flex-ca justify-between">
        <div>
          <input
            type="text"
            name="title"
            id="title"
            className="px-1 text-2xl text-black"
            placeholder="Title"
            value={noteDisplayed.title}
            onChange={(e) => {
              setNoteDisplayed({
                ...noteDisplayed,
                title: e.target.value,
              });
            }}
          />
          {/* <span className="italic">
            <sub>last updated by {noteDisplayed.datetime}</sub>
          </span> */}
        </div>

        <div className="cta-btn flex gap-2">
          <FaRegNoteSticky
            className="cta"
            aria-label="New Note"
            title="New Note"
            onClick={newNote}
            size={"1.5rem"}
          />
          {checkIfTitleExist() ? (
            <BiSave
              className="cta"
              aria-label="Save Note"
              title="Save Note"
              onClick={() => {
                setNavTo("clear");
                setSaveConfirmationModalToggle(true);
              }}
              size={"1.5rem"}
            />
          ) : (
            <LuPlus
              className="cta"
              aria-label="Add Note"
              title="Add Note"
              onClick={addNote}
              size={"1.5rem"}
            />
          )}
          {checkIfTitleExist() && (
            <MdOutlineDelete
              className="cta"
              aria-label="Delete Note"
              title="Delete Note"
              onClick={() => setDeleteConfirmationModalToggle(true)}
              // onClick={() => deleteNote(noteDisplayed.title)}
              size={"1.5rem"}
            />
          )}
          <label htmlFor="import-input">
            <BiImport
              className="cta"
              aria-label="Import File"
              title="Import File"
              size={"1.5rem"}
            />
            <input
              type="file"
              name="import-input"
              id="import-input"
              accept=".txt"
              onChange={(e) => handleImport(e)}
              hidden
            />
          </label>
          <BiExport
            className="save-button cta"
            aria-label="Export File"
            title="Export File"
            onClick={exportFile}
            size={"1.5rem"}
          />
          <AiOutlineClear
            className="clear-button cta"
            aria-label="Clear"
            title="Clear"
            onClick={() => {
              if (!checkIfEmpty()) {
                setClearConfirmationModalToggle(true);
              }
            }}
            size={"1.5rem"}
          />
          {/* <LiaDiceSolid
            className="idea-button cta"
            aria-label="Idea"
            title="Idea"
            onClick={() => router.push("/idea")}
            size={"1.5rem"}
          /> */}
          <LiaDiceSolid
            className="idea-button cta"
            aria-label="Idea"
            title="Idea"
            onClick={() => setIdeaModalToggle(true)}
            size={"1.5rem"}
          />
          <LuMenu
            className="menu-button cta"
            aria-label="Menu"
            title="Menu"
            onClick={toggleMenu}
            size={"1.5rem"}
          />
        </div>
      </div>
      <div className="tags px-5 py-2 w-fit flex-ca ">
        <FaTags
          className="Tags"
          size={"1.5rem"}
          aria-label="Tags"
          title="Tags"
        />
        {noteDisplayed.tag.length > 0 && <div className="spacing mx-1"></div>}
        {noteDisplayed.tag.map((tag) => {
          return (
            <div
              className="tag-container flex-ca mx-0.5 cursor-default"
              key={tag}
            >
              {tag}{" "}
              <IoClose
                className="cta inline ml-2"
                aria-label="Remove Tag"
                title="Remove Tag"
                onClick={() => {
                  // setMainTagsList(mainTagsList.filter((t) => t != tag));
                  // ^ other notes might have same tag that should still remain
                  // noteDisplayed.tag = noteDisplayed.tag.filter((t) => t != tag);
                  setNoteDisplayed({
                    ...noteDisplayed,
                    tag: noteDisplayed.tag.filter((t) => t != tag),
                  });
                }}
              />
            </div>
          );
        })}

        <LuPlus
          className="cta ml-2"
          aria-label="Add Tag"
          title="Add Tag"
          onClick={() => {
            setTagModalToggle(true);
          }}
        />
      </div>
      {/* hidden menu */}
      <div
        className="menu px-2 py-16 h-screen w-80 fixed right-0 top-0 bg-black bg-opacity-80 flex-ca flex-col gap-2 justify-start"
        style={{
          display: menuToggle ? "flex" : "none",
          transition: "display 1s",
          backgroundImage: "url(/reading-book.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
          backgroundPosition: "center",
          animation: "fadeIn 0.3s",
          WebkitAnimation: "fadeIn 0.3s",
        }}
      >
        <LuMenu
          // color="white"
          className="menu-button cta menu fixed right-5 top-7"
          aria-label="Menu"
          title="Menu"
          onClick={toggleMenu}
          size={"1.5rem"}
        />
        <input
          type="text"
          name="search-bar"
          id="search-bar"
          className="px-1 text-black"
          value={menuFilter}
          placeholder="Filter"
          onChange={(e) => {
            setMenuFilter(e.target.value);
          }}
        />
        <div className="filter-set flex-ca gap-3">
          <BiFilterAlt
            className=""
            size={"1.5rem"}
            aria-label="Tags"
            title="Tags"
          />
          <select
            name="filter"
            id="filter"
            className="text-black"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
            }}
          >
            <option value="Title">Title</option>
            <option value="Tags">Tags</option>
            <option value="Content">Content</option>
          </select>
        </div>
        <div className="notes-label font-black text-2xl leading-6">Notes</div>
        <div className="note-titles overflow-auto">
          {filterResult.map((note) => {
            return (
              <div
                className="note-title text-white cursor-pointer text-xl text-center	"
                key={note.title}
                onClick={() => {
                  if (checkIfEmpty()) {
                    setDisplayedNote(note.title);
                    return;
                  }
                  if (!checkIfEmpty()) {
                    if (checkIfTitleExist() === true) {
                      if (checkIfRemainedSame()) {
                        setDisplayedNote(note.title);
                        return;
                      }
                      setNavTo(note.title);
                      setSaveConfirmationModalToggle(true);
                      return;
                    }
                    addNote();
                    return;
                  }
                }}
              >
                {note.title}
              </div>
            );
          })}
        </div>
      </div>
      <div className="content-container w-screen h-fit flex px-5 py-2">
        <textarea
          name="content"
          id="content"
          className="content px-3 py-2 flex-1 h-fit text-black rounded big-input"
          placeholder="Note Here!"
          value={noteDisplayed.content}
          onChange={(e) => {
            setNoteDisplayed({
              ...noteDisplayed,
              content: e.target.value,
            });
          }}
        ></textarea>
      </div>
    </div>
  );
}
