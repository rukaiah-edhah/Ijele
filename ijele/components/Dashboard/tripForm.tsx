import { UserInfo } from "os";

interface NewTripProps {
    tripDetails: {
        tripTitle: string,
        location: string,
        description: string,
        people: string
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
interface CardArray{
    tripDetailsArr: NewTripProps[],
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export const NewTripForm: React.FC<NewTripProps> = ({ tripDetails,
    handleInputChange, }) => {
    return (
        <div className="container mx-auto p-6">
            <div className="">
                <input
                    type="text"
                    name='title'
                    placeholder="Title of Trip"
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                />
            </div>
            <div className="">
                <input
                    type="text"
                    name='location'
                    placeholder="Location..."
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                />
            </div>
            <div className="h-full">
                <input
                    type="text"
                    name="description"
                    placeholder="Describe your getaway..."
                    onChange={handleInputChange}
                    className="input input-bordered w-full min-h-[3rem]"
                />
            </div>
            <div className="h-full">
                <input
                    type="text"
                    name="people"
                    placeholder="0"
                    onChange={handleInputChange}
                    className="input input-bordered w-full min-h-[3rem]"
                />
            </div>
        </div>
    )
}