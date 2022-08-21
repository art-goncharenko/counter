import {ChangeEvent, useEffect, useState} from "react";
import "./Counter.css";

export const Counter = () => {
    const [count, setCount] = useState<number>(0);
    const [maxValue, setMaxValue] = useState<number>(3);
    const [startValue, setStartValue] = useState(0);
    const [isSetDisabled, setIsSetDisabled] = useState<boolean>(true)

    useEffect(() => {
        let valueAsString = localStorage.getItem("count")
        if (valueAsString) {
            let newValue = JSON.parse(valueAsString)
            setCount(newValue)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("count", JSON.stringify(count))
    }, [count])

    useEffect(() => {
        btnSetDisabled()
    }, [maxValue, startValue])

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
        setIsSetDisabled(true)
    }
    const addClassName = `${maxValue <= startValue ? "error" : ""}`
    const addClassNameMessage = `${maxValue <= startValue || startValue < 0 ? "error" : ""}`
    const message = () => {
        if (maxValue <= startValue) {
            return "Max value has to be bigger than start value";
        } else if (startValue <  0) {
            return "Incorrect value!"
        } else {
            return "Enter values and click Set";
        }
    }
    const btnSetDisabled = () => {
        if (startValue < 0) {
            return setIsSetDisabled(true)
        } else if (maxValue <= startValue) {
            return setIsSetDisabled(true)
        } else {
            return setIsSetDisabled(false)
        }
    }


return (
    <div>
        <div className="container">
            <div className="values-wrap">
                <div className="values">
                    <div className="max-value">
                        <div>Max value:</div>
                        <input type="number" value={maxValue} onChange={onChangeHandlerMax} name="maxValue"
                               className={addClassName}/>
                    </div>
                    <div className="start-value">
                        <div>Start value</div>
                        <input type="number" value={startValue} onChange={onChangeHandlerStart} name="minValue"
                               className={addClassName}/>
                    </div>
                </div>
                <div className="btn">
                    <button onClick={onClickSetHandler}
                            disabled={isSetDisabled}>Set
                    </button>
                </div>
            </div>
            <div className="counter-wrap">
                <div className="counter">
                    <div className={"count " + (count === maxValue ? "error" : "")}>{count}</div>
                    {/*syntax for "regular" + (conditional className)*/}
                    <p className={addClassNameMessage}>{message()}</p>
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