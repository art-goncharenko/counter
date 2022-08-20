import {ChangeEvent, useState} from "react";
import "./Counter.css";
import {start} from "repl";

export const Counter = () => {
    const [count, setCount] = useState<number>(0);
    const [maxValue, setMaxValue] = useState<number>(8);
    const [startValue, setStartValue] = useState(0);

    const onClickIncrement = () => {
        setCount(count + 1);
    }
    const onClickReset = () => {
        setCount(startValue);
    }
    let onChangeHandlerMax = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxValue(e.currentTarget.valueAsNumber);
    }
    let onChangeHandlerStart = (e: ChangeEvent<HTMLInputElement>) => {
        setStartValue(e.currentTarget.valueAsNumber);
    }
    const onClickSetHandler = () => {
        setCount(startValue);
    }
    const addClassName = `${maxValue < startValue ? "error" : ""}`
    const message = () => {
        if (maxValue < startValue) {
            return "Max value has to be bigger than start value";
        } else if (startValue < 0 ) {
            return "Incorrect value!"
        } else {
            return "Enter values and click Set";
        }
    }

    return (
        <div>
            <div className="container">
                <div className="values-wrap">
                    <div className="values">
                        <div className="max-value">
                            <div>Max value:</div>
                            <input type={"number"} value={maxValue} onChange={onChangeHandlerMax} name="maxValue"
                                   className={addClassName}/>
                        </div>
                        <div className="start-value">
                            <div>Start value</div>
                            <input type={"number"} value={startValue} onChange={onChangeHandlerStart} name="minValue"
                                   className={addClassName}/>
                        </div>
                    </div>
                    <div className="btn">
                        <button onClick={onClickSetHandler}
                                disabled={maxValue < startValue}>Set
                        </button>
                    </div>
                </div>
                <div className="counter-wrap">
                    <div className="counter">
                        <div className={"count " + (count === maxValue ? "error" : "")}>{count}</div> {/*syntax for conditional+regular className*/}
                        <p>{message()}</p>
                        <div className="btn-wrap">
                            <button onClick={onClickIncrement}
                                    disabled={count === maxValue}>Inc
                            </button>
                            <button onClick={onClickReset}
                                    disabled={count === 0}
                            > Reset
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}