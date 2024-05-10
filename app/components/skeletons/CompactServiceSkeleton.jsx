import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {View} from "react-native";
import React from "react";

const CompactServiceSkeleton = (count) => {
    let skeletons = []
    for(let i = 0; i < count; i ++){
        skeletons.push(<Skeleton key={i} />)
    }

    return skeletons;
}

const Skeleton = () => {
    return (
        <View className="bg-white z-[100] my-1.5 mx-1 rounded-lg border-b-0" style={{elevation: 2}}>
            <View className="pb-2.5 px-2">
                <SkeletonPlaceholder borderRadius={4}>
                    <View>
                        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <View style={{gap: 5, marginTop: 10}}>
                                <View style={{width: 100, height: 16}}/>
                                <View style={{width: 60, height: 13}}/>
                            </View>
                            <View style={{flexDirection: "row", alignItems: "center", gap: 5, marginTop: -15}}>
                                <View style={{width: 50, height: 13}}></View>
                                <View style={{width: 50, height: 13, marginRight: 5}}></View>
                            </View>
                        </View>
                        <View style={{width: 300, height: 13, marginTop: 18}}></View>
                        <View style={{width: 80, height: 20, marginTop: 15}}></View>
                        <View style={{width: 140, height: 14, marginTop: 15}}></View>
                    </View>
                </SkeletonPlaceholder>
            </View>
        </View>
    )
}

export  default CompactServiceSkeleton;