import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo, AntDesign } from '@expo/vector-icons'
import logoImg from '../../assets/logo-nlw-esports.png'
import { Background } from '../../components/Background';
import { GameParams } from '../../@types/navigation';
import { THEME } from '../../theme';
import { styles } from './styles';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';

export function Game() {
  const [duo, setDuo] = useState<DuoCardProps[]>([])
  const route = useRoute()
  const navigation = useNavigation()
  const game = route.params as GameParams

  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(()=>{
    fetch(`http://192.168.15.18:3333/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => setDuo(data))
  },[])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo 
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={28}
            />
          </TouchableOpacity>
          <Image 
            source={logoImg}
            defaultSource={logoImg}
            style={styles.logo}
          />
          <View style={styles.right}/>
        </View>

        <Image 
          source={{uri: game.bannerUrl}}
          style={styles.banner}
          resizeMode="cover"
        />

        <Heading 
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />
        <FlatList 
          data={duo}
          keyExtractor={item => item.id}
          renderItem={({item})=> (
            <DuoCard 
              data={item}
              onConnect={()=> {}}
            />
          )}
          horizontal
          contentContainerStyle={styles.contentList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={()=> (
            <View style={{alignItems: 'center'}}>
               <AntDesign 
                name='meh'
                color={THEME.COLORS.CAPTION_300}
                size={28}
                style={{marginBottom: 8}}
              />
              <Text style={styles.EmptyMessage}>
                
                Não há anúncios publicados ainda!
              </Text>
            </View>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}