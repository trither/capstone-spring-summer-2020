import React from 'react';
import { AsyncStorage, Image, StyleSheet} from "react-native";

let bubbleType = {};
var  bubbleVar= 2;
if (bubbleVar === 1){
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
} else if (bubbleVar === 2) {
    bubbleType =  {
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

export default bubbleType;