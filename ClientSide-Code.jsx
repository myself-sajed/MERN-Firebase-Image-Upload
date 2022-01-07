import React from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../firebase/config";

const ClientSide_Code = () => {
    // Initializing states

    const [selfDeclaration, setSelfDeclaration] = useState('')
    const [aadhar, setAadhar] = useState('')
    const [voter, setVoter] = useState('')
    const [itr, setItr] = useState('')
    const [disability, setDisability] = useState('')
    const [ration, setRation] = useState('')


    // Function for uploading documents after form submission

    function uploadDocuments(e) {
        e.preventDefault();


        // Sending documents to server 

        const documentArray = [{ file: selfDeclaration, name: 'selfDeclaration', i: 1 }, { file: aadhar, name: 'aadhar', i: 2 }, { file: voter, name: 'voter', i: 3 }, { file: itr, name: 'itr', i: 4 }, { file: disability, name: 'disability', i: 5 }, { file: ration, name: 'ration', i: 6 }]


        // Sending documents to firebase store
        const uploadArray = [];
        // const newuploadArray = [];
        //initiates the firebase side uploading 
        documentArray.forEach(async function (document, index) {
            if (document.file) {
                setProgressShow(true);
                const fileName = document.name + new Date().getTime() + document.file.name;
                const storageRef = ref(
                    storage,
                    `/application/${appId}/${fileName}`
                );
                const uploadTask = uploadBytesResumable(storageRef, document.file);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const uploaded = Math.floor(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setProgress(uploaded);
                    },
                    (error) => {
                        console.log(error);
                    },
                    async () => {
                        await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                            console.log(document.name, ': ', url);
                            uploadArray.push({ filename: document.name, fileUrl: url });
                            // newuploadArray.splice(index, 0, { filename: document.name, fileUrl: url })
                            console.log('individual', uploadArray);
                            if (uploadArray.length === 6) {
                                uploadArray.push({ refApplication: appId, refVle: vleId, filename: 'vleDetails' });
                                // newuploadArray.push({ refApplication: appId, refVle: vleId })
                                // console.log(newuploadArray);


                                Axios.post('http://localhost:4000/upload/', uploadArray)
                                    .then(function (response) {
                                        console.log(response.data);
                                    })
                                    .catch(function (err) {
                                    });
                            }
                        });

                    }
                );
            } else {
                uploadArray.push({ filename: document.name, fileUrl: 'null' });
                // newuploadArray.splice(index, 0, { filename: document.name, fileUrl: 'null' })

                console.log('individual', uploadArray);
                if (uploadArray.length === 6) {
                    uploadArray.push({ refApplication: appId, refVle: vleId, fileName: 'vleDetails' });
                    // newuploadArray.push({ refApplication: appId, refVle: vleId })
                    // console.log(newuploadArray);

                    Axios.post('http://localhost:4000/upload/', uploadArray)
                        .then(function (response) {
                            console.log(response.data);
                        })
                        .catch(function (err) {
                        });
                }
            }
        })
    }
    return (
        <div>

        </div>
    )
}

export default ClientSide_Code
