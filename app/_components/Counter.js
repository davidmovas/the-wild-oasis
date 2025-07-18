"use client";

import {useState} from "react";

export default function Counter({users}) {
    const [count, setCount] = useState(0);
    const len = users.length;
    
    return (
        <>
            <p>The are {len+count} users.</p>
            <button onClick={() => setCount((p) => p+1)}>{count}</button>
        </>
    );
}