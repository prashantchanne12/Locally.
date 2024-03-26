import {TouchableOpacity, View} from "react-native";
import CustomText from "./CustomText";
import {AntDesign, FontAwesome, FontAwesome6, Ionicons} from "@expo/vector-icons";
import {PRIMARY} from "@/utils/constants";
import {Image} from "expo-image";
import {cn, getType, giveMeGoogleImageURL, handleCall, handleWhatsApp, isServiceOpen} from "@/utils/utilities";
import { SimpleLineIcons } from '@expo/vector-icons';
import React from "react";
import ServiceCardFooter from "@/app/components/ServiceCardFooter";
import Tags from "@/app/components/Tags";

const Card = ({
                  id,
                  name,
                  types,
                  howFar,
                  photos,
                  isGoogle,
                  isOpen,
                  compact,
                  desc,
                  address,
                  contactNumbers,
                  onPress,
                  service
              }) => {

  let imageURL = photos[0];
  if (isGoogle) imageURL = giveMeGoogleImageURL(photos[0]);

  return (
    <View>
      {/* NAME AND TAGS */}
      <View className="mb-1 px-3" >
        <View className="flex-row justify-between items-start" >
          <View>
            <CustomText text={name} bold className={cn("text-base")} />
            <View>
              {!compact ? <View className="flex-row space-x-1">
                {types.map((tag, index) => (
                    <View
                        key={`${id}-${tag}-${index}`}
                        className="flex-row items-center"
                    >
                      <FontAwesome name="square" size={4} color="gray" />
                      <CustomText
                          text={getType(tag)}
                          className="text-gray-500 text-center px-1 text-xs"
                      />
                    </View>
                ))}
              </View> : <View className="flex-row items-center gap-1">
                <CustomText text={address[0]['address1'] + '.'} className="text-xs text-gray-500"/>
                {address[1] ?
                    <CustomText text={address[1]['address2'] + '.'} className="text-xs text-gray-500"/> : <></>}
              </View>}
            </View>
          </View>

          {/* ICONS */}
          <View className="items-start mt-0.5">
            <View className="items-end flex-row space-x-1">
              <View className="flex-row items-center space-x-1">
                {isOpen ? (
                    <AntDesign name="checkcircle" size={12} color="#16a085" />
                ) : (
                    <AntDesign name="closecircle" size={12} color="#c0392b" />
                )}
                <CustomText
                    text={isOpen ? "Open" : "Closed"}
                    semibold
                    className={cn(isOpen ? "text-[#16a085]" : "text-[#c0392b]", "text-xs text-center")}
                />
              </View>
              <View className="flex-row items-center space-x-0.5">
                <SimpleLineIcons name="location-pin" size={15} color="gray" />
                <CustomText text={howFar} className="text-xs text-gray-500" />
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* DESCRIPTION */}
      {
        compact ?
            <View className="px-[10px] mt-1.5">
              <CustomText text={desc} className="text-gray-500"/>
            </View> :
            <></>
      }

      {/* IMAGE */}
      {
        !compact ? <View className="mt-[5px] relative">
          <Image
              className="w-full h-48 bg-cover rounded-bl-lg rounded-br-lg"
              contentFit="cover"
              source={imageURL}
          />
        </View> : <View></View>
      }

      {compact ?
          <View className="px-3 mt-3">
              <Tags item={service} small/>
          </View> :
          <></>
      }

      {/* Footer */}
        {compact ?
            <View className="px-3 mt-3 pb-2.5">
                <ServiceCardFooter contactNumbers={contactNumbers} onPress={onPress}/>
            </View>
            : <></>
        }
    </View>
  );
};

export default Card;


