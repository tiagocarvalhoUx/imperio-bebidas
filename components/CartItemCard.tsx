import { View, Text, Image, TouchableOpacity } from "react-native";
import { CartItem } from "@/types";
import { Ionicons } from "@expo/vector-icons";

interface CartItemCardProps {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export default function CartItemCard({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemCardProps) {
  const subtotal = item.product.price * item.quantity;

  return (
    <View className="bg-secondary rounded-lg p-4 mb-3 shadow-md">
      <View className="flex-row">
        <Image
          source={item.product.image}
          className="w-20 h-20 rounded-lg"
          resizeMode="cover"
        />

        <View className="flex-1 ml-3">
          <Text
            className="text-primary font-semibold text-base mb-1"
            numberOfLines={2}
          >
            {item.product.name}
          </Text>
          <Text className="text-accent font-bold text-lg mb-2">
            R$ {item.product.price.toFixed(2)}
          </Text>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center bg-primary/5 rounded-lg">
              <TouchableOpacity
                onPress={onDecrease}
                className="p-2"
                activeOpacity={0.7}
              >
                <Ionicons name="remove" size={20} color="#000" />
              </TouchableOpacity>

              <Text className="text-primary font-semibold text-base px-4">
                {item.quantity}
              </Text>

              <TouchableOpacity
                onPress={onIncrease}
                className="p-2"
                activeOpacity={0.7}
              >
                <Ionicons name="add" size={20} color="#000" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={onRemove}
              className="p-2"
              activeOpacity={0.7}
            >
              <Ionicons name="trash-outline" size={20} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-muted/20">
        <Text className="text-muted text-sm">Subtotal:</Text>
        <Text className="text-primary font-bold text-lg">
          R$ {subtotal.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}
