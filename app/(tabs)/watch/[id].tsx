// app/(tabs)/watch/[id].tsx
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import Colors from "@/constants/Colors";
import { IMAGE_BASE } from "@/services/apiClient";
import { Movie } from "@/services/movie";
import { getMovieDetails } from "@/services/movies";
import styles from "@/styles/movie.styles";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ✅ YOUR PROVIDED TYPESCRIPT ARCHITECTURE
export interface MovieDetails extends Movie {
  runtime: number | null;
  tagline: string;
  genres: { id: number; name: string }[];
}

const genreColors = ["#15D2BC", "#FF6B6B", "#564CA3", "#CD9D0F"];
export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  // ✅ STRIKTLY TYPED STATE LAYER
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const isLandscape = width > height;

  useEffect(() => {
    getMovieDetails(Number(id))
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  const imageUri = movie?.backdrop_path
    ? `${IMAGE_BASE}${movie.backdrop_path}`
    : "https://unsplash.com";

  const renderHeroOverlay = () => (
    <View style={styles.heroTextOverlayContainer}>
      <Text style={styles.metaDateText}>In Theaters {movie?.release_date}</Text>
      <Button btntitle="Get Tickets" bgc={Colors.btnbg} />
      <Button btntitle="Watch Trailer" />
    </View>
  );

  const renderMainInfoContent = () => (
    <>
      <Text style={styles.sectionHeadingTitle}>Genres</Text>
      <View style={styles.tagsContainerRow}>
        {movie?.genres?.map((genre, idx) => (
          <View
            key={idx}
            style={[
              styles.tagBadgeNode,
              { backgroundColor: genreColors[idx % genreColors.length] },
            ]}
          >
            <Text style={styles.tagBadgeText}>{genre.name}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionHeadingTitle}>Overview</Text>
      <Text style={styles.bodyOverviewParagraphText}>{movie?.overview}</Text>
    </>
  );

  if (isLandscape) {
    return (
      <View
        style={[
          styles.detailsRoot,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <View style={styles.landscapeSplitWrapper}>
          <ImageBackground
            source={{ uri: imageUri }}
            style={styles.heroPosterLandscape}
            resizeMode="cover"
          >
            <TouchableOpacity
              style={styles.backActionButton}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            {renderHeroOverlay()}
          </ImageBackground>

          <ScrollView
            style={styles.contentBodyWrapperLandscape}
            showsVerticalScrollIndicator={false}
          >
            <Text
              style={[
                styles.sectionHeadingTitle,
                { marginTop: 0, fontSize: 22 },
              ]}
            >
              {movie?.title} {movie?.runtime ? `(${movie.runtime} mins)` : ""}
            </Text>
            {renderMainInfoContent()}
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.detailsRoot}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={{ uri: imageUri }}
        style={styles.heroPosterPortrait}
        resizeMode="cover"
      >
        <TouchableOpacity
          style={styles.backActionButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        {renderHeroOverlay()}
      </ImageBackground>

      <View style={styles.contentBodyWrapperPortrait}>
        {renderMainInfoContent()}
      </View>
    </ScrollView>
  );
}
