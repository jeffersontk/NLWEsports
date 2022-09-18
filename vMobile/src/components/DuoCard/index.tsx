import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';

import { styles } from './styles';

export interface DuoCardProps {
  id: string
  name: string,
  weekDays: string[]
  useVoiceChannel: boolean
  yearPlaying: number,
  hourStart: string
  hourEnd: string
}

interface props {
  data: DuoCardProps
  onConnect: () => void
}

export function DuoCard({ data, onConnect }:props) {
  return (
    <View style={styles.container}>
      <DuoInfo
        label="Nome"
        value={data.name}
      />
      <DuoInfo
        label="Tempo de Jogo"
        value={`${data.yearPlaying} anos`}
      />
      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />
      <DuoInfo
        label="Chamada de áudio"
        value={data.useVoiceChannel ? 'Sim': 'Não'}
        colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />

      <TouchableOpacity 
        style={styles.connectButton} 
        onPress={onConnect}
      >
        <Ionicons 
          name="game-controller-outline"
          color={THEME.COLORS.CAPTION_300}
          size={20}
        />
        <Text style={styles.buttonTitle}>
          Conectar
        </Text>
      </TouchableOpacity>
    </View>
  );
}