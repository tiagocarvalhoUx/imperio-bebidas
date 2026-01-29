import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/colors";
import { products } from "@/mocks/products";
import { useCart } from "@/contexts/CartContext";

const { width } = Dimensions.get("window");
const PRODUCT_IMAGE_SIZE = width; // Full width para imagem principal
const RELATED_CARD_WIDTH = Math.min(width * 0.33, 140); // 33% da largura ou máximo 140px

export default function ProductScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Produto não encontrado</Text>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    Alert.alert(
      "Adicionado ao carrinho",
      `${quantity}x ${product.name} adicionado ao carrinho!`,
      [
        { text: "Continuar comprando", style: "cancel" },
        { text: "Ir ao carrinho", onPress: () => router.push("/tabs/cart") },
      ],
    );
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "",
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTintColor: Colors.gold,
          headerShadowVisible: false,
        }}
      />
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Image source={product.image} style={styles.productImage} />

          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.titleSection}>
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={18} color={Colors.gold} />
                  <Text style={styles.ratingText}>
                    {product.rating.toFixed(1)}
                  </Text>
                  <Text style={styles.ratingCount}>(125 avaliações)</Text>
                </View>
              </View>
              <Text style={styles.productPrice}>
                R$ {product.price.toFixed(2)}
              </Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Descrição</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>

            {(product.volume || product.alcoholContent) && (
              <>
                <View style={styles.separator} />
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Informações</Text>
                  <View style={styles.infoGrid}>
                    {product.volume && (
                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Volume</Text>
                        <Text style={styles.infoValue}>{product.volume}</Text>
                      </View>
                    )}
                    {product.alcoholContent && (
                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Teor Alcoólico</Text>
                        <Text style={styles.infoValue}>
                          {product.alcoholContent}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </>
            )}

            {relatedProducts.length > 0 && (
              <>
                <View style={styles.separator} />
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Produtos Relacionados</Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.relatedScroll}
                  >
                    {relatedProducts.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        style={styles.relatedCard}
                        onPress={() =>
                          router.push({
                            pathname: "/product",
                            params: { id: item.id },
                          })
                        }
                        activeOpacity={0.8}
                      >
                        <Image
                          source={item.image}
                          style={styles.relatedImage}
                        />
                        <Text style={styles.relatedName} numberOfLines={2}>
                          {item.name}
                        </Text>
                        <Text style={styles.relatedPrice}>
                          R$ {item.price.toFixed(2)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </>
            )}
          </View>
        </ScrollView>

        <SafeAreaView edges={["bottom"]} style={styles.footer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              activeOpacity={0.7}
            >
              <Ionicons
                name="remove"
                size={20}
                color={quantity <= 1 ? Colors.gray : Colors.white}
              />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity((q) => q + 1)}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddToCart}
            activeOpacity={0.8}
          >
            <Ionicons name="cart" size={20} color={Colors.black} />
            <Text style={styles.addButtonText}>Adicionar ao Carrinho</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  productImage: {
    width: "100%",
    height: width * 0.9, // 90% da largura para mobile
    resizeMode: "cover",
    backgroundColor: Colors.darkGray,
  },
  content: {
    padding: 16,
  },
  header: {
    gap: 16,
  },
  titleSection: {
    gap: 8,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold" as const,
    color: Colors.white,
    lineHeight: 32,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.3,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ratingText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: "600" as const,
  },
  ratingCount: {
    fontSize: 14,
    color: Colors.gray,
  },
  productPrice: {
    fontSize: 32,
    fontWeight: "bold" as const,
    color: Colors.gold,
    textShadowColor: "rgba(212, 175, 55, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    letterSpacing: 0.5,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.darkGray,
    marginVertical: 24,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold" as const,
    color: Colors.white,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    letterSpacing: 0.5,
    textTransform: "uppercase" as const,
  },
  description: {
    fontSize: 16,
    color: Colors.lightGray,
    lineHeight: 24,
  },
  infoGrid: {
    flexDirection: "row",
    gap: 16,
  },
  infoItem: {
    flex: 1,
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.gray,
    fontWeight: "600" as const,
    textTransform: "uppercase",
  },
  infoValue: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: "bold" as const,
  },
  relatedScroll: {
    gap: 12,
  },
  relatedCard: {
    width: RELATED_CARD_WIDTH,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    overflow: "hidden",
  },
  relatedImage: {
    width: RELATED_CARD_WIDTH,
    height: RELATED_CARD_WIDTH,
    resizeMode: "cover",
  },
  relatedName: {
    fontSize: 12,
    fontWeight: "600" as const,
    color: Colors.white,
    padding: 8,
    height: 40,
  },
  relatedPrice: {
    fontSize: 14,
    fontWeight: "bold" as const,
    color: Colors.gold,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.darkGray,
    padding: 16,
    flexDirection: "row",
    gap: 12,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surfaceLight,
    borderRadius: 12,
    gap: 16,
    paddingHorizontal: 12,
  },
  quantityButton: {
    width: 40,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold" as const,
    color: Colors.white,
    minWidth: 32,
    textAlign: "center",
  },
  addButton: {
    flex: 1,
    backgroundColor: Colors.gold,
    borderRadius: 12,
    height: 48,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    letterSpacing: 0.5,
    textTransform: "uppercase" as const,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold" as const,
    color: Colors.black,
  },
  errorText: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: "center",
    marginTop: 40,
  },
});
