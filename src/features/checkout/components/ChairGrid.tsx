import Chair from "./Chair";
type Props = {
    accessible: boolean;
    index: number
};

const positionAtGrid = ["A","B","C","D","E","F","G","H","I"];

export default function ChairGrid({ accessible, index }: Props) {
    return (
        <div className="flex justify-between">
            <div className="rotate-180 flex gap-3">
                <Chair type={accessible ? "accessible" : "standard"} position={index + 1}/>
                <Chair type={accessible ? "companion" : "standard"}  position={index + 1}/>
                <Chair type={accessible ? "accessible" : "standard"}  position={index + 1}/>
                <Chair type={accessible ? "companion" : "standard"}  position={index + 1}/>
                <div className="flex items-center">
                    <p className="rotate-180 text-font-secondary-dark text-xl pr-2">{positionAtGrid[index]}</p>
                </div>
            </div>

            <div className="rotate-180 flex gap-3">
                <div className="flex items-center">
                    <p className="rotate-180 text-font-secondary-dark text-xl pl-2">{positionAtGrid[index]}</p>
                </div>

                <Chair type={"standard"}  position={index + 1}/>
                <Chair type={"standard"}  position={index + 1}/>
                <Chair type={accessible ? "companion" : "standard"}  position={index + 1}/>
                <Chair type={accessible ? "accessible" : "standard"}  position={index + 1}/>
            </div>
        </div>
    );
}