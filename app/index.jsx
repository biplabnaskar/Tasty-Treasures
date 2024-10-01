import { View, Text, Image, TouchableOpacity} from "react-native";
import React, { useEffect } from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from "expo-status-bar";
import Animated, {useSharedValue, withSpring} from "react-native-reanimated";
import { useRouter } from "expo-router";

export default function Index(){

    const router = useRouter();

    const ring1padding = useSharedValue(0);
    const ring2padding = useSharedValue(0);

    useEffect(()=>{
          
          ring1padding.value = 0;
          ring2padding.value = 0;

          setTimeout(()=> ring1padding.value = withSpring(ring1padding.value+hp(5)), 100);
          setTimeout(()=> ring2padding.value = withSpring(ring2padding.value+hp(5.5)), 300);

    },[])

    return(
        <View className="flex-1 justify-center items-center space-y-10 bg-[#FF165D]">
            <StatusBar style="light"/>
         <View >
            <Text style={{fontSize: hp(5)}} className="font-bold text-[#F6F7D7]">
                Tasty Treasures
                </Text>
         </View>


            {/* logo image */}
         <Animated.View className="bg-white/20 rounded-full" style={{padding: ring2padding}} >
            <Animated.View className="bg-white/20 rounded-full " style={{padding: ring1padding}}>
              
              <Image source={require('../assets/images/homeplate.png')} style={{width: hp(20), height: hp(20)}} />
            
            </Animated.View>

         </Animated.View>

         <TouchableOpacity
                onPress={()=> router.push('homeScreen')}
                style={{height: hp(7),width: wp(80)}}
                className="bg-[#3EC1D3] flex items-center justify-center mx-auto rounded-full border-[2px] border-black">
                <Text className="text-[#F6F7D7] font-bold tracking-widest" style={{fontSize: hp(3)}}>
                    Let's Go
                </Text>
            </TouchableOpacity>

            {/* color yellow - #FF9A00
                color pink - #FF165D
                blue - #3EC1D3
                white type - #F6F7D7*/}

        </View>
    )
}