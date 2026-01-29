import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Linking,
  Alert,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react-native";
import Colors from "@/constants/colors";
import { useCart } from "@/contexts/CartContext";
import { PaymentMethod } from "@/types";

const { width } = Dimensions.get("window");
const ITEM_IMAGE_SIZE = Math.min(width * 0.22, 90);

export default function CartScreen() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerAddress, setCustomerAddress] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");

  const handleCheckout = () => {
    if (
      !customerName.trim() ||
      !customerPhone.trim() ||
      !customerAddress.trim()
    ) {
      Alert.alert(
        "Campos obrigatórios",
        "Por favor, preencha todos os campos.",
      );
      return;
    }

    const orderMessage = `
*Novo Pedido - Império Bebidas*

*Cliente:* ${customerName}
*Telefone:* ${customerPhone}
*Endereço:* ${customerAddress}
*Pagamento:* ${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}

*Itens:*
${items.map((item) => `${item.quantity}x ${item.product.name} - R$ ${(item.product.price * item.quantity).toFixed(2)}`).join("\n")}

*Total: R$ ${total.toFixed(2)}*
    `.trim();

    const phone = "5518997340064";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(orderMessage)}`;

    Linking.openURL(url);
    clearCart();
    setShowCheckout(false);
    Alert.alert("Pedido enviado!", "Seu pedido foi enviado via WhatsApp.");
  };

  const paymentMethods: { id: PaymentMethod; name: string }[] = [
    { id: "pix", name: "Pix" },
    { id: "dinheiro", name: "Dinheiro" },
    { id: "debito", name: "Débito" },
    { id: "credito", name: "Crédito" },
  ];

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.header}>
          <Text style={styles.title}>Carrinho</Text>
        </View>
        <View style={styles.emptyContainer}>
          <ShoppingBag size={80} color={Colors.gray} />
          <Text style={styles.emptyTitle}>Carrinho vazio</Text>
          <Text style={styles.emptyText}>
            Adicione produtos ao seu carrinho para continuar
          </Text>
          <TouchableOpacity
            style={styles.browseCatalogButton}
            onPress={() => router.push("/tabs/catalog")}
            activeOpacity={0.8}
          >
            <Text style={styles.browseCatalogText}>Ver Catálogo</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (showCheckout) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowCheckout(false)}>
            <Text style={styles.backButton}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Finalizar Pedido</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.checkoutContent}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações de Entrega</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome completo"
              placeholderTextColor={Colors.gray}
              value={customerName}
              onChangeText={setCustomerName}
            />
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              placeholderTextColor={Colors.gray}
              keyboardType="phone-pad"
              value={customerPhone}
              onChangeText={setCustomerPhone}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Endereço completo com número e complemento"
              placeholderTextColor={Colors.gray}
              multiline
              numberOfLines={3}
              value={customerAddress}
              onChangeText={setCustomerAddress}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Forma de Pagamento</Text>
            <View style={styles.paymentGrid}>
              {paymentMethods.map((method) => (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.paymentOption,
                    paymentMethod === method.id && styles.paymentOptionActive,
                  ]}
                  onPress={() => setPaymentMethod(method.id)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.paymentOptionText,
                      paymentMethod === method.id &&
                        styles.paymentOptionTextActive,
                    ]}
                  >
                    {method.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
            {items.map((item) => (
              <View key={item.product.id} style={styles.summaryItem}>
                <Text style={styles.summaryItemText}>
                  {item.quantity}x {item.product.name}
                </Text>
                <Text style={styles.summaryItemPrice}>
                  R$ {(item.product.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryTotal}>Total</Text>
              <Text style={styles.summaryTotalPrice}>
                R$ {total.toFixed(2)}
              </Text>
            </View>
          </View>
        </ScrollView>

        <SafeAreaView edges={["bottom"]} style={styles.checkoutFooter}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleCheckout}
            activeOpacity={0.8}
          >
            <Text style={styles.confirmButtonText}>Confirmar Pedido</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Carrinho</Text>
        <Text style={styles.itemCount}>
          {items.length} {items.length === 1 ? "item" : "itens"}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {items.map((item) => (
          <View key={item.product.id} style={styles.cartItem}>
            <Image source={item.product.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.product.name}</Text>
              <Text style={styles.itemPrice}>
                R$ {item.product.price.toFixed(2)}
              </Text>
              <View style={styles.itemControls}>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    activeOpacity={0.7}
                  >
                    <Minus
                      size={16}
                      color={item.quantity <= 1 ? Colors.gray : Colors.white}
                    />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    activeOpacity={0.7}
                  >
                    <Plus size={16} color={Colors.white} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeItem(item.product.id)}
                  activeOpacity={0.7}
                >
                  <Trash2 size={18} color={Colors.gray} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <SafeAreaView edges={["bottom"]} style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => setShowCheckout(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </SafeAreaView>
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
  itemCount: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 4,
  },
  backButton: {
    fontSize: 16,
    color: Colors.gold,
    fontWeight: "600" as const,
    marginBottom: 12,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    gap: 12,
  },
  itemImage: {
    width: ITEM_IMAGE_SIZE,
    height: ITEM_IMAGE_SIZE,
    borderRadius: 12,
  },
  itemDetails: {
    flex: 1,
    gap: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.white,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: "bold" as const,
    color: Colors.gold,
  },
  itemControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surfaceLight,
    borderRadius: 8,
    gap: 12,
    paddingHorizontal: 8,
  },
  quantityButton: {
    width: 32,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold" as const,
    color: Colors.white,
    minWidth: 24,
    textAlign: "center",
  },
  removeButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
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
    gap: 12,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: "600" as const,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: "bold" as const,
    color: Colors.gold,
  },
  checkoutButton: {
    backgroundColor: Colors.gold,
    borderRadius: 12,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: "bold" as const,
    color: Colors.black,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    gap: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold" as const,
    color: Colors.white,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: "center",
    lineHeight: 24,
  },
  browseCatalogButton: {
    backgroundColor: Colors.gold,
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginTop: 16,
  },
  browseCatalogText: {
    fontSize: 16,
    fontWeight: "bold" as const,
    color: Colors.black,
  },
  checkoutContent: {
    padding: 16,
    paddingBottom: 120,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold" as const,
    color: Colors.white,
    marginBottom: 16,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.white,
    marginBottom: 12,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  paymentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  paymentOption: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: Colors.darkGray,
    alignItems: "center",
  },
  paymentOptionActive: {
    backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },
  paymentOptionText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.white,
  },
  paymentOptionTextActive: {
    color: Colors.black,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryItemText: {
    fontSize: 14,
    color: Colors.lightGray,
    flex: 1,
  },
  summaryItemPrice: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: "600" as const,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: Colors.darkGray,
    marginVertical: 12,
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: "bold" as const,
    color: Colors.white,
  },
  summaryTotalPrice: {
    fontSize: 20,
    fontWeight: "bold" as const,
    color: Colors.gold,
  },
  checkoutFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.darkGray,
    padding: 16,
  },
  confirmButton: {
    backgroundColor: Colors.gold,
    borderRadius: 12,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "bold" as const,
    color: Colors.black,
  },
});
