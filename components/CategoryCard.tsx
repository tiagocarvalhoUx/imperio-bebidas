import { View, Text, TouchableOpacity } from 'react-native';
import { ProductCategory } from '@/types';
import { Ionicons } from '@expo/vector-icons';

interface CategoryCardProps {
  category: ProductCategory;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

export default function CategoryCard({ category, icon, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-secondary rounded-lg p-4 items-center justify-center shadow-md mr-4 w-32 h-32"
      activeOpacity={0.7}
    >
      <View className="bg-accent/10 rounded-full w-16 h-16 items-center justify-center mb-2">
        <Ionicons name={icon} size={32} color="#D4AF37" />
      </View>
      <Text className="text-primary font-semibold text-center text-sm">
        {category}
      </Text>
    </TouchableOpacity>
  );
}
