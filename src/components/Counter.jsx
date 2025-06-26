import { useEffect, useState } from "react";

const Counter = () => {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);

    const handleCount1 = () => {
        setCount1(count1 + 1);
    }
    function handleCount2() {
        setCount2(count2 + 1);
    }
    useEffect(()=>{
        console.log("incremented...");
    },[count1,count2])
    return (
        <div>
            <h2>Counter</h2>
            <h3>Count 1 : {count1}</h3>
            <h3>Count 2 : {count2}</h3>
            <button onClick={handleCount1}>Increment 1</button>
            <button onClick={handleCount2}>Increment 2</button>
        </div>
    )
}
export default Counter;