import { useState, useSyncExternalStore } from "react";
import { FileDrop } from "react-file-drop";


export default function Cover(){
    const [isFileNearby, setIsFileNearby] = useState(false);
    const [isFileOver, setIsFileOver] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    let extraClasses = '';
    if(isFileNearby && !isFileOver) extraClasses += ' bg-white';
    if(isFileOver) extraClasses += ' bg-blue-500';

    function updateImage(files, e){
        e.preventDefault();
        setIsFileNearby(false);
        setIsFileOver(false);
        setIsUploading(true);
        const data = new FormData();
        data.append('cover', files[0]);
        fetch('/api/upload',{
            method: 'POST',
            body:data,
        }).then(() =>{
            setIsUploading(false);
        });
    }

    return (
        <FileDrop
        onDrop={updateImage}
            onDragOver={ () => setIsFileOver(true)}
            onDragLeave={() => setIsFileOver(false) }
            onFrameDragEnter={() => setIsFileNearby(true)}
            onFrameDragLeave={() => setIsFileNearby(false)}
        >
            <div className={"h-36 bg-twitterBorder text-white" + extraClasses} >
                {isUploading ? 'upload' : ''}
            </div>
        </FileDrop>

    )
}