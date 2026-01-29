import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WHATSAPP_URL, STORE_INFO } from '@/constants/store';

export default function WhatsAppButton() {
  const openWhatsApp = () => {
    const url = `${WHATSAPP_URL}?text=${encodeURIComponent(STORE_INFO.whatsappMessage)}`;
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity
      onPress={openWhatsApp}
      className="absolute bottom-20 right-4 bg-[#25D366] rounded-full w-16 h-16 items-center justify-center shadow-lg z-50"
      activeOpacity={0.8}
    >
      <Ionicons name="logo-whatsapp" size={32} color="white" />
    </TouchableOpacity>
  );
}
