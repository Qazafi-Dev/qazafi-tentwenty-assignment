import Header from "@/components/Header";
import { IMAGE_BASE } from "@/services/apiClient";
import { Movie } from "@/services/movie";
import { getSearchMovies } from "@/services/movies";
import styles from "@/styles/search-movies.styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const searchmovies = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isLandscape = width > height;
  const cardWidth = isLandscape ? (width - 48) / 2 : width - 32;
  const [searchValue, setSearchValue] = useState<string>("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  function handleSearchChange(text: string) {
    setLoading(true);
    getSearchMovies(text)
      .then((data) => {
        // Handle the search results here
        // console.log("Search results:", data);
        setResults(data?.results || []);
      })
      .catch((error) => {
        console.error("Error searching movies:", error);
      })
      .finally(() => {
        // Any cleanup or final actions after the search
        setLoading(false);
      });
  }
  const onChangeHandler = (value: string): void => {
    setSearchValue(value);

    // 1. Clear any active pending timers instantly as the user continues typing
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 2. Queue a fresh network execution payload after exactly 1 second (1000ms) of inactivity
    timeoutRef.current = setTimeout(() => {
      handleSearchChange(value);
    }, 1000);
  };

  const renderMovies = ({ item }: { item: Movie }) => {
    const posterUri = item.poster_path
      ? `${IMAGE_BASE}${item.poster_path}`
      : "https://placeholder.com";
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={[
          styles.horizontalRowCard,
          isLandscape && { width: (width - 56) / 2 },
        ]}
        onPress={() => router.push(`/watch/${item.id}`)}
      >
        {/* Horizontal row layout items */}
        <View style={styles.thumbnailPosterBox}>
          <Image
            source={{ uri: posterUri }}
            style={styles.thumbnailPosterCanvas}
            resizeMode="cover"
          />
        </View>

        <View style={styles.metaTextDetailsBlock}>
          <Text style={styles.rowItemTitleLabel} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.rowItemSubcategoryLabel}>Movie</Text>
        </View>

        <TouchableOpacity style={styles.moreIconInteractiveAnchor}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#61C3F2" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.screenCanvas}>
      <View style={[styles.head, { paddingTop: insets.top, paddingBottom: 8 }]}>
        <Header
          searchValue={searchValue}
          onSearchChange={onChangeHandler}
          setSearchValue={setSearchValue}
        />
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#2E274C" />
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item: Movie) => item.id.toString()}
          key={isLandscape ? "search-landscape-2-col" : "search-portrait-1-col"}
          numColumns={isLandscape ? 2 : 1}
          columnWrapperStyle={isLandscape ? styles.gridSpacing : undefined}
          contentContainerStyle={styles.searchResultsContainer}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            results.length > 0 ? (
              <Text style={styles.searchHeadingLabel}>Top Results</Text>
            ) : null
          }
          renderItem={renderMovies}
        />
      )}
    </View>
  );
};

export default searchmovies;
