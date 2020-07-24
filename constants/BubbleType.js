import React, {useState} from 'react';
import { AsyncStorage, Image, StyleSheet} from "react-native";

let bubbleType;
const myBubble = () => {
        var  bubbleVar;

        //Async Storage Call for 'bubble'
        const [Bubble, setBubbleState] = useState("");
        const changeBubble = (newBubble) => {
                setBubbleState(newBubble)
        }

        AsyncStorage.getItem("bubble")
        .then((value)=>{
        const data = value;
        if (data !== null){
                changeBubble(data)
        }
        })

        if(Bubble === 'bubble1'){
                bubbleVar = 1
        } else if(Bubble === 'bubble2'){
                bubbleVar = 2
        } else if(Bubble === 'bubble3'){
                bubbleVar = 3
        } else if(Bubble === 'bubble4'){
                bubbleVar = 4
        } else {
                bubbleVar = 1
        }

        if (bubbleVar === 1){
        bubbleType =  {
                type: "Bubbles",
                oneLife:<Image 
                        height= {125}
                        width= {360}
                        alignSelf= {"center"}
                        source= {require('./Assets/OneBubble.png')}/>,
                twoLife:<Image 
                        height= {125}
                        width= {360}
                        alignSelf= {"center"}
                        source= {require('./Assets/TwoBubble.png')}/>,
                thrLife:<Image 
                        height= {125}
                        width= {360}
                        alignSelf= {"center"} 
                        source= {require('./Assets/ThreeBubble.png')}/>
        }
        } else if (bubbleVar === 2) {
        bubbleType =  {
                type: "Hearts",
                oneLife:<Image 
                        height= {125}
                        width= {360}
                        alignSelf= {"center"}
                        source= {require('./Assets/OneHeart.png')}/>,
                twoLife:<Image 
                        height= {125}
                        width= {360}
                        alignSelf= {"center"}
                        source= {require('./Assets/TwoHeart.png')}/>,
                thrLife:<Image 
                        height= {125}
                        width= {360}
                        alignSelf= {"center"}
                        source= {require('./Assets/ThreeHeart.png')}/>
        }
        } else if (bubbleVar === 3) {
        bubbleType =  {
                type: "Charge",
                oneLife:<Image 
                        height= {125}
                        width= {360}
                        alignSelf= {"center"}
                        source= {require('./Assets/OneBattery.png')}/>,
                twoLife:<Image 
                        height= {125}
                        width= {360}
                        alignSelf= {"center"}
                        source= {require('./Assets/TwoBattery.png')}/>,
                thrLife:<Image 
                        height= {125}
                        width= {360}
                        alignSelf= {"center"} 
                        source= {require('./Assets/ThreeBattery.png')}/>
        }
        } else {
        bubbleType =  {
                oneLife:<Image 
                        height= {125}
                        width= {360}
                        alignSelf= {"center"} 
                        source= {require('./Assets/OneBubble.png')}/>,
                twoLife:<Image 
                        height= {125}
                        width= {360}
                        alignSelf= {"center"} 
                        source= {require('./Assets/TwoBubble.png')}/>,
                thrLife:<Image 
                        height= {125}
                        width= {360}
                        alignSelf= {"center"} 
                        source= {require('./Assets/ThreeBubble.png')}/>
        }
        }

        const styles = StyleSheet.create({
        image: {
                height: 125,
                width: 360,
                alignSelf: "center",
        },
        });
        return (bubbleType)
}

export default myBubble;