import { UserInfo } from "os";

interface NewTripProps {
    tripDetails: {
        title: string,
        description: string,
        travelers: string[],
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// export const NewTripForm: React.FC<NewTripProps> = ({Trip,
//     handleInputChange,
// })=>{
export const NewTripForm: React.FC<NewTripProps> = ({ tripDetails,
    handleInputChange,}) => {
    return (
        <div className="container mx-auto p-6">
                <div className="">
                    <input
                        type="text"
                        name="tripName"
                        placeholder="Title of Trip"
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="h-full">
                    <textarea
                        name="description"
                        placeholder="Describe your getaway..."
                        onChange={()=> handleInputChange}
                        className="input input-bordered w-full min-h-[3rem]"
                    />
                </div>
        </div>
    )
}