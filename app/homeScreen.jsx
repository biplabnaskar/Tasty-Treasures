import { View, Text, ScrollView, Image, Switch, TextInput, Pressable} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {BellIcon,FaceSmileIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import { useColorScheme } from "nativewind";
import Categories from "../components/categories";
import axios from "axios";
import Recipes from "../components/recipes";
import MasonryList from '@react-native-seoul/masonry-list';
import { mealData } from "../constants";
import Animated, {FadeInDown} from 'react-native-reanimated';
import Loading from "../components/loading";
import { router } from "expo-router";

export default function HomeScreen(){
    

    const {colorScheme, toggleColorScheme}= useColorScheme();
    // console.log(colorScheme)

    const [activeCategory, setActiveCategory] = useState('Chicken');
    const [categories, setCategories] = useState([]);
    const [meals, setMeals] = useState([]);

    useEffect(()=>{
           getCategories();
           getRecipes();
    },[])

    const handleChangeCategory = category=>{
        getRecipes(category);
        setActiveCategory(category);
        setMeals([]);
    }

    const getCategories = async()=>{
        try{
        
           const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
        //    console.log('got categories:',response.data);
           if(response && response.data){
              setCategories(response.data.categories);
           }
        
        }catch(err){
            console.log('error:',err.message);
        }
    }

    const getRecipes = async(category="Chicken")=>{
        try{
        
           const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        //    console.log('got categories:',response.data);
           if(response && response.data){
              setMeals(response.data.meals);
           }
        
        }catch(err){
            console.log('error:',err.message);
        }
    }
    
    return(
         <View className="flex-1 bg-white dark:bg-neutral-900 ">
            <StatusBar style={colorScheme=='dark'? 'light':'dark'}/>
            <ScrollView 
               showsVerticalScrollIndicator={false}
               contentContainerStyle={{paddingBottom: 50}}
               className="space-y-6 pt-14"
            >
                {/* Name and bell */}
                <View className="mx-4 flex-row justify-between items-center mb-2">
                    <Text className="font-bold text-[#FF9A00]"  style={{fontSize: hp(3.5)}}>
                        Tasty Treasures
                    </Text>
                    <Text className="dark:text-white font-semibold" >{colorScheme=='dark'? 'Day Mode':'Night Mode'}</Text>
                <Switch value={colorScheme=='dark'} onChange={toggleColorScheme}/>
                </View>

                {/* greetings and punch line */}

                <View className="mx-4 space-y-2 mb-2">
                     
                    <View>
                        <Text style={{fontSize: hp(3)}} className="font-semibold text-neutral-700 dark:text-white">
                        TastyTreasure – Where Hunger Meets <Text className="text-[#FF165D]">Happiness!</Text>  
                        </Text>
                    </View>
                </View>

                {/* search bar */}

                <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px] dark:bg-white/30">
                <TextInput
                   placeholder='Search any recipe'
                   placeholderTextColor={colorScheme=='dark'? 'white':'gray'}
                   style={{fontSize: hp(1.7)}}
                   className="flex-1 text-base mb-1 pl-3 tracking-wider"
                   />
                    
                    <View className="bg-white rounded-full p-3 dark:bg-black">
                        <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color={colorScheme=='dark'? 'white':'gray'}/>
                    </View>

                </View>
                
               {/* categories */}


               <View>
                  {categories.length>0 && <Categories categories ={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory}/>}
                </View>


                {/* recipes */}

                <View className="mx-4 space-y-3">
                    <View className="items-center">
                        <Text 
                            style={{ 
                            fontSize: hp(3), 
                            letterSpacing: 16 // 1rem = 16px approximately in React Native 
                            }} 
                            className="font-bold text-neutral-600 dark:text-[#F6F7D7]"
                        >
                            RECIPES
                        </Text>
                    </View>

                <View>

                    {
                        categories.length==0 || meals.length==0? (
                            <Loading size="large" className="mt-20"/>
                        ): (
                            <MasonryList
                            data={meals}
                            keyExtractor={(item) => item.idMeal}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item, i}) => <RecipeCard item={item} index={i}/>}
                        //    refreshing={isLoadingNext}
                        //    onRefresh={() => refetch({first: ITEM_CNT})}
                            onEndReachedThreshold={0.1}
                        
                    />
                        )
                    }
                    
                </View>
                </View>

            </ScrollView>
         </View>
    )
}

const RecipeCard = ({item, index})=>{
    let isEven = index%2==0;
    return(
        <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}>
             <Pressable
                 style={{width: '100%', paddingLeft: isEven? 0:8,paddingRight: isEven? 8:0}}
                 className="flex justify-center mb-4 space-y-1"
                 onPress={() => router.push({ pathname: 'RecipeDetailScreen', params: { ...item } })}

              >
                
                <Image
                    source={{uri: item.strMealThumb}}
                    style={{width: '100%',height: index%3==0? hp(25):hp(35), borderRadius: 35}}
                    className="bg-black/5"
                />

                <Text style={{fontSize: hp(1.7)}} className="font-semibold ml-2 text-neutral-600 dark:text-[#F6F7D7]">
                    {
                        item.strMeal.length>20? item.strMeal.slice(0,20)+'...': item.strMeal
                    }
                </Text>

              </Pressable>
        </Animated.View>
    )
}