import React from 'react'

function test() {

    const myFunction1 = (e)=>{
        let i = 0
        console.log("line1")
        i+=1
        if(i==0){console.log("zero")}
        else{return}
    }

    const myFunction = (e)=>{
        e.preventDefault()
        myFunction1()
        console.log("over")
    }

    return (
        <div>
            <button onClick={e=>myFunction(e)}>Click me</button>
        </div>
    )
}

export default test
