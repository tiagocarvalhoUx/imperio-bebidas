import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import {
  Phone,
  MessageCircle,
  Navigation,
  MapPin,
  Clock,
  Star,
} from "lucide-react-native";
import Colors from "@/constants/colors";

const STORE_LOCATION = {
  latitude: -21.2084,
  longitude: -50.4343,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const STORE_INFO = {
  name: "Império Bebidas e Conveniência",
  address: "R. Porangaba, 310 - Paraíso, Araçatuba - SP, 16072-165",
  phone: "(18) 99734-0064",
  rating: 4.8,
  reviewCount: 256,
};

export default function LocationScreen() {
  const openMaps = () => {
    const url = Platform.select({
      ios: `maps://app?daddr=${STORE_LOCATION.latitude},${STORE_LOCATION.longitude}`,
      android: `geo:${STORE_LOCATION.latitude},${STORE_LOCATION.longitude}?q=${STORE_LOCATION.latitude},${STORE_LOCATION.longitude}`,
      web: `https://www.google.com/maps/dir/?api=1&destination=${STORE_LOCATION.latitude},${STORE_LOCATION.longitude}`,
    });
    if (url) {
      Linking.openURL(url);
    }
  };

  const makeCall = () => {
    Linking.openURL(`tel:${STORE_INFO.phone.replace(/\D/g, "")}`);
  };

  const openWhatsApp = () => {
    const phone = "5518997340064";
    const message = "Olá! Gostaria de saber mais sobre o Império Bebidas.";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  const mapStyle = [
    {
      elementType: "geometry",
      stylers: [{ color: "#1a1a1a" }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#8a8a8a" }],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#1a1a1a" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#2c2c2c" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1a1a1a" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#000000" }],
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Localização</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={STORE_LOCATION}
            customMapStyle={mapStyle}
          >
            <Marker
              coordinate={{
                latitude: STORE_LOCATION.latitude,
                longitude: STORE_LOCATION.longitude,
              }}
              title={STORE_INFO.name}
              description={STORE_INFO.address}
            />
          </MapView>
        </View>

        <View style={styles.content}>
          <View style={styles.storeCard}>
            <View style={styles.storeHeader}>
              <View style={styles.storeInfo}>
                <Text style={styles.storeName}>{STORE_INFO.name}</Text>
                <View style={styles.ratingRow}>
                  <Star size={16} color={Colors.gold} fill={Colors.gold} />
                  <Text style={styles.ratingText}>{STORE_INFO.rating}</Text>
                  <Text style={styles.reviewCount}>
                    ({STORE_INFO.reviewCount} avaliações)
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoSection}>
              <MapPin size={20} color={Colors.gold} />
              <Text style={styles.infoText}>{STORE_INFO.address}</Text>
            </View>

            <View style={styles.infoSection}>
              <Phone size={20} color={Colors.gold} />
              <Text style={styles.infoText}>{STORE_INFO.phone}</Text>
            </View>

            <View style={styles.infoSection}>
              <Clock size={20} color={Colors.gold} />
              <View style={styles.hoursContainer}>
                <Text style={styles.infoText}>
                  Segunda a Sábado: 08:00 - 22:00
                </Text>
                <Text style={styles.infoText}>Domingo: 09:00 - 20:00</Text>
                <Text style={styles.openText}>Aberto · Fecha 22:00</Text>
              </View>
            </View>
          </View>

          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={makeCall}
              activeOpacity={0.8}
            >
              <View style={styles.actionIcon}>
                <Phone size={24} color={Colors.gold} />
              </View>
              <Text style={styles.actionText}>Ligar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={openWhatsApp}
              activeOpacity={0.8}
            >
              <View style={styles.actionIcon}>
                <MessageCircle size={24} color={Colors.gold} />
              </View>
              <Text style={styles.actionText}>WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={openMaps}
              activeOpacity={0.8}
            >
              <View style={styles.actionIcon}>
                <Navigation size={24} color={Colors.gold} />
              </View>
              <Text style={styles.actionText}>Navegar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold" as const,
    color: Colors.white,
  },
  scrollView: {
    flex: 1,
  },
  mapContainer: {
    height: 300,
    backgroundColor: Colors.surface,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 20,
  },
  storeCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  storeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  storeInfo: {
    flex: 1,
    gap: 8,
  },
  storeName: {
    fontSize: 20,
    fontWeight: "bold" as const,
    color: Colors.white,
    lineHeight: 26,
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
  reviewCount: {
    fontSize: 14,
    color: Colors.gray,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.darkGray,
  },
  infoSection: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  infoText: {
    fontSize: 16,
    color: Colors.lightGray,
    flex: 1,
    lineHeight: 22,
  },
  hoursContainer: {
    flex: 1,
    gap: 4,
  },
  openText: {
    fontSize: 14,
    color: Colors.gold,
    fontWeight: "600" as const,
    marginTop: 4,
  },
  actionsGrid: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    gap: 12,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.surfaceLight,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.white,
  },
});
