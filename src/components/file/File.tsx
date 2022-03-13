import React, {ChangeEvent, useState} from "react";

export const File = ({className, onChangeFile, ...props}: PhotoPropsType) => {
    const [file, setFile] = useState<File>();
    const [fileURL, setFileURL] = useState<string>();
    const [fileData, setFileData] = useState<FormData>();

    const uploadPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const formData = new FormData();

        const newFile = e.target.files && e.target.files[0];

        if (newFile) {
            setFile(newFile)
            setFileURL(window.URL.createObjectURL(newFile));
            formData.append('photo', newFile, newFile.name);
            setFileData(formData);
            reader.readAsDataURL(newFile);
            reader.onloadend = () => {
                onChangeFile && onChangeFile(reader.result);
            }
        }
    }

    return (
        <>
            <input className={className} type='file' accept=".jpg, .jpeg, .png" multiple
                   onChange={uploadPhoto}/>
        </>
    )
}

type PhotoPropsType = {
    className?: string
    onChangeFile?: (file: string | ArrayBuffer | null) => void
}