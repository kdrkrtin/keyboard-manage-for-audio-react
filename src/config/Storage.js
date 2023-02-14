import app from "./firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";

const storage = getStorage(app);
const listRef = ref(storage, "audios");
let audioList = [];

listAll(listRef).then(({ items }) => audioList = items);

const uploadData = (file) => {
  const storageRef = ref(storage, `audios/${file.name}`);
  const sameFile = audioList.filter((aud) => aud.name === file.name);
  return sameFile.length ? getDownloadURL(storageRef) : uploadBytes(storageRef, file).then(() => {
    listAll(listRef).then(({ items }) => audioList = items);
    return getDownloadURL(storageRef);
  });
};

export { uploadData };
