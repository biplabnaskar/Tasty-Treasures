import { View, Text, ScrollView, Image } from "react-native";
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import { ChevronLeftIcon, ClockIcon} from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import axios from "axios";
import Loading from "../components/loading";
import YoutubeIframe from "react-native-youtube-iframe";
import Animated, {FadeIn, FadeInDown} from 'react-native-reanimated';
import { useColorScheme } from "nativewind";  // Add this

export default function RecipeDetailScreen() {
    const params = useLocalSearchParams();  // This will return the passed params
    let item = params;
    const { colorScheme } = useColorScheme();  // Hook for dark mode
    const [isFavourite, setIsFavourite] = useState(false);
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMealData(item.idMeal);
    }, []);

    const getMealData = async(id) => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            if (response && response.data) {
                setMeal(response.data.meals[0]);
                setLoading(false);
            }
        } catch (err) {
            console.log('error:', err.message);
        }
    };

    const ingredientsIndexes = (meal) => {
        if (!meal) return [];
        let indexes = [];
        for (let i = 1; i <= 20; i++) {
            if (meal['strIngredient' + i]) {
                indexes.push(i);
            }
        }
        return indexes;
    };

    const getYoutubeVideoId = url => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    };

    return (
        <ScrollView 
            className={`flex-1 ${colorScheme === 'dark' ? 'bg-neutral-900' : 'bg-white'}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 30}}
        >
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

            {/* recipe image */}
            <View className="flex-row justify-center">
                <Image
                    source={{uri: item.strMealThumb}}
                    style={{width: wp(98), height: hp(50), borderRadius: 40, marginTop: 4}}
                />
            </View>

            {/* back button */}
            <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between item-center pt-14">
                <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full ml-5 bg-white">
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#3EC1D3"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)} className="p-2 rounded-full mr-5 bg-white">
                    <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite ? "#FF165D" : "gray"} />
                </TouchableOpacity>
            </Animated.View>

            {/* meal description */}
            {loading ? (
                <Loading size="large" className="mt-16" />
            ) : (
                <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="px-4 flex justify-center space-y-2 pt-8">
                    <Text style={{ fontSize: hp(3) }} className={`font-bold flex-1 ${colorScheme === 'dark' ? 'text-white' : 'text-neutral-800'}`}>
                        {meal?.strMeal}
                    </Text>
                    <Text style={{ fontSize: hp(2) }} className={`font-medium flex-1 ${colorScheme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        {meal?.strArea}
                    </Text>

                    {/* ingredients */}
                    <View className="space-y-4">
                        <Text style={{ fontSize: hp(2.5) }} className={`font-bold flex-1 ${colorScheme === 'dark' ? 'text-white' : 'text-neutral-700'}`}>
                            Ingredients
                        </Text>
                        <View className="space-y-2 ml-3">
                            {ingredientsIndexes(meal).map(i => (
                                <View key={i} className="flex-row space-x-4">
                                    <View style={{ height: hp(1.5), width: hp(1.5) }} className="bg-[#FF165D] rounded-full" />
                                    <View className="flex-row space-x-2">
                                        <Text style={{ fontSize: hp(1.8) }} className={`font-extrabold ${colorScheme === 'dark' ? 'text-white' : 'text-neutral-700'}`}>
                                            {meal['strIngredient' + i]} ---
                                        </Text>
                                        <Text style={{ fontSize: hp(1.8) }} className={`font-medium ${colorScheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                            {meal['strMeasure' + i]}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* instruction */}
                    <View className="space-y-4">
                        <Text style={{ fontSize: hp(2.5) }} className={`font-bold flex-1 ${colorScheme === 'dark' ? 'text-white' : 'text-neutral-700'}`}>
                            Instructions
                        </Text>
                        <Text style={{ fontSize: hp(1.6) }} className={`${colorScheme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>
                            {meal?.strInstructions}
                        </Text>
                    </View>

                    {/* recipe video */}
                    {meal.strYoutube && (
                        <View className="space-y-4">
                            <Text style={{ fontSize: hp(2.5) }} className={`font-bold flex-1 ${colorScheme === 'dark' ? 'text-white' : 'text-neutral-700'}`}>
                                Recipe Video
                            </Text>
                            <View>
                                <YoutubeIframe
                                    videoId={getYoutubeVideoId(meal.strYoutube)}
                                    height={hp(30)}
                                />
                            </View>
                        </View>
                    )}
                </Animated.View>
            )}
        </ScrollView>
    );
}

