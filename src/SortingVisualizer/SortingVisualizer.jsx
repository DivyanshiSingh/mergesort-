import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

const ANIMATION_SPEED_MS =3;
const NUMBER_OF_ARRAY_BARS = 300;

export default class SortingVisualizer extends React.Component{
    // while rendering of the component certain lifecycle methods are called. These are important so that the component gets displayed on our page.
    // So there are three stages in the process of displaying.
    // 1- Initialising
    // 2- Mounting/Updating
    // 3- Unmounting
    constructor(props){
        super(props);

        this.state = {
            array: [],
    };
    }
    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array= [];
        for(let i=0;i<NUMBER_OF_ARRAY_BARS;i++){
            array.push(randomIntFromInterval(5,730));
        }
        this.setState({array});
    }
    mergeSort(){
        const animations = getMergeSortAnimations(this.state.array);
        
        for (let i=0;i< animations.length;i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange=i%3 !==2;
            if (isColorChange){
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle=arrayBars[barOneIdx].style;
            const barTwoStyle=arrayBars[barTwoIdx].style;
            
                const color = i%3 === 0 ? 'red' : 'greenyellow';
                setTimeout(()=>{
                    barOneStyle.backgroundColor=color;
                    barTwoStyle.backgroundColor=color;
                }, i*ANIMATION_SPEED_MS);
            }
            else {
                setTimeout(()=>{
                    const [barOneIdx, newHeight]= animations[i];
                    const barOneStyle= arrayBars[barOneIdx].style;
                    barOneStyle.height=`${newHeight}px`;
                }, i*ANIMATION_SPEED_MS);
            }
            
        }
    }
    
    testSortingAlgorithms(){
        for(let i=0;i<100;i++){
            const array=[];
            const length =randomIntFromInterval(1,1000);
            for(let i=0;i<length;i++){
                array.push(randomIntFromInterval(-1000, 1000));
            }
            const javaScriptSortedArray = array.slice().sort((a,b)=> a-b);
            const mergeSortedArray = getMergeSortAnimations(array.slice());
            console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
        }
    }

    render(){
        const {array}= this.state;
        return (
            <div className="array-container">
            {array.map((value, idx)=>(
                <div className="array-bar" key={idx} style={{height: `${value}px`}}>
                
                </div>
            ))}
            <br/><br/>
            <div className="btncontainer">
            <button onClick={()=> this.resetArray()} className="btn1" >Generate New Array</button>
            <button onClick={()=>this.mergeSort()} className="btn1">Merge Sort</button>
            <button onClick={()=>this.testSortingAlgorithms()} className="btn1">Test Sorting Algorithms</button>
            </div>
            </div>
        );
    }
}
 function randomIntFromInterval(min, max){
     return Math.floor(Math.random()*(max-min+1)+min);
 }

function arraysAreEqual(arrayOne, arrayTwo){
    if (arrayOne.length !== arrayTwo.length) return false;
    for(let i=0; i<arrayOne.length;i++){
        if(arrayOne[i]!== arrayTwo[i]){
        return false;
        }
    }
    return true;
}