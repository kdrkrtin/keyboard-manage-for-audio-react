import app from "./firebase";
import { getDatabase, ref, set } from "firebase/database";

const database = getDatabase(app);
const { userId } = JSON.parse(localStorage.getItem("userAuth")) || "";
const dbRef = ref(database, `audios/${userId}`);

const setAudios = (audioList) => {
  if (Array.isArray(audioList) && audioList.length) set(dbRef, audioList);
};

const deleteItem = (newAudios) => {
  if (Array.isArray(newAudios) && newAudios.length) set(dbRef, newAudios);
};

export { setAudios, deleteItem };
