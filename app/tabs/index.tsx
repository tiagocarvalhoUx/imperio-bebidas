import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Beer,
  CupSoda,
  Wine,
  ShoppingBag,
  MessageCircle,
} from "lucide-react-native";
import Colors from "@/constants/colors";
import { categories, products } from "@/mocks/products";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;
const PROMO_CARD_WIDTH = Math.min(width * 0.4, 160);
const LOGO_WIDTH = Math.min(width * 0.7, 280);

export default function HomeScreen() {
  const router = useRouter();

  const openWhatsApp = () => {
    const phone = "5518997340064";
    const message = "Olá! Gostaria de fazer um pedido no Império Bebidas.";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  const featuredProducts = products.slice(0, 4);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Image
            source={require("../../assets/logo-imperio.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.tagline}>Bebidas e Conveniência</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() =>
                  router.push({
                    pathname: "/tabs/catalog",
                    params: { category: category.id },
                  })
                }
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri: category.image }}
                  style={styles.categoryImage}
                />
                <View style={styles.categoryOverlay} />
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Promoções</Text>
            <TouchableOpacity onPress={() => router.push("/tabs/catalog")}>
              <Text style={styles.seeAll}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.promoScroll}
          >
            {featuredProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.promoCard}
                onPress={() =>
                  router.push({
                    pathname: "/product",
                    params: { id: product.id },
                  })
                }
                activeOpacity={0.8}
              >
                <Image source={product.image} style={styles.promoImage} />
                <View style={styles.promoInfo}>
                  <Text style={styles.promoName} numberOfLines={2}>
                    {product.name}
                  </Text>
                  <Text style={styles.promoPrice}>
                    R$ {product.price.toFixed(2)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Horário de Funcionamento</Text>
          <View style={styles.hoursCard}>
            <View style={styles.hoursRow}>
              <Text style={styles.hoursDay}>Segunda a Sábado</Text>
              <Text style={styles.hoursTime}>08:00 - 22:00</Text>
            </View>
            <View style={styles.hoursDivider} />
            <View style={styles.hoursRow}>
              <Text style={styles.hoursDay}>Domingo</Text>
              <Text style={styles.hoursTime}>09:00 - 20:00</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.whatsappButton}
        onPress={openWhatsApp}
        activeOpacity={0.8}
      >
        <MessageCircle size={28} color={Colors.white} />
      </TouchableOpacity>
    </View>
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
    paddingBottom: 100,
    paddingTop: 16,
  },
  hero: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  logo: {
    width: LOGO_WIDTH,
    height: LOGO_WIDTH * 0.7,
  },
  tagline: {
    fontSize: 18,
    color: Colors.gold,
    fontWeight: "600" as const,
    marginTop: 16,
    letterSpacing: 2,
    textTransform: "uppercase" as const,
    textShadowColor: "rgba(212, 175, 55, 0.4)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold" as const,
    color: Colors.white,
    marginBottom: 16,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.5,
  },
  seeAll: {
    fontSize: 14,
    color: Colors.gold,
    fontWeight: "600" as const,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  categoryCard: {
    width: CARD_WIDTH,
    height: 120,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  categoryImage: {
    width: "100%",
    height: "100%",
  },
  categoryOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  categoryName: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
    fontSize: 16,
    fontWeight: "bold" as const,
    color: Colors.white,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    letterSpacing: 0.5,
    textTransform: "uppercase" as const,
  },
  promoScroll: {
    paddingRight: 16,
    gap: 12,
  },
  promoCard: {
    width: PROMO_CARD_WIDTH,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  promoImage: {
    width: "100%",
    height: PROMO_CARD_WIDTH * 1.1,
    resizeMode: "cover",
  },
  promoInfo: {
    padding: 12,
  },
  promoName: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.white,
    marginBottom: 8,
    height: 36,
  },
  promoPrice: {
    fontSize: 18,
    fontWeight: "bold" as const,
    color: Colors.gold,
  },
  hoursCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
  },
  hoursRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hoursDivider: {
    height: 1,
    backgroundColor: Colors.darkGray,
    marginVertical: 16,
  },
  hoursDay: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: "600" as const,
  },
  hoursTime: {
    fontSize: 16,
    color: Colors.gold,
    fontWeight: "bold" as const,
  },
  whatsappButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#25D366",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
});
