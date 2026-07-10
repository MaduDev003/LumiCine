import Chair from "./Chair";
type Props = {
    accessible: boolean;
};

export default function ChairGrid({ accessible }: Props) {
    return (
        <div className="flex justify-between">
            <div className="rotate-180 flex gap-3">
                <Chair type={accessible ? "accessible" : "standard"} />
                <Chair type={accessible ? "companion" : "standard"} />
                <Chair type={accessible ? "accessible" : "standard"} />
                <Chair type={accessible ? "companion" : "standard"} />
                <div className="flex items-center">
                    <p className="rotate-180">1</p>
                </div>
            </div>

            <div className="rotate-180 flex gap-3">
                <div className="flex items-center">
                    <p className="rotate-180">1</p>
                </div>

                <Chair type={"standard"} />
                <Chair type={"standard"} />
                <Chair type={accessible ? "companion" : "standard"} />
                <Chair type={accessible ? "accessible" : "standard"} />
            </div>
        </div>
    );
}