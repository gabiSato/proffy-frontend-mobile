import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import TeacherItem, { Teacher } from "../../components/TeacherItem";
import PageHeader from "../../components/PageHeader";

import styles from "./styles";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = () => {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        setFavorites(JSON.parse(response));
      }
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      >
        {favorites.map((teacher: Teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} favorited />
        ))}
      </ScrollView>
    </View>
  );
};

export default Favorites;
