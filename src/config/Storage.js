import app from "./firebase";
import { getStorage, ref, listAll, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage(app);

const listRef = ref(storage);

const getStorageData = () => {
  listAll(listRef)
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
};

const uploadData = (file) => {
    const storageRef = ref(storage, `audios/${file.name}`)
    return uploadBytes(storageRef, file).then(() => getDownloadURL(storageRef))
}

export { getStorageData, uploadData };
