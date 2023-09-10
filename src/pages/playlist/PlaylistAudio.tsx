import viewCounter from "../../utils/viewConter";
import HHMMSS from "../../utils/HH-MM-SS";
// import { useNavigate } from "react-router-dom";
import RemoveIcon from '@mui/icons-material/Add';
import { useDispatch } from "react-redux";
import { deleteItemFromPlaylist } from "@/store/playlistSlice/PlaylistReducer";

type PlaylistAudioProps = {
    audio: Audio;
    handleUpdate: Function;
    playlistID: string;
};

const PlaylistAudio = ({ audio, handleUpdate, playlistID }: PlaylistAudioProps) => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRemove = (ID: string) => {
        dispatch(deleteItemFromPlaylist({playlist: playlistID, ID}))
        handleUpdate();
    }

    return (
        <div
            // onClick={() => navigate(`/detail?id=${audio.videoDetail.videoId}`)}
            className="cursor-pointer text-white w-full h-[200px] border border-stone-700 rounded-2xl flex gap-x-1 hover:bg-stone-700"
        >
            <div className="w-[330px] h-[100%] p-3">
                <img
                    src={
                        audio.videoDetail.thumbnail.thumbnails.filter(
                            (tumb) => tumb.width === 1920
                        )[0].url
                    }
                    alt={audio.videoDetail.title}
                    className="aspect-audio	 w-[100%] h-[100%] rounded-xl shadow shadow-black"
                />
            </div>
            <div className="flex-1 h-[100%] p-3 py-5 pr-8">
                <div className="w-full flex justify-between items-center">
                    <h2 className="hover:text-white/75 mt-2">
                        {audio.videoDetail.title}
                    </h2>
                    <RemoveIcon onClick={() => handleRemove(audio.videoDetail.videoId)} style={{fontSize: "33px"}} className="rotate-45"/>
                </div>
                <div className="text-sm text-stone-400 flex items-center gap-x-3 mt-1">
                    <p>{viewCounter(+audio.videoDetail.viewCount, 0)} View</p>
                    <p>{HHMMSS(+audio.videoDetail.lengthSeconds)}</p>
                </div>
                <div className="flex items-center gap-x-2 mt-3 text-stone-200">
                    <h4>{audio.videoDetail.author}</h4>
                </div>
                <div className="mt-10 w-[550px] max-w-[70%]">
                    <p className="truncate text-sm text-white text-opacity-60">
                        {audio.videoDetail.shortDescription}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PlaylistAudio;
