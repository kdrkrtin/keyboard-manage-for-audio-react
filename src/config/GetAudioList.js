import app from "./firebase";
import { getDatabase, ref, get } from "firebase/database";

const database = getDatabase(app);

const getAudios = () => {
  const { userId } = JSON.parse(localStorage.getItem("userAuth"));
  const dbRef = ref(database, `audios/${userId}`);
  return get(dbRef);
};

export { getAudios };
