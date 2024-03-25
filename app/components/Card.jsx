import {View} from "react-native";
import CustomText from "./CustomText";
import {AntDesign, FontAwesome} from "@expo/vector-icons";
import {PRIMARY} from "@/utils/constants";
import {Image} from "expo-image";
import {cn, getType, giveMeGoogleImageURL, isServiceOpen} from "@/utils/utilities";
import { SimpleLineIcons } from '@expo/vector-icons';
const Card = ({
  id,
  name,
  types,
  howFar,
  photos,
  isGoogle,
  isOpen,
  }) => {

  let imageURL = photos[0];
  if (isGoogle) imageURL = giveMeGoogleImageURL(photos[0]);

  return (
    <View>
      {/* NAME AND TAGS */}
      <View className="mb-1 px-[10px]" >
        <View className="flex-row justify-between items-start" >
          <View className="space-y-0.5" >
            <CustomText text={name} bold className={cn("text-base", `text-[${PRIMARY}]`)} />
            <View>
              <View className="flex-row space-x-1">
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
              </View>
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

      {/* IMAGE */}
      <View className="mt-[5px] relative">
        <Image
          className="w-full h-48 bg-cover rounded-bl-xl rounded-br-xl"
          contentFit="cover"
          source={imageURL}
        />
      </View>
    </View>
  );
};

export default Card;


