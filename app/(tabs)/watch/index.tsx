import Loader from "@/components/Loader";
import { IMAGE_BASE } from "@/services/apiClient";
import { Movie } from "@/services/movie";
import { getMovies } from "@/services/movies";
import styles from "@/styles/movies.styles";
import { EvilIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isLandscape = width > height;
  const cardWidth = isLandscape ? (width - 48) / 2 : width - 32;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getMovies()
      .then((data) => {
        setMovies(data?.results || []);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const renderMovies = ({ item }: { item: Movie }) => {
    const posterUri = item.poster_path
      ? `${IMAGE_BASE}${item.poster_path}`
      : "https://placeholder.com";
    return (
      <TouchableOpacity
        style={[
          styles.cardNode,
          { width: cardWidth, height: cardWidth * (9 / 16) },
        ]}
        onPress={() => router.push(`/watch/${item.id}`)}
      >
        <ImageBackground
          style={styles.imageBackgroundLayer}
          source={{ uri: posterUri }}
          resizeMode="cover"
          imageStyle={styles.imageCanvasRadius}
        >
          <Text style={styles.titleText}>{item?.title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  return loading ? (
    <Loader />
  ) : (
    <View
      style={[
        styles.screenCanvas,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={[styles.head, { paddingTop: insets.top, paddingBottom: 8 }]}>
        <View style={styles.headerrow}>
          <Text style={styles.headtxt}>Watch</Text>
          <TouchableOpacity
            hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
            onPress={() => router.push("/watch/searchmovies")}
          >
            <EvilIcons name="search" size={25} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        contentContainerStyle={styles.listWrapper}
        columnWrapperStyle={isLandscape ? styles.gridSpacing : undefined}
        data={movies}
        keyExtractor={(item, index) => index.toString()}
        key={isLandscape ? "landscape-layout-grid" : "portrait-layout-list"}
        numColumns={isLandscape ? 2 : 1}
        removeClippedSubviews
        windowSize={10}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
        renderItem={renderMovies}
      />
    </View>
  );
}
