import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import { mealData } from "../constants";
import Animated, {FadeInDown} from 'react-native-reanimated';

// export default function Recipes(categories){
//     return(
//         <View className="mx-4 space-y-3">

//             <Text style={{fontSize: hp(3)}} className="font-semibold text-neutral-600 dark:text-[#F6F7D7]">Recipes</Text>
//             <View>

//                 {
//                     categories.length==0? null: (
//                         <MasonryList
//                         data={mealData}
//                         keyExtractor={(item) => item.id}
//                         numColumns={2}
//                         showsVerticalScrollIndicator={false}
//                         renderItem={({item, i}) => <RecipeCard item={item} index={i}/>}
//                      //    refreshing={isLoadingNext}
//                      //    onRefresh={() => refetch({first: ITEM_CNT})}
//                         onEndReachedThreshold={0.1}
                     
//                  />
//                     )
//                 }
                 
//             </View>
//         </View>
//     )
// }

// const RecipeCard = ({item, index})=>{
//     let isEven = index%2==0;
//     return(
//         <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}>
//              <Pressable 
//                  style={{width: '100%', paddingLeft: isEven? 0:8,paddingRight: isEven? 8:0}}
//                  className="flex justify-center mb-4 space-y-1"
//               >
                
//                 <Image
//                     source={{uri: item.image}}
//                     style={{width: '100%',height: index%3==0? hp(25):hp(35), borderRadius: 35}}
//                     className="bg-black/5"
//                 />

//                 <Text style={{fontSize: hp(1.7)}} className="font-semibold ml-2 text-neutral-600">
//                     {
//                         item.name.length>20? item.name.slice(0,20)+'...': item.name
//                     }
//                 </Text>

//               </Pressable>
//         </Animated.View>
//     )
// }