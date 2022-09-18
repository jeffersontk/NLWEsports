import React, { useState } from 'react';
import { View, Text, Modal, ModalProps, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard';

import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../Heading';

interface props extends ModalProps {
  discord: string
  onClose: () => void
}

export function DuoMatch({discord, onClose, ...rest}: props) {
  const [isCopping, setIsCopping] = useState(false)
  async function handleCopyDiscordToClipBoard() {
    setIsCopping(true)
    await Clipboard.setStringAsync(discord)

    Alert.alert('Discord Copiado!', "Cole e encontre seu duo!")
    setIsCopping(false)
  }

  return (
    <Modal
      animationType="fade"
      {...rest}
      transparent
      statusBarTranslucent
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity 
            style={styles.closeIcon}
            onPress={onClose}
          >
            <MaterialIcons 
              name="close"
              size={28}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <MaterialIcons name="check-circle-outline" size={64} color={THEME.COLORS.SUCCESS} />
          
          <Heading 
            title="Let's play!"
            subtitle="Agora é só começar a jogar!"
            style={{alignItems: 'center', marginTop: 24}}
          />
          <Text style={styles.label}>
            Adicione no Discord
          </Text>
          <TouchableOpacity 
            style={styles.discordButton} 
            onPress={handleCopyDiscordToClipBoard}
            disabled={isCopping}
          >
            <Text style={styles.discord}>
              {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}